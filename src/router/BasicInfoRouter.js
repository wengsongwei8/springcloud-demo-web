/**
 *  用户中心路由配置
 */
import Layout from '../views/layout/Layout'
import ParentMenuLayout from '../views/layout/ParentMenuLayout' // 作为二级以上菜单的中转布局
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/basic',
    component: Layout,
    redirect: 'noredirect',
    name: 'baseInfo',
    meta: {
      title: '基础信息',
      icon: 'user',
      priCode: 'baseInfo'
    },
    children: [
      { path: 'user-list', component: _import('basic/user/UserList'), name: 'UserManager',
        meta: { title: '用户管理', icon: 'people' , priCode: 'userManager'}},
      { path: 'org-list', component: _import('basic/org/orgList'), name: 'orgManager',
        meta: { title: '机构管理', icon: 'table' , priCode: 'orgManager'}},

    ]
  }]


