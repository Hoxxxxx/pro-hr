import {
  ApiFuns
} from './requestFuns'

const adminsUrl = [
  // 获取管理员列表
  {
    requstType: 'get',
    url: 'hr/admins',
    caller: 'getAdmins',
  },

]

const ADMINS_API = ApiFuns(adminsUrl)

export {
  ADMINS_API
}