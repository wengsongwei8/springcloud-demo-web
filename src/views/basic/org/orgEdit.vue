<template >
<div>
  <div align="center" >
    <el-form :rules="rules" :ref="editFormId" :model="formData" label-position="right"
             label-width="120px" v-loading="formLoadding" >

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>机构信息</span>
        </div>
        <div class="text item">
            <el-row>
				<el-col   class="form-view-col">
					  <el-form-item label="所属父机构" placeholder="请选择父机构" prop="parentId" >
              <el-cascader
                v-model="formData.parentId"
                :options="parentTreeData"
                :props="{ checkStrictly: true, value: 'key', emitPath: true }"
                :show-all-levels="false"
                style="width: 100%;"
                clearable>
              </el-cascader>
					  </el-form-item>
				 </el-col>
			 </el-row>

			<el-row>

				<el-col   class="form-view-col">
					 <el-form-item label="机构名称" placeholder="请输入机构名称" prop="orgName" >
					  <el-input v-model="formData.orgName"></el-input>
					</el-form-item>
				 </el-col>
			 </el-row>

			<el-row>
				<el-col   class="form-view-col">
					 <el-form-item label="机构简介" placeholder="请输入机构简介" prop="orgIntroduction" >
					  <el-input type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="formData.orgIntroduction">
            </el-input>
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

<script src="./orgEdit.js"></script>

