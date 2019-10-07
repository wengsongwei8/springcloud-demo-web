import {customRouterMap, constantRouterMap} from '@/router'
/**
 * 通过meta.priCode 判断是否与当前用户权限匹配
 * @param pris
 * @param route
 */
function hasPermission(pris, route) {
  if (pris && route.meta && route.meta.priCode != undefined) {
    if (pris[route.meta.priCode] !== undefined){
      return true;
    } else {
      return false;
    }
  } else { // 如果路由不设置权限编码，则默认拥有权限
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户权限的路由表
 * @param asyncRouterMap
 * @param pris
 */
function filterAsyncRouter(asyncRouterMap, pris) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(pris, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, pris);
        if (route.children.length === 0){
          return false;
        }
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { pris } = data
        let accessedRouters = filterAsyncRouter(customRouterMap, pris);

        commit('SET_ROUTERS', customRouterMap)
        resolve()
      })
    }
  }
}

export default permission
