import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条组件
import 'nprogress/nprogress.css'// 进度条样式
import { getToken } from '@/common/utils/auth' // 从cookie中获取token

NProgress.configure({ showSpinner: false })// NProgress Configuration

function hasPermission(pris, permissionRoles) {
  return true;
}

const whiteList = ['/login', '/authredirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // 启动进度条
  if (getToken()) { // 判断是否有
    /* 有 token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // 如果当前是首页，不触发afterEach hook ,所以需要这里手动结束进度条
    } else {
      if (store.getters.curUserId.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const pris = res.pris // 注意: 权限 必须是数组!
          store.dispatch('GenerateRoutes', { pris }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() //  如果当前是登陆页，不触发afterEach hook ,所以需要这里手动结束进度条
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})
