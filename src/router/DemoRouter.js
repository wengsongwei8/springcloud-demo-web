/**
 *  自定义路由
 */
import Layout from '../views/layout/Layout'
import ParentMenuLayout from '../views/layout/ParentMenuLayout' // 作为二级以上菜单的中转布局
const _import = require('./_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/demo',
    component: ParentMenuLayout,
    redirect: 'noredirect',
    name: 'demo',
    meta: {
      title: 'demo',
      icon: 'component'
    },
    children: [{
      path: '/tableDemo',
      component: Layout,
      redirect: 'noredirect',
      name: 'tableDemo',
      meta: {
        title: 'tableDemo',
        icon: 'component'
      },
      children: [
        { path: 'tree-grid', component: _import('demo/treeGrid/TreeGridDemo'), name: 'TreeGridDemo', meta: { title: 'TreeGridDemo', icon: 'table' }},

      ]
    },{
      path: '/chartDemo',
      component: Layout,
      redirect: 'noredirect',
      name: 'chartDemo',
      meta: {
        title: 'chartDemo',
        icon: 'component'
      },
      children: [
        { path: 'line-chart', component: _import('demo/chart/line'), name: 'lineChart', meta: { title: 'lineChart', icon: 'table' }},
        { path: 'bar-chart', component: _import('demo/chart/bar'), name: 'barChart', meta: { title: 'barChart', icon: 'table' }},
        { path: 'pie-chart', component: _import('demo/chart/pie'), name: 'pieChart', meta: { title: 'pieChart', icon: 'table' }},
        { path: 'gauge-chart', component: _import('demo/chart/gauge'), name: 'gaugeChart', meta: { title: 'gaugeChart', icon: 'table' }},

      ]
    }
    ],
  }
]


