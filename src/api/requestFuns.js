import request from '@/utils/request'

function ApiFuns(URLS) {
  const API = {}
  URLS.forEach(item => {
    let caller = item.caller
    switch (item.requstType) {
      case 'get':
        API[caller] = params => {
          return request.GET(item.url, {}, {
            params
          })
        }
        break;
      case 'post':
        API[caller] = params => {
          return request.POST(item.url,
            params
          )
        }
        break;
      default:
        break;
    }
  })
  return API
}
export {ApiFuns}