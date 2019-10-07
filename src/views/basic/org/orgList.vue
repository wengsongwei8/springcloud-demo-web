<template>
<div>
  <!-- 列表页 -->
  <div v-show="gridListVisible">
    <div class="app-container calendar-list-container">
      <!--搜索-->
      <div class="filter-container">
          <el-form  :model="queryParam" label-position="right" label-width="80px"  >
          <el-row>
            <el-col  :span="8" class="form-view-col search-view-col">
              <el-form-item label="父机构" placeholder="请选择父机构" prop="parentIds" label-width="60px" >
                <el-cascader
                  v-model="queryParam.parentIds"
                  :options="parentTreeData"
                  :props="{ checkStrictly: true, value: 'key', emitPath: false }"
                  :show-all-levels="false"
                  style="width: 100%;"
                  clearable>
                </el-cascader>
              </el-form-item>
          </el-col>
          <el-col  :span="8" class="form-view-col search-view-col">
            <el-form-item label="机构名称" placeholder="请输入机构名称" prop="orgName" >
              <el-input v-model="queryParam.orgName"></el-input>
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


      <table-grid  @sort-change="handSort" @filter-change="handleFilter"
                    @selection-change="selectionChange" :query-list="queryGridData"
                    :columns="columns" :data="gridData" :total="gridTotal" :loading="gridLoading" >
      </table-grid>
    </div>
  </div>

    <div  v-show="editDialogVisible">
      <org-edit :ref="editFormId" :changeDialogVisible="changeEditDialogVisible"
                 @gridReload="closeDialogAndSearch">
      </org-edit>
    </div>


</div>
</template>

<script src="./orgList.js"></script>

<style rel="stylesheet/scss" lang="scss">

</style>
