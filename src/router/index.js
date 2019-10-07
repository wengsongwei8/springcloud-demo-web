/**
 * 路由定义
 */
import Vue from 'vue'
import Router from 'vue-router'
import constantRouter from './ConstantRouter'
import userCenterRouter from '@/router/BasicInfoRouter'
import demoRouter from '@/router/DemoRouter'

Vue.use(Router)

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter
})

export const constantRouterMap = constantRouter;

export const customRouterMap = userCenterRouter
     .concat(demoRouter)
     .concat([{ path: '*', redirect: '/404', hidden: true }]);// 404需要放在最后;


