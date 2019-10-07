import GridBase from '@/components/TableGrid/gridBase'
import * as util from '@/common/utils/common'
import TreeGrid from './index'
/*
* 树形列表函数基类
* 对外开放函数(可以模版中使用)：
*   1、handSort  排序函数
*   2、handleFilter：过滤函数
*   3、selectionChange： 选中变化
*   4、queryGridData： 查询列表数据
*   5、changeEditDialogVisible 显示编辑页面
*   6、changeViewDialogVisible 显示查询页面
* */
export default {
  name: 'TreeGridBase',
  extends: GridBase, // 分页列表组件
  components: {
    TreeGrid
  },
  created() {
    this.handleSearch()
  },
  data() {
    return {

    }
  },
  methods: {
    queryGridData(current, size) {
      this.gridLoading = true;
      let getDataListResponse = this.getDataList({...this.queryParam, current, size});
      if(getDataListResponse){
        getDataListResponse.then(response => {
          if (util.isRequestSuccess(response)) {
            const pageData = util.getPageDataByResponse(response)
            this.gridData = pageData.list
            this.gridTotal = pageData.total
            if(pageData.list === undefined){
              this.gridData = util.getResponseContent(response);
            }
          }
          this.gridLoading = false
        })
      }
    },
  }
}
