
let url = '/baseApi'

let configUrl = {
    // 获取token
    getToken: url + '/api/token/get',
    getUserInfo:url + '/api/auth/show',
    // 员工列表
    getStaffList:url + '/api/user/list'
}

export default configUrl