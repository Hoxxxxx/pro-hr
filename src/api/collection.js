import request from '@/utils/request'

// 获取回款列表
export const collList = (params) => {
    return request.GET(`v2/finance/bank-slips`,
    {},
    {
        params
    })
}
