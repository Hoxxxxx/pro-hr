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
  // 新增员工
  {
    requstType: 'post',
    url: 'hr/staffs',
    caller: 'addStaff',
  },
  // 修改员工
  {
    requstType: 'put',
    url: 'hr/staffs',
    caller: 'changeStaff',
  },
  // 获取员工详情
  {
    requstType: 'get',
    url: 'hr/staffs',
    caller: 'staffInfo',
  },
  // 删除员工
  {
    requstType: 'delete',
    url: 'hr/staffs',
    caller: 'deleteStaff',
  },
  // 离职
  {
    requstType: 'post',
    url: 'hr/staffs/turnover',
    caller: 'turnover',
  },
  // 离职
  {
    requstType: 'post',
    url: 'hr/staffs/positive',
    caller: 'positive',
  },
  
  
]

const STAFFS_API = ApiFuns(staffsUrl)

export {
  STAFFS_API
}