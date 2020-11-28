import {
  ApiFuns
} from './requestFuns'

const staffsUrl = [
  // 获取员工列表
  {
    requstType: 'get',
    url: 'hr/staffs',
    caller: 'getStaffs',
  },
  // 获取待查字段列表
  {
    requstType: 'get',
    url: 'hr/staffs/fields',
    caller: 'getFields',
  },
  // 分类人数统计
  {
    requstType: 'get',
    url: 'hr/staffs/typeCount',
    caller: 'staffsCount',
  },
  // 获取待查字段列表
  {
    requstType: 'post',
    url: 'hr/staffs',
    caller: 'addStaff',
  },
]

const STAFFS_API = ApiFuns(staffsUrl)

export {
  STAFFS_API
}