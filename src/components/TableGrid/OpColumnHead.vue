<template>
  <div style="width:100%;padding-right: 0px;">
    <img :src="configImg" style="width:25px;float:right;cursor: pointer;padding-top: 5px;"
         alt="列配置" @click="changeColumnDialogVisible(true)"/>
    <span>操作</span>

    <!-- 列配置-->
    <el-dialog title="列配置" :visible.sync="columnsDialogVisible" :append-to-body="true">
      <column-config ref="columnConfig" :columns="columns" :changeDialogVisible="changeColumnDialogVisible">
      </column-config>
    </el-dialog>
  </div>
</template>

<script>
import * as util from '@/common/utils/common'
import configImg from '@/assets/common/config.png'
import ColumnConfig from '@/components/ColumnConfig'

export default {
  name: 'columnConfigHead',
  props: {
    columns: {
      type: Array,
      default: []
    },
    handSearch: Function,
  },
  data() {
    return {
      configImg: configImg,
      columnsDialogVisible: false, // 列配置弹框

    }
  },
  components: {
    ColumnConfig
  },
  methods: {
    changeColumnDialogVisible(flag) {
      this.columnsDialogVisible = !!flag
       this.handSearch();
    },
  }
}
</script>

