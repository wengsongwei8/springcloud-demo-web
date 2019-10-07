import { createOrg, updateOrg, getOrg, fetchTreeGridData } from '@/api/basic/orgApi'
import EditBase from '@/components/TableGrid/editBase'
import * as util from '@/common/utils/common'

export default {
  extends: EditBase,
  name: 'orgEdit',
  data() {
    return {
      domainName: '机构',
      editFormId: 'orgEditFormId',
      formData: {},
      rules: {
				parentId: [{ required: true, message: '父机构不能为空', trigger: 'blur' }
				],

				orgName: [{ required: true, message: '机构名称不能为空', trigger: 'blur' },
				    {min: 2, max: 20, message: '长度在2到20个字符以内', trigger: 'blur'}
				],
				orgIntroduction: [
				    { max: 500, message: '长度在500个字符以内', trigger: 'blur'}
				],

      },

      parentTreeData: []


    }
  },
  methods: {
    initDataFun(id) {
      this.initParentGridData(id);
      return getOrg(id);
    },
    initCreate() {
      this.initParentGridData('');
    },
    createDataFun() {
      const tempData = this.formatFormData();
      return createOrg(tempData);
    },
    updateDataFun() {
      const tempData = this.formatFormData();
      return updateOrg(tempData);
    },
    formatFormData(){
      // 把父级机构，转换为需要的父级机构
      const tempData = Object.assign({}, this.formData);
      const parentIdArrays = this.formData.parentId;
      if(typeof(parentIdArrays) != "string"){
        // 值为数组，说明重新选过了，如果没有说明值不变，不需要再转化
        let parentId = "-1";
        let parentIds = "";
        let orgLevel = 0;
        for(let i in parentIdArrays){
          parentId = parentIdArrays[i];
          if(parentIds.length>0){
            parentIds += ",";
          }
          parentIds += parentIdArrays[i];
          orgLevel ++;
        }
        tempData.parentId = parentId;
        tempData.parentIds = parentIds;
        tempData.orgLevel = orgLevel;
      }
      return tempData;
    },
    initParentGridData(id) {
      fetchTreeGridData({'filterId':id}).then(response => {
        if (util.isRequestSuccess(response)) {
          this.parentTreeData = util.getResponseContent(response)
        }
      });
    },
  }
}
