import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store/index';
import router from '../routers'

/**
 * 跳转登录页
 * 携带当前页面路由 在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',        
    query: {
        redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
        toLogin();
        break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
        Message.error('登录过期，请重新登录');
        localStorage.removeItem('token');
        store.commit('loginSuccess', null);
        toLogin();
        break;
    // 404请求不存在
    case 404:
        Message.error('请求的资源不存在'); 
        break;
    default:
        console.log('other===>', other);   
    }
  }

// 请求超时 例如超过10s 就会告知用户当前请求超时
axios.defaults.timeout = 1000 * 60 * 10;

// post请求头的设置
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 请求拦截
 *  为什么要拦截？
 *  比如，有些请求是需要用户登录之后才能访问的，或者post请求的时候，我们需要序列化我们提交的数据
 *  这时候，我们可以再请求被发送之前进行一个拦截，从而进行我们想要的操作
 */

 // 导入vuex 使用里面的状态  import store from '@/store/index';

 // 请求拦截器
 axios.interceptors.request.use(
   config => {
     // 每次发送请求之前 判断vuex中是否存在token
     // 如果存在 则统一在http请求的header都加上token 这样后台根据token判断你的登录情况
     // 即使本地存在token 也有可能token是过期的 所以在响应拦截中要对返回状态进行判断
     const token = store.state.token;
     token && (config.headers.Authorization = token);
     return config;
   },
   error => {
    return Promise.error(error);
});

// 响应拦截器
axios.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
  error => {
    // 服务器状态码不是2开头的情况
    // 可以和后台协商统一错误状态码
    // 然后根据返回的状态码进行一些操作 例如登录过期提示 错误提示等等
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围 
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
  } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
         console.log('断网了')
         store.commit('changeNetwork', false);
      } else {
          return Promise.reject(error);
      }
  }
});

export default axios;