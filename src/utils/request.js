// 引入axios
import axios from 'axios';
import { Message } from 'element-ui'

// axios配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API

axios.interceptors.request.use(
    config => {
        // 添加token
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
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
                    window.location = '/login'
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
            switch (err.response.status) {
                case 400:
                    console.log('错误请求')
                    break;
                case 401:
                    sessionStorage.clear();
                    window.location = '/login'
                    break;
                case 403:
                    window.location = '/403'
                    console.log('无权限访问')
                    break;
                case 404:
                    window.location = '/404'
                    console.log('请求错误,未找到该资源')
                    break;
                case 405:
                    console.log('请求方法未允许')
                    break;
                case 408:
                    console.log('请求超时')
                    break;
                case 500:
                    console.log(`服务器端出错：${err.response.data.message}`)
                    break;
                case 501:
                    console.log('网络未实现')
                    break;
                case 502:
                    console.log('网络错误')
                    break;
                case 503:
                    console.log('服务不可用')
                    break;
                case 504:
                    console.log('网络超时')
                    break;
                case 505:
                    console.log('http版本不支持该请求')
                    break;
                default:
                    console.log(`连接错误${err.response.status}`)
            }
        } else {
            console.log('连接到服务器失败')
        }
        return Promise.resolve(err.response)
    }
)

export default {
    GET(url, header = {}, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                header,
                params
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    POST(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

