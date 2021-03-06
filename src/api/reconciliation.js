import request from '@/utils/request'

// 获取账期/部门信息（收入）
export const incomesInfo = (params) => {
    return request.GET(`finance/incomes/getPeriodAndDepartment`,
    {},
    {
        params
    })
}

// 获取收入列表
export const incomeList = (params) => {
    return request.GET('finance/incomes',
    {},
    {
        params
    })
}

// 新增收入列表
export const addIncome = (params) => {
    return request.POST('finance/incomes',
        params
    )
}



// 获取账期/部门信息（应收款）
export const receivablesInfo = (params) => {
    return request.GET(`finance/receivables/getPeriodAndDepartment`,
    {},
    {
        params
    })
}

// 获取应收款列表
export const receivablesList = (params) => {
    return request.GET('finance/receivables',
    {},
    {
        params
    })
}

// 新增应收款列表
export const addReceivables = (params) => {
    return request.POST('finance/receivables',
        params
    )
}

// 对账
export const checkReceivables = (params) => {
    return request.PUT('finance/receivables/checkAccount',
        {
            'check' : params
        }
    )
}




// 获取账期/部门信息（部门）
export const depRecInfo = (params) => {
    return request.GET(`finance/departmentreceivables/getPeriodAndDepartment`,
    {},
    {
        params
    })
}

// 获取部门应收款列表
export const depRecList = (params) => {
    return request.GET('finance/departmentreceivables',
    {},
    {
        params
    })
}

// 新增部门应收款列表
export const addDepRec = (params) => {
    return request.POST('finance/departmentreceivables',
        params
    )
}

// 获取发货单列表
export const deliverList = (params) => {
    return request.GET('finance/oa/receivables',
    {},
    {
        params
    })
}
// 获取发货单跳转链接
export const deliverLink = (params) => {
    return request.GET(`finance/oa/receivables/${params.id}`,
    {},
    {})
}

// 获取发票列表
export const invoiceList = (params) => {
    return request.GET('finance/oa/invoices',
    {},
    {
        params
    })
}
// 获取发票跳转链接
export const invoicesLink = (params) => {
    return request.GET(`finance/oa/invoices/${params.id}`,
    {},
    {})
}


// 获取付款冲账单列表
export const strikeList = (params) => {
    return request.GET('finance/receivable-write-off-documents',
    {},
    {
        params
    })
}

// 获取付款冲账单详情
export const strikeDetail = (params) => {
    return request.GET(`finance/receivable-write-off-documents/${params.id}`,
    {},
    {
        params
    })
}
// 开通账号
export const KT = (params,id) => {
    return request.PUT(`hr/staffs/${id}/create-account`,
        params
    )
}
// 停用账号
export const TY = (id) => {
    return request.PUT(`hr/staffs/${id}/disable-account`)
}
