
import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
// import Login from '../views/a.vue'

const routes = [
  // {
  //   path: '/Login',
  //   name: 'Login',
  //   component: Login
  // },

  {
    path: '/',
    name: 'Layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeViev.vue'),
    children: [
      {
        path: 'HomeLay',
        name: 'HomeLay',
        component: () => import('../views/HomeLay.vue'),
        children: [
          // {
          //   path: 'transfer',
          //   name: 'transfer',
          //   component: () => import('../views/TransferLay.vue'),
          //   meta: {
          //     locale: 'dataInput'
          //   }
          // }
        ]
      },
      {
        path: 'AboutLay',
        name: 'AboutLay',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutLay.vue')
      },
      {
        path: 'DesignLay',
        name: 'DesignLay',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/DesignLay.vue')
      },
    ]
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history:createWebHashHistory(process.env.BASE_URL),
  routes
})
// router.beforeEach(async(to, from, next) => {
//   if(to.meta=="replace "){ //需要改为不缓存时
//       next({ ...to, replace: true })
//   }
// })
// router.beforeEach((to, from, next) => {
//   const { token, user } = store.state
//   const { requiredLogin, redirectAlreadyLogin } = to.meta

//   // 已登录跳转到首页
//   const redirectAlreadyLoginCallback = () => {
//     if (redirectAlreadyLogin) {
//       next({ name: 'Home' })
//     } else {
//       next()
//     }
//   }

//   // 未登录跳转到登录页
//   const requiredLoginCallback = () => {
//     if (requiredLogin) {
//       next({ name: 'Login' })
//     } else {
//       next()
//     }
//   }

//   if (!user || !user.isLogin) {
//     if (token) {
//       // 已登录 && 无用户信息
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`
//       // 查询用户信息
//       store.dispatch('queryUserInfo').then(() => {
//         redirectAlreadyLoginCallback()
//       }).catch(() => {
//         // 退出登录
//         store.commit('logout')
//         next({ name: 'Login' })
//       })
//     } else {
//       // 未登录
//       requiredLoginCallback()
//     }
//   } else {
//     // 已登录 && 有用户信息
//     redirectAlreadyLoginCallback()
//   }
// })

// Vue 路由 导航守卫（导航钩子）(全局守卫、路由独享守卫、组件内守卫)
// 全局守卫：直接挂载在router实例上
router.beforeEach(function (to, from, next) {
  // 回调函数中的参数，to：进入到哪个路由去，from：从哪个路由离开，next：函数，决定是否展示你要看到的路由页面。

  if (to.path.indexOf('AboutLay') != -1) {
    to.path = '/AboutLay'
  } else if (to.path.indexOf('DesignLay') != -1) {
    to.path = '/DesignLay'
  } else if (to.path.indexOf('HomeLay') != -1) {
    to.path = '/'
  }
  next();
})
router.beforeResolve(function (to, from, next) {
  next();
})

// 全局后置钩子
router.afterEach(function (route) {

})

export default router
