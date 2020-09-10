import axios from 'axios'
let http = {
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

export default http