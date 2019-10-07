/**
 *  公用的路由定义
 */
import Layout from '../views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)

export default  [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('common/errorPage/404'), hidden: true },
  { path: '/401', component: _import('common/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
];



