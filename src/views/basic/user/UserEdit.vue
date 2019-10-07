<template >
<div>
  <div align="center" >
    <el-form :rules="rules" :ref="editFormId" :model="formData" label-position="right"
             label-width="70px" v-loading="formLoadding" >

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基础信息</span>
        </div>
        <div class="text item">
            <el-row>
              <el-col :span="11"  class="form-view-col">
                <el-form-item label="账号:" placeholder="请输入账号" prop="account" label-width="85px">
                  <el-input v-model="formData.account"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"  >&nbsp;</el-col>
              <el-col :span="11"  class="form-view-col">
                <el-form-item label="用户名称:" placeholder="请输入用户名称" prop="userName" label-width="85px">
                  <el-input v-model="formData.userName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="11"  class="form-view-col">
                <el-form-item label="邮箱:" placeholder="请输入邮箱" prop="email" label-width="85px">
                  <el-input v-model="formData.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2"  >&nbsp;</el-col>
              <el-col :span="11"  class="form-view-col">
                <el-form-item label="电话:" placeholder="请输入电话" prop="phone" label-width="85px">
                  <el-input v-model="formData.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11"  class="form-view-col">
                <el-form-item label="性别:"  prop="sex" label-width="85px">
                  <el-select v-model="formData.sex" placeholder="请输入性别" style="width: 100%;">
                    <el-option
                      v-for="item in sexs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>机构及权限</span>
        </div>
        <div class="text item">
          <el-row>
              <el-col :span="11"  class="form-view-col">
                <el-form-item label="所属机构" placeholder="请选择所属机构" prop="parentIds" label-width="70px">
                  <el-cascader
                    v-model="formData.orgId"
                    :options="parentTreeData"
                    :props="{ checkStrictly: true, value: 'key', emitPath: false }"
                    :show-all-levels="false"
                    style="width: 100%;"
                    clearable>
                  </el-cascader>
              </el-form-item>
              </el-col>
            </el-row>
        </div>
      </el-card>


    </el-form>



    <div slot="footer" align="center">
      <el-button @click="changeDialogVisible(false)">取消</el-button>
      <el-button v-if="formOpration=='create'" type="primary" @click="createData">确认</el-button>
      <el-button v-else type="primary" @click="updateData">确认</el-button>
    </div>
  </div>
</div>
</template>

<script src="./UserEdit.js"></script>

