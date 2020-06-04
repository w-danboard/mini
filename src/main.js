import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import VueProgressBar from 'vue-progressbar'
import md5 from 'js-md5'
import App from './App.vue'
import router from './routers'

// 引入样式
import '@/assets/styles/main.css' 			        // 公共样式
import 'element-ui/lib/theme-chalk/index.css'   // elment-ui 样式

import Request from './request' //请求封装

Vue.prototype.$md5 = md5;

Vue.config.productionTip = false

Vue.use(VueProgressBar, {
  color: '#409eff',
  failedColor: '#f56b6c'
})

Vue.use(ElementUI, { locale, size: 'small' })
Vue.use(Request)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
