import {
  ApiFuns
} from './requestFuns'

const menusUrl = [
  // 获取员工列表
  {
    requstType: 'get',
    url: 'hr/menus',
    caller: 'getMenus',
  },
]

const MENUS_API = ApiFuns(menusUrl)

export {
  MENUS_API
}