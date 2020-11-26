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
]

const STAFFS_API = ApiFuns(staffsUrl)

export {
  STAFFS_API
}