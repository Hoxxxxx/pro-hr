import {
  ApiFuns
} from './requestFuns'

const rolesUrl = [
  // 获取角色列表
  {
    requstType: 'get',
    url: 'hr/roles',
    caller: 'getRoles',
  },
  // 删除角色
  {
    requstType: 'delete',
    url: 'hr/roles',
    caller: 'deleteRoles',
  },
  // 新建角色
  {
    requstType: 'post',
    url: 'hr/roles',
    caller: 'addRoles',
  },

]

const ROLES_API = ApiFuns(rolesUrl)

export {
  ROLES_API
}