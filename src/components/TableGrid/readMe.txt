组件使用示例：
一、在用户列表页中定义搜索和列表项(userList.vue)
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleSearch" style="width: 30%;" class="filter-item" :placeholder="$t('userM.account')" v-model="queryParam.account">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleSearch">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
    </div>

    <table-grid ref="userList" @sort-change="sortChange" @filter-change="filterChange"
                   @selection-change="selectionChange" :query-list="queryList"
                   :columns="columns">
      <template slot="caption">用户列表</template>
      <template slot="actionBar">
        <el-button @click="handleCreate" type="primary">新建用户</el-button>
        <el-button @click="handleCreate" type="primary">批量删除</el-button>
      </template>
    </table-grid>
  </div>
</template>
<script src="./userList.js"></script>




二、定义列表数据结构(userColumns.js)
  import { parseTime } from '@/common/utils'

  export default
    [
      {
        type: 'selection'
      },
      {
        type: 'expand',
        renderBody(h, row) {
          return (
            <div>
              <div>
                <span>姓名：</span>{  row.userName }
                <span style={"padding:50px"}>账号：</span>{  row.account }
              </div>
              <div style={"padding-top:30px"}><span>个人介绍：</span>{  row.remark }</div>
            </div>
          );
        }
      },
      {
        label: '序号',
        prop: 'id'
      },
      {
        label: '账号',
        prop: 'account'
      },
      {
        label: '姓名',
        prop: 'userName'
      },
      {
        label: '性别',
        prop: 'sex',
        filters: [{ text: '男', value: 1 }, { text: '女', value: 0 }, { text: '未知', value: -1 }],
        columnKey: 'sex',
        formatter(val) {
          let text = '未知';
          if (val===1){
            text = '男'
          } else if (val===0) {
            text = '女'
          }
          return text;
        }
      },
      {
        label: '创建时间',
        prop: 'createTime',
        sortable: 'custom',
        formatter: function(val, row) {
          const html = parseTime(val, '{y}-{m}-{d} {h}:{i}')
          return html
        }
      },
      {
        renderHeader(h) {
          return (
            <span>操作</span>
          );
        },
        renderBody: (h, { row }) => [
          <div>
            <el-button type="text" onClick={() => this.getDetail(row.id)}>详情</el-button>
            <el-button type="text" onClick={() => this.getDetail(row.id)}>编辑</el-button>
            <el-button type="text" onClick={() => this.getDetail(row.id)}>删除</el-button>
          </div>

        ]
      }
    ]

三、定义用户列表逻辑(userList.js)
import { fetchList, updateUser, delUser } from './userApi'
import waves from '@/common/directive/waves' // 水波纹指令
import { isRequestSuccess } from '@/common/utils/common'

import TableGrid from '@/components/TableGrid'
import Columns from './userColumns'

export default {
  name: 'userList',
  directives: {
    waves
  },
  components: {
    UserEdit,
    TableGrid
  },
  data() {
    return {
      columns: Columns,
      queryParam: {}
    }
  },
  methods: {

    sortChange({column, prop, order}) {
      console.log(column, prop, order);
    },
    selectionChange(selections) {
      console.log(selections);
    },
    getDetail(row) {
      console.log(row.id);
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return
        }
        this.$refs.userList.reload()
      })
    },
    handleSearch() { // 调用列表查询，这里是重点
       this.$refs.userList.search()
    },
    queryList(current, size) {// 分配给分页列表的查询方法
      return fetchList({...this.queryParam, current, size});
    }
  }
}
