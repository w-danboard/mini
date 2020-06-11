import axios from 'axios'
import { getLocal } from '@/lib/local';

class AjaxRequest {
  constructor (vm) {
    this.vm = vm
    // this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';  // 请求路径
    this.timeout = 1000 * 60 * 10; // 超时时间
  }

  /**
   * 跳转登录页 携带当前页面路由 在登录页完成登录后返回当前页面
   * @param
   */
  toLogin () {
    this.vm.$router.replace({
      path: '/login',
      query: {
        redirect: this.vm.$router.currentRoute.fullPath
      }
    })
  }

  /**
   * 请求失败后的错误统一处理
   * @param status 状态码
   * @param other 除以下状态码外的其他
   */
  errorHandle (status, other) {
    // 状态码判断
    switch (status) {
      // 401: 未登录状态，跳转登录页
      case 401:
        this.toLogin();
      break;
      // 403 token过期
      // 清除token并跳转登录页
      case 403:
        this.vm.$message.error('登录过期，请重新登录');
        localStorage.removeItem('token');
        // store.commit('loginSuccess', null);
        this.toLogin();
        break;
      // 404请求不存在
      case 404:
        this.vm.$message.error('请求的资源不存在'); 
        break;
      default:
        console.log('other===>', other);   
    }
  }

  /**
   * 合并请求参数
   * @param options 参数 
   */
  merge (options) {
    return {...options, timeout: this.timeout}
  }

  /**
   * 设置拦截器
   * @param instance 官方提供的方法 通过axios库 创建一个axios
   */
  setInterceptor (instance) {
    // [请求拦截]
    instance.interceptors.request.use(config => {
      config.headers.Authorization = getLocal('token');
      config.headers['Content-Type'] = 'multipart/form-data'
      return config;
    }, error => {
      return Promise.error(error);
    })
    // [响应拦截]
    instance.interceptors.response.use(
      res => /^2\d{2}$/.test(res.status) ? Promise.resolve(res.data) : Promise.reject(res.data),
      error => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围 
          this.errorHandle(response.status, response.data.message);
          return Promise.reject(response);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          if (!window.navigator.onLine) {
            console.log('断网了')
            // store.commit('changeNetwork', false);
          } else {
              return Promise.reject(error);
          }
        }
      }
    )
  }

  /**
   * 请求方法 如果上一个promise 返回一个常量 会作为下一个promise的输入
   * @param options url method 等等参数
   */
  request (options) {
    let instance = axios.create(); // 官方提供的方法 通过axios库 创建一个axios
    this.setInterceptor(instance); // 拦截器
    let config = this.merge(options);
    return instance(config);  // axios执行后 返回的是promiser
  }
}

export default {
	install: function (Vue) {
    const r = new AjaxRequest(this);
    Vue.prototype.$request = r.request.bind(r);
	}
}