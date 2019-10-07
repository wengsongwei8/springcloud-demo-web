import { isRequestSuccess, getResponseContent } from '@/common/utils/common'
import { formatSex } from '@/common/formatter'

/*
* 查看函数基类
* 对外开放函数(可以模版中使用)：
*   1、changeDialogVisible  改变弹框状态
* */
export default {
  name: 'viewBase',
  props: {
    changeDialogVisible: Function // 改变弹框显示状态
  },
  data() {
    return {
      formLoadding: false, // 正在加载按钮
      formData: {},
      domainName: '', // 域名称,例如新建用户，域名称为用户 (必选)
    }
  },
  methods: {
    initDataFun(id, row) {
      // TODO 初始化数据 抽像函数，继承函数需实现
    },
    initView(id, row) {
      this.formLoadding = true
      let dataFunRes = this.initDataFun(id, row);
      if (dataFunRes){
        dataFunRes.then((response) => {
          if (isRequestSuccess(response)) {
            this.formData = getResponseContent(response)
          } else {
            this.formData = {}
            this.$notify({ title: '失败', message: '获取'+ this.domainName + '信息失败', type: 'error', duration: 2000 })
          }
          this.formLoadding = false;
        })
      } else {
        this.formLoadding = false;
      }
    },
    formatterSex(val) {
      return formatSex(val)
    }
  }
}
