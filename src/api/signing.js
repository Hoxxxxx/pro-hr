import request from '@/utils/request'

// 获取回款列表
export const suppliersList = (params) => {
    return request.GET(`finance/suppliers`,
    {},
    {
        params
    })
}

// 获取回款详情
export const suppliersInfo = (id) => {
  return request.GET(`finance/suppliers/${id}`,
  {},
  {})
}

// 获取客户列表
export const customersList = (params) => {
  return request.GET(`finance/customers`,
  {},
  {
      params
  })
}

// 获取客户详情
export const customersInfo = (id) => {
return request.GET(`finance/customers/${id}`,
{},
{})
}