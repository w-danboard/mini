import Vue from 'vue'
import Router from 'vue-router'
// import { setLocal } from '@/lib/local';

Vue.use(Router);

// 验证是否登录过
//  const validate = async () => {
//    console.log('===>', this)
//   let res = await this.$request({
//     url: '/api/user/validate',
//     method: 'GET'
//   })
//   if (res.code === 0) {
//     setLocal('token', res.token);
//   };
//   return res.code === 0; // 返回用户是否失效
//  }

 // 注册
 const signup = () => 
 import('@/views/signup/index.vue')

 // 登录
 const login = () => 
 import('@/views/login/index.vue')

 // 首页
 const index = () => 
 import('@/views/index.vue')

  // 测试
  const test = () => 
  import('@/views/test.vue')


// 主页面
const main = () => 
import('@/views/main.vue')

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
      path: '/main',
      name: 'main',
      component: main,
      meta: {
        name: '主页面'
      },
      children: [
        {
          path: '/index',
          name: index,
          component: () => import('@/views/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/test',
          name: test,
          component: () => import('@/views/test.vue'),
          meta: {
            title: '测试'
          }
        }
      ]
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

/**
 * 主要用来拦截路由的钩子
 * @param to Router 即将要进入的目标 路由对象
 * @param from Router 当前导航正要离开的路由
 * @param mext Router 一定要调用改方法来 resolve 这个钩子
 */
// router.beforeEace(async (to, from, next) => {
  
//   next();
// });


export default router