import axios from 'axios'
import { isType } from '@/lib/utils.js'
import {
	Loading
} from 'element-ui';
/**
 * 统一拦截错误码
 * @param vm vue实例
 * @param state 状态码
 */
let parseStatusCode = (vm, data, state) => {
	// 成功
	if (state === 0) {
		return data.data
	}
	// 失败, 提示错误信息
	else if (state === 1) {
		throw vm.$message.error(data.message);
	}
	// 登录超时
	else if (state === 2) {
		// @特殊处理 阻止到登录页面之前, 需要记录最后的访问页面
		if (vm.$route.fullPath !== '/login') {
			vm.$localStore.set("before_403_path", vm.$route.fullPath);
		}
		vm.$localStore.remove("user");
		vm.$localStore.remove("permission");
		vm.$store.commit("USER_INFO", null);
		vm.$store.commit("USER_DATA_POWER", null);
		vm.$store.commit("MENU_DATA", null);
		vm.$router.push({
			path: vm.$configUrl.timeoutUrl
		});
		// throw new Error(state);
	}
	// 提示没有权限
	else if (data.state === 3) {
		throw vm.$message.error(data.message);
	}
	// 其他异常信息
	// else if (data.state === 500) {
	// 	throw new Error(`state=${data.state}, message=${data.message}`);
	// }
	// other
	else {
		throw new Error(state || data.message || 'request.js other error');
		// return data;
	}
}

/**
 * 兼容组件发起请求, 向上寻找pageMeta
 * @param vm
 * @returns {pageMeta|{prefix, suffix, id, title, name, path, action}}
 */
let searchUp = (vm) => {
	if (!vm) return
	if (vm.pageMeta) {
		return vm.pageMeta
	}
	return searchUp(vm.$parent)
}

/**
 * 统一处理请求 __permission & __log 的情况
 * @param vm vue实例
 * @param config 请求参数配置
 */
let supportRequestParam = (vm, config) => {

	// @特殊处理, 兼容组件发起请求
	let pageMeta = vm.pageMeta || searchUp(vm)

	let data = config.data
	/**
	 * 兼容第一阶段代码写法
	 */
	if (data.param && (data.__permission || data.__log)) {
		return
	}
	/**
	 * 写法封装
	 */
	if (pageMeta) {
		let menuId = pageMeta.id
		let action = pageMeta.action[config.action]
		if (menuId && action) {
			config.data = {
				param: data,
				// 补充套入 __permission
				__permission: {
					MenuID: menuId,
					Operation: action.permission.code // 操作类型
				},
				// 补充套入 __log
				__log: {
					MenuID: menuId,
					Logtype: action.log.code, // 日志类型
					Context: action.log.text // 日志描述
				}
			}
		}
	}
}

/**
 * 开启Loading
 */
let stopEvent = (evt) => {
	evt.stopPropagation();
}
let startLoading = (loadingEl, that) => {
	if (!loadingEl) {
		return;
	}
	if (loadingEl == 'all') {
		return that.$loading({
			lock: true,
			text: '正在处理中, 请稍候...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.5)'
		});
	}
	if (Array.isArray(loadingEl)) {
		loadingEl = loadingEl[0]
	}
	let config = {
		target: loadingEl.$el || loadingEl
	}
	// @特殊处理, 有loading属性的元素, 更好默认图标
	if (loadingEl.loading !== undefined) {
		// config.spinner = 'el-icon-loading'
	}
	const loadingInstance = Loading.service(config);
	loadingInstance.$el.addEventListener("click", stopEvent)
	return loadingInstance;
}

/**
 * 关闭Loading
 * @param instance loading实例
 */
let endLoading = (instance, str) => {
	if (!instance) {
		return;
	}
	if (str == 'all') {
		instance.close()
	} else {
		instance.$el && instance.$el.removeEventListener("click", stopEvent)
		instance.close()
	}
}

let encode = (str) => {
	// 对字符串进行编码
	var encode = encodeURI(str);
	// 对编码的字符串转化base64
	var base64 = btoa(encode);
	return base64;
}

export default {
	install: function (Vue) {
		Vue.prototype.$request = function (url, config) {
			config.timeout = 1000 * 60 * 10
			// 指定浏览器前缀
			const apiPrefix = '/api';
			// 补充套入 __permission & __log
			supportRequestParam(this, config);
			// 请求默认配置
			config = config || {};
			config.headers = config.headers || {};
			if (!config.ignoreApiPrefix) {
				config.url = apiPrefix + url;
			} else {
				config.url = url;
			}
			// 加载数据时，在指定元素上显示loading 状态
			let loadingInstance = startLoading(config.loadingEl, this);
			// if (config.data.param) {
			// 	config.data.param = this.$getCode(JSON.stringify(config.data.param))
			console.log(JSON.parse(JSON.stringify(config.data)))
			// 	config.data.param = this.$setCode(config.data.param)
			// 	console.log(config.data.param)
			// }
			if (config.data.param && !~config.url.indexOf('/FileItemApi/FileUpLoad')) {
				config.data.param = encode(JSON.stringify(config.data.param))
			}
			if (!!~config.url.indexOf('/FileItemApi/FileUpLoad')) {
				config.headers = {
					'Content-Type': 'multipart/form-data;'
				}
			}
			return axios.request(config).then((response) => {
				// 完成加载后，关闭loading 状态
				endLoading(loadingInstance, config.loadingEl)

				// 根据响应的状态码返回不同消息
				let data = response.data;

				// 二进制大对象 BLOB (binary large object)
				if (config.responseType === 'blob') {
					// 文件导出
					let url = URL.createObjectURL(new Blob([data]));
					let link = document.createElement('a');
					link.style.display = 'none';
					link.href = url;
					link.setAttribute('download', config.fileName);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					return;
				}
				// 登录特殊处理
				if (url === '/LoginApi/LocalLogin') {
					if (data.state !== 0) {
						return data;
					}
					return data.data;
				}
				if (url == '/FileItemApi/FileUpLoad' || url == '/VerifyCodeApi/SecurityCode') {
					return data;
				}
				return parseStatusCode(this, data, data.state);
			}).catch((response) => {
				// 完成加载后，关闭loading 状态
				endLoading(loadingInstance);
				// 根据响应的状态码返回不同消息
				return parseStatusCode(this, {}, response.response && response.response.status);
			})
		}
		Vue.prototype.$get = function (url, config) {
			config = Object.assign({}, config, {
				method: 'get'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$post = function (url, config) {
			config = Object.assign({}, config, {
				method: 'post'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$put = function (url, config) {
			config = Object.assign({}, config, {
				method: 'put'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$delete = function (url, config) {
			config = Object.assign({}, config, {
				method: 'delete'
			})
			return this.$request(url, config)
		}
		Vue.prototype.$all = function (requestInfos) {
			if (!Array.isArray(requestInfos)) {
				requestInfos = [requestInfos]
			}
			return Promise.all(requestInfos.map(requestInfo => {
					if (isType.String(requestInfo)) {
						requestInfo = [requestInfo]
					}
					const config = Object.assign({}, {
						method: 'get'
					}, requestInfo[1])
					const url = requestInfo[0]

					return this.$request(url, config, true)
				}))
				.then(responses => {
					return responses
				})
				.catch((response) => {
					if (response.response.status === 401) {
						this.$router.push({
							name: 'login'
						})
					} else {
						// this.$message.error(response.response.data.message)
					}
				})
		}
	}
}
