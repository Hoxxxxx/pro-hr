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
  // 新增管理员
  {
    requstType: 'post',
    url: 'hr/admins',
    caller: 'addAdmins',
  },
  // 编辑管理员
  {
    requstType: 'put',
    url: 'hr/admins',
    caller: 'editAdmins',
  },
  //删除管理员
  {
    requstType: 'delete',
    url: 'hr/admins',
    caller: 'deleteAdmins',
  },
  // 改变当前管理员状态
  {
    requstType: 'put',
    url: 'hr/admins/changeStatus',
    caller: 'changeStatus',
  }

]

const ADMINS_API = ApiFuns(adminsUrl)

export {
  ADMINS_API
}