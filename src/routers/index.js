import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/index.vue'),
      meta: {
        title: '首页'
      }
    }
  ]
})

export default router