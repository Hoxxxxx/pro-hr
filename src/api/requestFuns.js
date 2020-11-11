import request from '@/utils/request'

function ApiFuns(URLS) {
  const API = {}
  URLS.forEach(item => {
    let caller = item.caller
    switch (item.requstType) {
      case 'get':
        API[caller] = (params = {}, carrys) => {
          let url = carrys ? `${item.url}/${carrys}` : item.url
          return request.GET(url, {}, {
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
export {
  ApiFuns
}