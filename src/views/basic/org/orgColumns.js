import {formatDate} from '@/common/formatter'


export default
  [
    { type: 'selection' }, // 复选框

    {
      label: '机构名称',
      prop: 'orgName',
      width: 200
    },

    {
      label: '机构简介',
      prop: 'orgIntroduction',
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: 200,
      formatter(val) {
        return formatDate(val);
      }
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      width: 200,
      formatter(val) {
        return formatDate(val);
      }
    },
  ]

