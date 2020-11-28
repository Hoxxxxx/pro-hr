import request from '@/utils/request'

// 获取回款列表
export const incomesInfo = (params) => {
    return request.GET(`finance/incomes/getPeriodAndDepartment`,
    {},
    {
        params
    })
}
