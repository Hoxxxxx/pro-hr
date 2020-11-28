import {
  ApiFuns
} from './requestFuns'

const posiUrl = [
  // 获取员工列表
  {
    requstType: 'get',
    url: 'hr/positions',
    caller: 'getPositions',
  },
]

const POSI_API = ApiFuns(posiUrl)

export {
  POSI_API
}