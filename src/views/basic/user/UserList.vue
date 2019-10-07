<template>
<div>

<!-- 列表页 -->
<div v-show="gridListVisible">
  <div class="app-container calendar-list-container">
      <!--搜索-->
      <div class="filter-container">
          <el-form  :model="queryParam" label-position="left"  label-width="60px"  >
          <el-row>

            <el-col  :span="8" class="form-view-col search-view-col" style="">
              <el-form-item label="账号" placeholder="请输入账号" prop="account"  label-width="40px">
                <el-input v-model="queryParam.account"></el-input>
              </el-form-item>
            </el-col>
            <el-col  :span="8" class="form-view-col search-view-col" style="">
              <el-form-item label="姓名" placeholder="请输入姓名" prop="userName"  label-width="40px">
                <el-input v-model="queryParam.userName"></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="2" style="padding-left:20px">
              <div>
                  <el-button @click="handleSearch" class="filter-item search-op-btn" size="medium" type="primary" v-waves icon="el-icon-search" >搜索</el-button>
              </div>
          </el-col>
        </el-row>
        </el-form>
        <div style="width: 100%;float: left;">
            <el-button @click="toCreate" class="filter-item op-btn" size="mini"  type="primary">新建</el-button>
            <el-button @click="toEditBySelected" class="filter-item op-btn" size="mini"  type="primary">编辑</el-button>
            <el-button @click="batchDelete" class="filter-item op-btn" size="mini"  type="primary">删除</el-button>
        </div>
      </div>
      <!--分页列表,分页组件，其他页面，直接复制以下标签就可以-->
      <table-grid  @sort-change="handSort" @filter-change="handleFilter"
                    @selection-change="selectionChange" :query-list="queryGridData"
                    :columns="columns" :data="gridData" :total="gridTotal" :loading="gridLoading" >
      </table-grid>
  </div>
</div>

    <!-- 编辑组件 -->
    <div  v-show="editDialogVisible">
      <user-edit :ref="editFormId" :changeDialogVisible="changeEditDialogVisible"
                 @gridReload="closeDialogAndSearch">
      </user-edit>
    </div>


</div>
</template>

<script src="./UserList.js"></script>
