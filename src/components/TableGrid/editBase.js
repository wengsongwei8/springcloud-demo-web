import * as util from '@/common/utils/common'
/*
* 编辑函数基类
* 对外开放函数(可以模版中使用)：
*   1、changeDialogVisible  改变弹框状态
*   2、createData：新建数据函数
*   3、updateData： 更新数据函数
* */
export default {
  name: 'editBase',
  props: {
    changeDialogVisible: Function // 改变弹框显示状态
  },
  components: {
  },
  data() {
    return {
      domainName: '', // 域名称,例如新建用户，域名称为用户 (必选)
      formLoadding: false, // 正在加载按钮
      formOpration: 'create', // 弹框状态,create:新建 update:更新
      formData: {},
      rules: { }, // 校验规则
      editFormId: 'editFormId', // formId

    }
  },
  methods: {
    initDataFun(params) {
      // TODO 初始化数据 抽像函数，继承函数需实现
    },
    createDataFun() {
      // TODO 新增数据 抽像函数，继承函数需实现
    },
    updateDataFun() { // 更新数据实现
      // TODO 新数据 抽像函数，继承函数需实现
    },
    clearForm() {
      this.formLoadding = false
      this.formData = { }
      this.$nextTick(() => {
        this.$refs[this.editFormId].clearValidate()
      })
    },
    initCreate() {
      // TODO 进入新建页面时，初始化
    },
    toCreateForm() {
      this.initCreate();
      this.clearForm();
      this.formOpration = 'create'
    },
    initEdit() {
      // TODO 进入编辑页面时，初始化
    },
    toEditForm(id, row) {
      this.initEdit();
      this.clearForm();
      this.formLoadding = true
      this.formOpration = 'update'
      let initDataFunRes = this.initDataFun(id, row);
      if (initDataFunRes){
        initDataFunRes.then((response) => {
          if (util.isRequestSuccess(response)) {
            this.formData = util.getResponseContent(response)
          }
          this.formLoadding = false;
        })
      } else {
        this.formLoadding = false;
      }
    },
    createData() {
      this.$refs[this.editFormId].validate((valid) => {
        if (valid) {
          const createDataFunRes = this.createDataFun();
          if (createDataFunRes){
            createDataFunRes.then((response) => {
              if (util.isRequestSuccess(response)) {
                this.$emit('gridReload') // 刷新父组件列表
                this.createSuccessFun(response);
              } else {
                this.createFailFun(response);
              }
            });
          }
        }
      })
    },
    createSuccessFun(response){
      this.$notify({ title: '成功', message: '新建' + this.domainName + '成功', type: 'success', duration: 2000 })
    },
    createFailFun(response){
      this.$notify({ title: '失败', message: '创建' + this.domainName + '失败!', type: 'error', duration: 2000 });
    },
    updateData() { // 更新数据
      this.$refs[this.editFormId].validate((valid) => {
        if (valid) {
          let updateDataFunRes = this.updateDataFun();
          if (updateDataFunRes){
            updateDataFunRes.then((response) => {
              if (util.isRequestSuccess(response)) {
                this.$emit('gridReload') // 刷新列表
                this.updateSuccessFun(response);
              } else {
                this.updateFailFun(response);
              }
            })
          }
        }
      })
    },
    updateSuccessFun(response){
      this.$notify({ title: '成功', message: '更新' + this.domainName + '成功', type: 'success', duration: 2000 })
    },
    updateFailFun(response){
      this.$notify({ title: '失败', message: '更新' + this.domainName + '失败!', type: 'error', duration: 2000 });
    },
  }
}
