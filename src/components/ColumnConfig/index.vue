<template>
  <div align="center">

    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <div align="left">
      <el-checkbox-group v-model="checkedColumns" @change="handlecheckedColumnsChange">
        <template v-for="(col,index) in Array.from(getCheckedColumns)" style="text-align: left">
          <el-checkbox v-if="col.prop"  :label="col.prop" :key="col.prop" border>{{col.label}}</el-checkbox>
          <div v-if="index===6"></div>
        </template>
      </el-checkbox-group>
    </div>

    <div slot="footer" align="center" style='padding-top:40px'>
      <el-button @click="changeDialogVisible(false)">取消</el-button>
      <el-button  type="primary" @click="setColumnConfig">确认</el-button>
    </div>
</div>
</template>

<script>
  import * as util from '@/common/utils/common'

export default {
  name: 'columnConfig',
  props: {
    columns: {
      type: Array,
      default: []
    },
    changeDialogVisible: Function // 改变弹框显示状态
  },
  data() {
    return {
      checkAll: false,
      checkedColumns: [],
      isIndeterminate: true,
      allOptions: [],
      isInit: false
    }
  },
  computed: {
    getCheckedColumns() {
      if (this.isInit){
        return this.columns;
      }
      for (let index in this.columns ){
        let col = this.columns[index];
        if (col && col.prop){
          this.allOptions.push(col.prop);
          if (col.isShow !== false && col.isShow !== 0){
            this.checkedColumns.push(col.prop)
          }
        }
      }
      this.isInit = true;
      return this.columns;
    }
  },
  methods: {
    setColumnConfig(){
      for (let index in this.columns ){
        let col = this.columns[index];
        if (col && col.prop){
          if (util.isArrayContains(this.checkedColumns, col.prop)){
            col.isShow = true;
          } else {
            col.isShow = false;
          }
        }
      }
      this.changeDialogVisible(false);
    },
    handleCheckAllChange(val) {
       this.checkedColumns = val ? this.allOptions : [];
       this.isIndeterminate = false;
    },
    handlecheckedColumnsChange(value) {
       let checkedCount = value.length;
       this.checkAll = checkedCount === this.columns.length;
       this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
    }
  }
}
</script>

