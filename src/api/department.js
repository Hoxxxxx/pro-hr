import {
  ApiFuns
} from './requestFuns'

const departUrl = [
  // 获取部门列表
  {
    requstType: 'get',
    url: 'hr/departments',
    caller: 'getDeparts',
  },
  // 新增部门
  {
    requstType: 'post',
    url: 'hr/departments',
    caller: 'addDeparts',
  },
]

const DEPART_API = ApiFuns(departUrl)

export {
  DEPART_API
}