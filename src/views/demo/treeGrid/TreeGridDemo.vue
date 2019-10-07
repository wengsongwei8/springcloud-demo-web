<template>
  <div class="app-container">
    <tree-grid :data="data" :columns="columns" border :loading="false"
               :total="total"></tree-grid>
  </div>
</template>

<script>
  import TreeGridBase from '@/components/TreeGrid/TreeGridBase'
  import Columns from './TreeGridDemoColumns'

export default {
  name: 'treeGridDemo',
  extends: TreeGridBase, // 树形列表组件
  data() {
    return {
      total: 6,
      columns: [...Columns, this.getOpColums()],
      data: [
        {
          id: 0,
          deparment: '财务部',
          userNum: 50,
          comment: '无',
          children: [
            {
              id: 2,
              deparment: '财务一室',
              userNum: 10,
              comment: '无'
            }]
        },
        {
          id: 1,
          deparment: '研究院',
          userNum: 100,
          comment: '无',
          children: [
            {
              id: 2,
              deparment: '软件部',
              userNum: 10,
              comment: '无'
            },
            {
              id: 3,
              deparment: '硬件部',
              userNum: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  deparment: '硬件一室',
                  userNum: 5,
                  comment: '无'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
