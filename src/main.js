import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'

// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/fonts/iconfont.css' 							// 图标字体

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
