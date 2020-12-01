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
  // 删除部门
  {
    requstType: 'delete',
    url: 'hr/departments',
    caller: 'deleteDeparts',
  },
  // 编辑部门
  {
    requstType: 'put',
    url: 'hr/departments',
    caller: 'editDeparts',
  },
]

const DEPART_API = ApiFuns(departUrl)

export {
  DEPART_API
}