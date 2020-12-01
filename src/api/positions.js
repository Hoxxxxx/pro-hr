import {
  ApiFuns
} from './requestFuns'

const posiUrl = [
  // 获取职位列表
  {
    requstType: 'get',
    url: 'hr/positions',
    caller: 'getPositions',
  },
  // 新增职位
  {
    requstType: 'post',
    url: 'hr/positions',
    caller: 'addPosi',
  },
  // 编辑职位
  {
    requstType: 'put',
    url: 'hr/positions',
    caller: 'editPosi',
  },
  // 删除职位
  {
    requstType: 'delete',
    url: 'hr/positions',
    caller: 'deletePosi',
  },
  // 批量删除职位
  {
    requstType: 'delete',
    url: 'hr/positions',
    caller: 'deleteIds',
  },
]

const POSI_API = ApiFuns(posiUrl)

export {
  POSI_API
}