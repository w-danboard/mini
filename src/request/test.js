// ajaxRequest 获取
import axios from 'axios';

class AjaxRequest {
  // baseURL
  constructor () {
    // this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000';  // 请求路径
    this.timeout = 3000; // 超时时间
  }

  merge (options) {
    return {...options, timeout: this.timeout}
  }

  setInterceptor (instance) { // 每次请求 都需要加一个loading效果
    // 如果上一个promise 返回一个常量 会作为下一个promise的输入
    // [请求拦截]
    instance.interceptor.request.use((config) => {
      config.headers.Authorization = 'xxx';
      return config;
    })
    // [响应拦截]
    instance.interceptor.response.use((res) => {
      // res是响应体
      return res.data;
    })
  }

  request (options) { // url method
    let instance = axios.create(); // 官方提供的方法 通过axios库 创建一个axios
    this.setInterceptor(instance);; // 拦截器
    let config = this.merge(options);
    return instance(config);  // axios执行后 返回的是promiser
  }
}

export default new AjaxRequest;