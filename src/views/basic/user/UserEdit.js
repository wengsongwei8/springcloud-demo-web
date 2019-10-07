import { createUser, updateUser, getUserById } from '@/api/basic/userApi'
import EditBase from '@/components/TableGrid/editBase'
import {  fetchTreeGridData } from '@/api/basic/orgApi'
import * as util from '@/common/utils/common'
import globeData from '@/common/globleData'

export default {
  extends: EditBase,
  name: 'userEdit',
  data() {
    return {
      domainName: '用户',
      editFormId: 'userEditFormId',
      formData: {},
      parentTreeData: [],
      sexs: globeData.SEXS,
      rules: {
				account: [{ required: true, message: '账号不能为空', trigger: 'blur' }
          ,{min: 2,max: 20, message:'长度在2到20个字符以内',trigger:'blur'}
				],
				userName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }
            ,{min: 2,max: 20, message:'长度在2到20个字符以内',trigger:'blur'}
				],
        phone: [{ required: true, validator: this.$valid.getPhoneValidator(), trigger: 'blur'}],
				email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
                ,{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
				sex: [{ required: true, message: '性别不能为空', trigger: 'blur' }],


      }
    }
  },
  methods: {
    initDataFun(id) { // 初始化编辑数据函数实现

      return getUserById(id);
    },
    initCreate() {
      this.initOrgGridData();
    },
    initEdit() {
      this.initOrgGridData();
    },
    createDataFun() { // 新增数据函数实现
      return createUser(this.formData);
    },
    updateDataFun() { // 更新数据实现
      const tempData = Object.assign({}, this.formData)
      return updateUser(tempData);
    },
    initOrgGridData() {
      fetchTreeGridData().then(response => {
        if (util.isRequestSuccess(response)) {
          this.parentTreeData = util.getResponseContent(response)
        }
      });
    },
  }
}
