import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import nprogress from 'nprogress'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist //白名单 不需要登陆就可以访问的 

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()
  const hasGetUserInfo = store.getters.user //直接从仓库中拿

  if (to.meta.auth) {
    console.log("在鉴权")
    if (hasGetUserInfo) {
      console.log("我有用户信息")
      next()
    } else {
      const hasToken = localStorage.getItem("adminToken");
      if (hasToken) {//如果有token，要对其进行核验
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error("登陆已过期，请重新登录")
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }

      } else {//没有token，重新登录
        next(`/login?redirect=${to.path}`)
        Message.error("请登录")
        NProgress.done()
      }
    }

  } else {
    if (to.path === "login" && hasGetUserInfo) {
      //说明现在是在登陆的状态下要去login页面，我们直接将其跳转到首页
      next({ path: "/" })
    } else {
      next()
    }
    NProgress.done()//进度条走完的代码，表示进度条走完了
  }





  //下方是vue-element-admin 原本的鉴权流程
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
