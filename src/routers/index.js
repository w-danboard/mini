import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

 // 注册
 const signup = () => 
 import('@/views/signup/index.vue')

 // 登录
 const login = () => 
 import('@/views/login/index.vue')

 // 首页
 const index = () => 
 import('@/views/index.vue')

 // 页面不存在
const exception_404 = () =>
import('@/views/exception/exception_404.vue')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/login'
    },
    {
      path: '*',
      component: exception_404
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: {
        name: '注册'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        name: '登录'
      }
    },
    {
      path: '/index',
      name: index,
      component: () => import('@/views/index.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/exception_404',
      name: 'exception_404',
      component: exception_404,
      meta: {
        name: '页面不存在'
      }
    }
  ]
})

export default router