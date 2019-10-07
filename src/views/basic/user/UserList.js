import GridBase from '@/components/TableGrid/gridBase'
import { fetchList, delUser } from '@/api/basic/userApi'
import {  fetchTreeGridData } from '@/api/basic/orgApi'
import UserEdit from './UserEdit.vue'
import UserColumns from './UserColumns'
import * as util from '@/common/utils/common'

export default {
  extends: GridBase, // 分页列表组件
  name: 'userList',
  components: {
    UserEdit
  },
  watch: {
    filterText(val) {
      this.$refs.orgTree.filter(val);
    }
  },
  data() {
    return {
      rowKey: 'id', // 主键
      columns: [this.getOpColums(), ...UserColumns ],
      domainName: '用户', // 域名称,例如用户列表，域名称为用户
      parentTreeData: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    initForCreated(){
      fetchTreeGridData().then(response => {
        if (util.isRequestSuccess(response)) {
          this.parentTreeData = util.getResponseContent(response)
        }
      });
    },
    getDataList(params) { // 列表查询(必选)
      return fetchList(params);
    },
    deleteByKey(params) { // 删除函数(必选)
      return delUser(params);
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
