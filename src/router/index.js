import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('@/views/home/Home')
const Welcome = () => import('@/views/home/Welcome')
const error = () => import('@/components/error')
// 员工管理
const staffManage = () => import('@/views/staffManage/staffManage')
const staffAdd = () => import('@/views/staffManage/staffAdd')
const staffMsg = () => import('@/views/staffManage/staffMsg')
// 组织管理
const department = () => import('@/views/organization/department')
const position = () => import('@/views/organization/position')
// 管理员管理
const admins = () => import('@/views/administrator/admins')
const roles = () => import('@/views/administrator/roles')
// 对账单
const income = () => import('@/views/finance/income')
const receivable = () => import('@/views/finance/receivable')
const depReceivable = () => import('@/views/finance/depRec')
// 回款单
const backPayment = () => import('@/views/backPayMent/index')
const payAdd = () => import('@/views/backPayMent/add')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      name: 'welcome',
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
    component: Home,
    redirect: '/staffManage',
    children: [{
        path: '/staffManage',
        name: 'staffManage',
        component: staffManage
      },
      {
        path: '/staffAdd',
        name: 'staffAdd',
        component: staffAdd
      },
      {
        path: '/staffMsg',
        name: 'staffMsg',
        component: staffMsg
      }
    ]
  },
  // 管理员管理
  {
    path: '/administrator',
    name: 'administrator',
    redirect: '/admins',
    component: Home,
    children: [{
        path: '/admins',
        name: 'admins',
        component: admins
      },
      {
        path: '/roles',
        name: 'roles',
        component: roles
      }
    ]
  },
  // 组织管理
  {
    path: '/organization',
    name: 'organization',
    redirect: '/department',
    component: Home,
    children: [{
        path: '/department',
        name: 'department',
        component: department
      },
      {
        path: '/position',
        name: 'position',
        component: position
      }
    ]
  },
  // 收入费用
  {
    path: '/finance',
    component: Home,
    redirect: '/finance/income',
    children: [
      {
        path: 'income',
        name: 'income',
        component: income
      },
      {
        path: 'receivable',
        name: 'receivable',
        component: receivable
      },
      {
        path: 'depReceivable',
        name: 'depReceivable',
        component: depReceivable
      },
    ]
  },
  // 回款单
  {
    path: '/backPayment',
    component: Home,
    redirect: '/backPayment/index',
    children: [{
        path: 'index',
        name: 'backPayment',
        component: backPayment
      },
      {
        path: 'payAdd',
        name: 'payAdd',
        component: payAdd
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

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("token")
  if (token) {
    next()
  } else {
    if (window.location.href.includes('code')) {
      // let id = window.location.href.split('code')[1].split('&')[0].split('=')[1]
      // let params = {
      //   code: id
      // }
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
          sessionStorage.setItem('token', token)
          next({
            path: to.path,
            query: allParams
          })
        } else {
          console.log(res.error)
        }
      })
    } else {
      window.sessionStorage.clear()
      // 通过判断path防止出现死循环
      if (to.path === '/error') {
        next()
      } else {
        next('/error')
      }
    }
  }
})


export default router