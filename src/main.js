import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './routers'

// 引入样式
import '@/assets/styles/main.css' 			        // 公共样式
import 'element-ui/lib/theme-chalk/index.css'   // elment-ui 样式

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
