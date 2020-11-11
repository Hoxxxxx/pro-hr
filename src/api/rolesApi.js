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

]

const ROLES_API = ApiFuns(rolesUrl)

export {
  ROLES_API
}