let configUrl = {
    getToken: '/api/authorizations',// 获取token
    getUserInfo: '/api/users/current/show',//用户信息
    // 员工管理
    getStaffList: '/api/users',// 员工列表/查看某个员工信息（需拼接员工id）
    addStaff: '/api/users',//新增员工
    deleteStaff:'/api/users',//删除员工
    departure:'/api/turnovers',//离职员工
    staffCount:'/api/users/statusCount',//列表页上方切换区域人数统计
    getDepartments: '/api/departmentsAll',//新增员工页面获取所有部门列表
    getJobs:'/api/positions',//新增员工页面获取所有职位列表
}

export default configUrl