import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('@/views/home/Home')
const Welcome = () => import('@/views/home/Welcome')
const error = () => import('@/components/error')
// 员工管理
const staffManage = () => import('@/views/staffManage/staffManage')
const staffAdd = () => import('@/views/staffManage/staffAdd')
const staffMsg = () => import('@/views/staffManage/staffMsg')
const staffChange = () => import('@/views/staffManage/staffChange')
// 组织管理
const department = () => import('@/views/organization/department')
const position = () => import('@/views/organization/position')
// 权限管理
const admins = () => import('@/views/administrator/admins')
const roles = () => import('@/views/administrator/roles')
const permissions = () => import('@/views/administrator/permissions')
const menus = () => import('@/views/administrator/menus')
const system = () => import('@/views/administrator/system')

// 对账单
const income = () => import('@/views/finance/income')
const receivable = () => import('@/views/finance/receivable')
const depReceivable = () => import('@/views/finance/depRec')
// 回款单
const backPayment = () => import('@/views/collection/backPayMent/index')
const payInfo = () => import('@/views/collection/backPayMent/payInfo')
const payDeliver = () => import('@/views/collection/deliver/list')
const payInvoice = () => import('@/views/collection/invoice/list')
const payStrike = () => import('@/views/collection/strike/list')
// 合同
const contractList = () => import('@/views/contract/contractList/index')
const contractInfo = () => import('@/views/contract/contractList/contractInfo')
const contractType = () => import('@/views/contract/contractType/index')
// 无形资产
const assList = () => import('@/views/intangibleAss/assList/index')
const assInfo = () => import('@/views/intangibleAss/assList/assInfo')


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name:'home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      name: 'home',
      component: Welcome
    }]
  },
  {
    path: '/error',
    component: error,
  },
  // 员工管理
  {
    path: '/staffManage',
    name: "员工管理",
    component: Home,
    redirect: '/staffManage',
    children: [{
        path: '/staffManage',
        name: '员工列表',
        component: staffManage
      },
      {
        path: '/staffAdd',
        name: '新增员工',
        component: staffAdd
      },
      {
        path: '/staffMsg',
        name: '查看员工信息',
        component: staffMsg
      },
      {
        path: '/staffChange',
        name: '人员异动表',
        component: staffChange
      },
    ]
  },
  // 权限管理
  {
    path: '/administrator',
    name: '权限管理',
    redirect: '/admins',
    component: Home,
    children: [{
        path: '/admins',
        name: '管理员管理',
        component: admins
      },
      {
        path: '/roles',
        name: '角色管理',
        component: roles
      },
      {
        path: '/permissions',
        name: '权限管理',
        component: permissions
      },
      {
        path: '/menus',
        name: '菜单管理',
        component: menus
      },
      {
        path: '/system',
        name: '系统设置',
        component: system
      }
    ]
  },
  // 组织管理
  {
    path: '/organization',
    name: '组织管理',
    redirect: '/department',
    component: Home,
    children: [{
        path: '/department',
        name: '部门管理',
        component: department
      },
      {
        path: '/position',
        name: '职位管理',
        component: position
      }
    ]
  },
  // 财务对账
  {
    path: '/finance',
    name: "财务对账",
    component: Home,
    redirect: '/finance/income',
    children: [{
        path: 'income',
        name: '收入费用情况',
        component: income
      },
      {
        path: 'receivable',
        name: '应收账款核对',
        component: receivable
      },
      {
        path: 'depReceivable',
        name: '部门应收账款',
        component: depReceivable
      },
    ]
  },
  // 收款管理
  {
    path: '/collection',
    name: "收款管理",
    component: Home,
    redirect: '/collection/backPayment/index',
    children: [{
        path: 'backPayment/index',
        name: '汇款单管理',
        component: backPayment
      },
      {
        path: 'backPayment/payInfo',
        name: '新增汇款单',
        component: payInfo
      },
      {
        path: 'deliver/list',
        name: '发票申请单列表',
        component: payDeliver
      },
      {
        path: 'invoice/list',
        name: '发票申请管理',
        component: payInvoice
      },
      {
        path: 'strike/list',
        name: '收款冲账单',
        component: payStrike
      },
    ]
  },
  // 合同管理
  {
    path: '/contract',
    name: '合同管理',
    component: Home,
    redirect: '/contract/contractList',
    children: [{
        path: 'contractList',
        name: '合同列表',
        component: contractList
      },
      {
        path: 'contractInfo',
        name: '查看合同',
        component: contractInfo
      },
      {
        path: 'contractType',
        name: '合同类型',
        component: contractType
      },
    ]
  },
  // 无形资产管理
  {
    path: '/intangibleAss',
    name: '无形资产管理',
    component: Home,
    redirect: '/intangibleAss/assList',
    children: [{
        path: 'assList',
        name: '无形资产列表',
        component: assList
      },
      {
        path: 'contractInfo',
        name: 'contractInfo',
        component: contractInfo
      },
      {
        path: 'assInfo',
        name: 'assInfo',
        component: assInfo
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


import {
  BASE_API
} from "@/api/baseApi"
import jwtDecode from 'jwt-decode'
import {
  btnPermission
} from '@/api/Btnpermission'


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("token")
  let curUrl = window.location.href
  if (token) {
    const code = jwtDecode(token)
    let now = Math.round(new Date() / 1000)
    let exp = code.exp
    if (now < exp) {
      next()
    } else {
      window.sessionStorage.clear()
      // next('/error')
      window.location.href = `http://test.oa.hualumedia.com/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${curUrl}`
    }
  } else {
    if (window.location.href.includes('code')) {
      let urlParams = window.location.href.split('?')[1].split('&')
      let allParams = {}
      urlParams.forEach(item => {
        let key = item.split('=')[0]
        let val = item.split('=')[1]
        allParams[key] = val
      })
      let params = {
        code: allParams.code
      }
      BASE_API.getToken(params).then(res => {
        if (res.status == 200) {
          let token = res.data.token
          const code = jwtDecode(token)
          let oauserinfo = {
            oauserid: code.oauserid,
            oaname: code.oaname
          }
          sessionStorage.setItem('exp', code.exp)
          sessionStorage.setItem('oauserinfo', JSON.stringify(oauserinfo))
          sessionStorage.setItem('OrgId', code.orgid)
          sessionStorage.setItem('token', token)
          // 获取按钮权限
          btnPermission()
            .then(res => {
              let permissionList = JSON.stringify(res.data)
              sessionStorage.setItem('permissionList', permissionList)
            })
          delete allParams.code
          next({
            path: to.path,
            query: allParams
          })
        } else {
          console.log('token获取失败！')
          delete allParams.code
          let paraStr = ''
          for (let key in allParams) {
            paraStr += `&${key}=${allParams[key]}`
          }
          let urlStr = window.location.href.split('?')[0]
          let curUrl = `${urlStr}?${paraStr.substring(1)}`
          console.log(window.location.href)
          window.location.href = `http://test.oa.hualumedia.com/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${curUrl}`
        }
      })
    } else {
      window.sessionStorage.clear()
      window.location.href = `http://test.oa.hualumedia.com/admin.php?ac=apply&fileurl=applylist&type=sso&redirect=${curUrl}`
      // 通过判断path防止出现死循环
      // if (to.path === '/error') {
      //   next()
      // } else {
      //   next('/error')
      // }
    }
  }
})


export default router