import request from '@/utils/request'

// 获取合同类型列表
export const contractTypeList = (params) => {
    return request.GET(`hr/contracttypes`,
    {},
    {
      params
    })
}

// 新增合同类型
export const addType = (params) => {
  return request.POST('hr/contracttypes',
    params
  )
}

// 删除类型
export const delType = (params) => {
  return request.DELETE(`hr/contracttypes/${params}`,
  {})
}

// 获取类型详情
export const typeInfo= (params) => {
  return request.GET(`hr/contracttypes/${params}`,
  {},
  {})
}

// 编辑类型
export const editType = (params) => {
  return request.PUT(`hr/contracttypes/${params.id}`,
    params
  )
}



// 获取合同列表
export const contractList = (params) => {
  return request.GET(`hr/contracts`,
  {},
  {
    params
  })
}

// 新增合同
export const addContract = (params) => {
return request.POST('hr/contracts',
  params
)
}

// 删除合同
export const delContract = (params) => {
return request.DELETE(`hr/contracts/${params}`,
{})
}

// 获取合同详情
export const contractInfo= (params) => {
return request.GET(`hr/contracts/${params}`,
{},
{})
}

// 编辑合同
export const editContract = (params) => {
return request.PUT(`hr/contracts/${params.id}`,
  params
)
}


