import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('@/views/home/Home')
const Welcome = () => import('@/views/home/Welcome')
// 员工管理
const staffManage = () => import('@/views/staffManage/staffManage')
const staffAdd = () => import('@/views/staffManage/staffAdd')
const staffMsg = () => import('@/views/staffManage/staffMsg')
// 组织管理
const department = () => import('@/views/organization/department')
const position = () => import('@/views/organization/position')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      }
    ]
  },
  // 员工管理
  {
    path: '/staffManage',
    component: Home,
    redirect: '/staffManage',
    children: [
      {
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
  // 组织管理
  {
    path: '/organization',
    name: 'organization',
    redirect: '/organization/department',
    component: Home,
    children: [
      {
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {

//   const token = window.sessionStorage.getItem("token")
//   const expiresTime = window.sessionStorage.getItem("expiresTime")
//   next()
  // if (token && expiresTime) {
  //   if (to.name === 'login') {
  //     return next('/welcome')
  //   } else {
  //     return next()
  //   }
  // } 
  // else if (!token || !expiresTime) {
  //   return next()
    // if (to.name === 'login') {
    //   window.sessionStorage.clear()
    //   return next()
    // } else {
    //   window.sessionStorage.clear()
    //   return next('/login')
    // }
  // }
// })

export default router
