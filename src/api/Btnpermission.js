import request from '@/utils/request'

// 获取账期/部门信息（收入）
export const btnPermission = (params) => {
    return request.GET(`hr/admins/permission`,
    {},
    {
        params
    })
}