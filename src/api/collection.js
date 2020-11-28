import request from '@/utils/request'

// 获取回款列表
export const collList = (params) => {
    return request.GET(`finance/bank-slips`,
    {},
    {
        params
    })
}
