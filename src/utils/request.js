// 引入axios
import axios from 'axios';
import {
    Message
} from 'element-ui'

// axios配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
console.log(process.env)

axios.interceptors.request.use(
    config => {
        // 添加token
        console.log('VUE_APP_URL:',process.env.VUE_APP_URL)
  console.log('VUE_APP_BASE_API:',process.env.VUE_APP_BASE_API)
        let curUrl = window.location.href
        let token = sessionStorage.getItem('token')
        let orgid = sessionStorage.getItem('OrgId')
        if (token) {
            let exp = sessionStorage.getItem('exp')
            let now = Math.round(new Date() / 1000)
            if (now > exp) {
                sessionStorage.clear()
                // window.location = '/error'
                window.location.href = `http://test.oa.hualumedia.com/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${curUrl}`
            }else{
                config.headers.Authorization = 'Bearer ' + token,
                config.headers['Org-Id'] = orgid
            }
        }
        return config
    }, err => {
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.error) {
                if (response.data.error.code === 900009) {
                    window.location = '/error'
                    sessionStorage.clear()
                    return Message.warning({
                        message: '登录超时：请重新登录',
                        type: 'warning'
                    })
                }
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }, err => {
        if (err && err.response) {
            console.log(err.response)
            switch (err.response.status) {
                // case 400:
                //     console.log('错误请求')
                //     break;
                case 401:
                    Message.warning({
                        message: '登录超时：请重新登录！',
                        type: 'warning'
                    })
                    sessionStorage.clear();
                    // window.location = '/error'
                    let curUrl = window.location.href
                    window.location.href = `http://test.oa.hualumedia.com/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${curUrl}`
                    break;
                    case 403:
                        Message.warning({
                            message: '无访问权限！',
                            type: 'warning'
                        })
                        break;
                    // case 404:
                    //     window.location = '/404'
                    //     console.log('请求错误,未找到该资源')
                    //     break;
                    // case 405:
                    //     console.log('请求方法未允许')
                    //     break;
                    // case 408:
                    //     console.log('请求超时')
                    //     break;
                case 500:
                    // Message.warning({
                    //     message: '无权限访问！',
                    //     type: 'warning'
                    // })
                    console.log('无权限访问')
                break;
                // case 404:
                //     window.location = '/404'
                //     console.log('请求错误,未找到该资源')
                //     break;
                // case 405:
                //     console.log('请求方法未允许')
                //     break;
                // case 408:
                //     console.log('请求超时')
                //     break;
                // case 500:
                // Message.warning({
                //     message: '服务器端出错',
                //     type: 'warning'
                // })
                // break;
                // case 501:
                //     console.log('网络未实现')
                //     break;
                // case 502:
                //     console.log('网络错误')
                //     break;
                // case 503:
                //     console.log('服务不可用')
                //     break;
                // case 504:
                //     console.log('网络超时')
                //     break;
                // case 505:
                //     console.log('http版本不支持该请求')
                //     break;
                default:
                    console.log(`连接错误${err.response.status}`)
            }
        } else {
            Message.warning({
                message: '连接到服务器失败',
                type: 'warning'
            })
        }
        return Promise.resolve(err.response)
    }
)

export default {
    GET(url, headers, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                headers,
                params: params.params
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    POST(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    DELETE(url, params) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                params: params
            }).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err)
            })
        })
    },
    PUT(url, params) {
        return new Promise((resolve, reject) => {
            axios.put(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
        })
    },
}