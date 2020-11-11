/**
 * @export API {Object}
 * @param requstType:请求方式
 * url:请求地址
 * caller:调用名
 * 调用：API.sobsList()
 */
import {
  ApiFuns
} from './requestFuns'

const configUrl = [
  // 获取token
  {
    requstType: 'post',
    url: 'hr/authorizations',
    caller: 'getToken'
  },

]

const BASE_API = ApiFuns(configUrl)

export default BASE_API