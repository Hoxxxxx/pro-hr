import {
  ApiFuns
} from './requestFuns'

const menusUrl = [
  // 获取菜单列表
  {
    requstType: 'get',
    url: 'hr/menus',
    caller: 'getMenus',
  },
  // 新增菜单
  {
    requstType: 'post',
    url: 'hr/menus',
    caller: 'addMenu',
  },
  // 修改菜单
  {
    requstType: 'put',
    url: 'hr/menus',
    caller: 'editMenu',
  },
  // 修改菜单
  {
    requstType: 'delete',
    url: 'hr/menus',
    caller: 'deleteMenu',
  },
]

const MENUS_API = ApiFuns(menusUrl)

export {
  MENUS_API
}