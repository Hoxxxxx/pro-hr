import {
  ApiFuns
} from './requestFuns'

const permissionUrl = [
  // 获取权限列表
  {
    requstType: 'get',
    url: 'hr/permissions',
    caller: 'getPermission',
  },
  // 新增权限
  {
    requstType: 'post',
    url: 'hr/permissions',
    caller: 'addPermission',
  },
  // 修改权限
  {
    requstType: 'put',
    url: 'hr/permissions',
    caller: 'editPermission',
  },
  // 删除权限
  {
    requstType: 'delete',
    url: 'hr/permissions',
    caller: 'deletePermission',
  },
  
  {
    requstType: 'get',
    url: 'hr/admins/permission',
    caller: 'getAdminPer',
  },
]

const PERMISSION_API = ApiFuns(permissionUrl)

export {
  PERMISSION_API
}