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

]

const PERMISSION_API = ApiFuns(permissionUrl)

export {
  PERMISSION_API
}