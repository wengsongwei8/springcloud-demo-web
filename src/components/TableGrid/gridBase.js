import waves from '@/common/directive/waves' // 水波纹指令
import * as util from '@/common/utils/common'
import TableGrid from './index'
import OpColumnHead from './OpColumnHead.vue'

export default {
  name: 'GridBase',
  directives: {
    waves,
  },
  components: {
    TableGrid,
    OpColumnHead
  },
  created() {
    this.handleSearch();
    this.initForCreated();
  },
  mounted() {
    this.initForMounted();
  },
  data() {
    return {
      rowKey: 'id', // 主键ID对应的Field
      domainName: '', // 域名称,例如用户列表，域名称为用户
      delParamsKey: 'ids', // 删除参数key,例如｛'ids':'1,2,3'｝
      queryParam: {}, // 查询参数
      gridListVisible: true, // 列表界面是否可见
      editDialogVisible: false, // 新建编辑弹框
      viewDialogVisible: false, // 查看弹框
      formOpration: '', // form 操作
      dialogStatusTitle: '',
      downloadLoading: false,
      gridData: [],  // 表格数据
      gridTotal: 0, // 列表总数
      gridLoading: false, // 列表正在加载状态
      selectionRows: [], // 选中的行
      isOpRowEdit: true, // 是否使用列编辑操作
      isOpRowDel: true, // 是否使用列删除操作
      viewFormId: "viewForm", // 查看页面ID
      editFormId: "editForm", // 编辑页面ID
    }
  },
  methods: {
    initForCreated() { // 抽像函数，继承函数需实现
      // TODO 抽像函数，继承函数需实现
    },
    initForMounted() { // 抽像函数，继承函数需实现
      // TODO 抽像函数，继承函数需实现
    },
    getDataList(params) { // 抽像函数，继承函数需实现
      // TODO 抽像函数，继承函数需实现
    },
    deleteByKey(row) { // 根据主键删除
      // TODO 抽像函数，继承函数需实现
    },
    getOpColums(){ // 列表操作按钮
      let opColumnConfig = this.getOpColumnConfig()
      return {
        fixed: 'right',
        width: opColumnConfig.width,
        renderHeader: (h) => [
          <OpColumnHead columns={this.columns}  handSearch={this.handleSearch}>
          </OpColumnHead>
        ],
        renderBody: opColumnConfig.opBody
      }
    },
    getOpColumnDefaultConfig(){ // 列操作显示配置
      let config = {};
      config.width = 110;
      config.isOnlyRowView = false;// 只显示查看详情操作
      config.isRowEdit = true;
      config.isRowDel = true;
      config.isRowView = false;
      return config;
    },
    customOpColumnConfig(){ // 自定义列操作显示配置
      return {};
    },
    getOpColumnConfig(){ // 获取列操作显示配置
      let defalutConfig = this.getOpColumnDefaultConfig();
      let customConfig = this.customOpColumnConfig();
      let config = Object.assign({}, defalutConfig, customConfig);
      if (!config.body){ // 如果不自定义操作内容，则用系统自带的
        if (config.isOnlyRowView){ // 只显示查看按钮
          config.opBody = (h, row) =>
            <div style="padding:0px;margin:0px;" align="center">
              <el-button type="primary" icon="el-icon-share" size="mini"
                         onClick={() => this.toView(row)}>查看</el-button>
            </div>
        } else {
          config.opBody = (h, row) => [
            <div style="padding:0px;margin:0px;" align="center">
              <el-dropdown >
                <el-button type="primary" size="mini">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" style="margin-top: 0px;margin-left: 17px;">
                  <el-dropdown-item style="padding: 0px;">
                    {this.getOpBtnBody(h, row, config)}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          ];
        }
      }
      return config;
    },
    getOpBtnBody(h, row, config){ // 获取操作内容
      return <div style="width: 110px;">
        {this.getOpBtnBodyOfView(h, row, config)}
        {this.getOpBtnBodyOfEdit(h, row, config)}
        {this.getOpBtnBodyOfDel(h, row, config)}
        {this.getOpBtnBodyOfMore(h, row, config)}
      </div>
    },
    getOpBtnBodyOfMore(h, row, config){ // 除了查看、修改、删除外，更多的操作字定义
      return "";
    },
    getOpBtnBodyOfView(h, row, config){ // 获取查看操作内容
      if (config && config.isRowView){
        return <div>
          <el-button type="primary" icon="el-icon-share" size="mini"
                     onClick={() => this.toView(row)}>查看</el-button>
        </div>
      } else {
        return ""
      }
    },
    getOpBtnBodyOfEdit(h, row, config){ // 获取编辑操作内容
      if (config && config.isRowEdit){
        return <div>
          <el-button type="primary" icon="el-icon-edit" size="mini"
                     onClick={() => this.toEdit(row)}>编辑</el-button>
        </div>
      } else {
        return ""
      }
    },
    getOpBtnBodyOfDel(h, row, config){ // 获取删除操作内容
      if (config && config.isRowDel){
        return <div>
          <el-button type="primary" icon="el-icon-delete" size="mini"
                     onClick={() => this.handleDelete(row)}>删除</el-button>
        </div>
      } else {
        return ""
      }
    },

    toCreate() {
      this.dialogStatusTitle= '新建' + this.domainName;
      this.changeEditDialogVisible(true)
      this.$nextTick(() => {
        this.$refs[this.editFormId].toCreateForm()
      });
    },
    toEditBySelected() {
      if(this.selectionRows.length>1){
        this.$message({  message: '一次只能编辑一行!', type: 'warning'})
        return;
      }
      if(this.selectionRows.length<1){
        this.$message({  message: '请选择需要编辑的行!', type: 'warning'})
        return;
      }
      this.toEdit(this.selectionRows[0]);
    },
    toEdit(row) {
      this.dialogStatusTitle= '编辑' + this.domainName;
      this.changeEditDialogVisible(true)
      this.$nextTick(() => {
        this.$refs[this.editFormId].toEditForm(row[this.rowKey], row)
      });
    },
    toView(row) {

      this.changeViewDialogVisible(true)
      this.$nextTick(() => {
        this.$refs[this.viewFormId].initView(row[this.rowKey], row)
      });
    },
    handleDelete(row) { // 单元素删除
      let params = { };
      params[this.delParamsKey] = row[this.rowKey];
      this.deleteByKey(params).then((response) => {
        this.handleDeleteResponse(response);
      })
    },
    batchDelete(){ // 批量删除
      let ids = util.getSelectedKeysByRows(this.selectionRows, this.rowKey);
      if (ids && ids.length>0 ){
        let params = { };
        params[this.delParamsKey] = ids.join(',');
        let deleteByKeyRes = this.deleteByKey(params);
        if (deleteByKeyRes){
          deleteByKeyRes.then((response) => {
            this.handleDeleteResponse(response);
          })
        }
      } else {
        this.$message({  message: '请选中一行或多行再删除!', type: 'warning'})
      }
    },
    handleDeleteResponse(response, successMessage, errorMessage) { // 删除后的操作
      successMessage = successMessage ? successMessage : '删除成功!'
      errorMessage = errorMessage ? errorMessage : '删除失败!'
      errorMessage = response.data && response.data.message ? response.data.message : errorMessage
      if (util.isRequestSuccess(response)) {
        this.$message({message: successMessage, type: 'success'})
        this.handleSearch()
      } else {
        this.$message({  message: errorMessage, type: 'error'})
      }
    },
    handleDownload() {
      console.log('TODO')
    },
    handleFilter(filters) { // 过滤
      util.setFilterParam(this.queryParam, filters)
      this.handleSearch();
    },
    handSort({column, prop, order}) { // 排序
      util.setSortParam(this.queryParam, prop, order);
      this.handleSearch();
    },
    selectionChange(selections) { // 选中
      this.selectionRows = selections;
    },
    handleSearch() {
      this.queryGridData();
    },
    queryGridData(current, size) {
      this.gridLoading = true;
      let getDataListRes = this.getDataList({...this.queryParam, current, size});
      if (getDataListRes){
        getDataListRes.then(response => {
          if (util.isRequestSuccess(response)) {
            const pageData = util.getPageDataByResponse(response);
            if (pageData  && pageData.list ){ // 分页的情况
              this.gridData = pageData.list
              this.gridTotal = pageData.total
            } else {
              this.gridData = util.getResponseContent(response);
            }
          }
          this.gridLoading = false;
        })
      } else {
        this.gridLoading = false;
      }
    },
    closeDialogAndSearch() {
      this.handleSearch()
      this.changeEditDialogVisible(false)
    },
    changeGridVisible(flag){
      this.gridListVisible = !flag;
    },
    changeEditDialogVisible(flag) {
      this.editDialogVisible = !!flag
      this.changeGridVisible(flag);
    },
    changeViewDialogVisible(flag) {
      this.viewDialogVisible = !!flag
      this.changeGridVisible(flag);
    },
  }
}
