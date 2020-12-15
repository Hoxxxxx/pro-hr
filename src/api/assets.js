import request from '@/utils/request'

// 获取合同类型列表
export const assetsList = (params) => {
    return request.GET(`finance/intangible-asset`,
    {},
    {
      params
    })
}

// 删除类型
export const delAsset = (params) => {
  return request.DELETE(`finance/intangible-asset/${params}`,
  {})
}

// 新增合同类型
export const addAsset = (params) => {
  return request.POST('finance/intangible-asset',
    params
  )
}


// 获取类型详情
export const assetsInfo= (params) => {
  return request.GET(`finance/intangible-asset/${params}`,
  {},
  {})
}

// 编辑类型
export const editAsset = (params) => {
  return request.PUT(`finance/intangible-asset/${params.id}`,
    params
  )
}


