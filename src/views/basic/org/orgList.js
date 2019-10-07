import GridBase from '@/components/TableGrid/gridBase'
import * as util from '@/common/utils/common'
import { fetchList, delOrg, fetchTreeGridData } from '@/api/basic/orgApi'
import orgEdit from './orgEdit.vue'
import Columns from './orgColumns'

export default {
  extends: GridBase, // 分页列表组件
  name: 'orgList',
  components: {
    orgEdit
  },
  data() {
    return {
      rowKey: 'id', // 主键
      columns: [...Columns, this.getOpColums()],
      viewFormId: "viewForm", // 查看页面ID
      editFormId: "editForm", // 编辑页面ID
      domainName: '机构', // 域名称,例如用户列表，域名称为用户
      parentTreeData: [],
    }
  },
  methods: {
    initForCreated(){
      fetchTreeGridData().then(response => {
        if (util.isRequestSuccess(response)) {
          this.parentTreeData = util.getResponseContent(response)
        }
      });
    },
    getDataList(params) { // 列表查询
      return fetchList(params);
    },
    deleteByKey(params) { // 删除函数
      return delOrg(params);
    },
    initParentGridData() {
      fetchTreeGridData().then(response => {
        if (util.isRequestSuccess(response)) {
          this.parentTreeData = util.getResponseContent(response)
        }
      });
    },
  }
}
