import {formatSex} from '@/common/formatter'

export default
  [
    { type: 'selection' }, // 复选框
    {
      label: '账号',
      prop: 'account',
      width: 200
    },
    {
      label: '用户名称',
      prop: 'userName',
      width: 200
    },
    {
      label: '电话',
      prop: 'phone',
      width: 120
    },
    {
      label: '性别',
      prop: 'sex',
      width: 50,
      formatter(val) {
        return formatSex(val);
      }
    },
    {
      label: '邮箱',
      prop: 'email',

    }

  ]

