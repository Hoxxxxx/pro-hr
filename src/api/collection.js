import request from '@/utils/request'

// 获取回款列表
export const collList = (params) => {
    return request.GET(`finance/bank-slips`,
    {},
    {
        params
    })
}

// 新增回款列表
export const addCollList = (params) => {
  return request.POST('finance/bank-slips',
      params
  )
}

// 回款抛转集团 / 审核
export const transAdd = (params) => {
  return request.POST(`finance/bank-slips/transfromAndVerify/${params}`,
      // params
  )
}

// 回款抛转全票通 / 全媒体
export const transPar = (params) => {
  return request.POST(`finance/bank-slips/transfromInternal/${params.id}`,
      params
  )
}

// 取消审核
export const can_Trans = (params) => {
  return request.POST(`finance/bank-slips/cancelVerify/${params}`,
      // params
  )
}

// 获取回款详情
export const collInfo= (params) => {
  return request.GET(`finance/bank-slips/${params}`,
  {},
  {})
}

// 编辑
export const editColl = (params) => {
  return request.PUT(`finance/bank-slips/${params.id}`,
      {
        params
      }
  )
}

// 删除
export const delColl = (params) => {
  return request.DELETE(`finance/bank-slips/${params}`,
  {})
}