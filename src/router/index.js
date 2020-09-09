import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('@/views/Home')
const Login = () => import('@/views/login/login')
const staffManage = () => import('@/views/adminManage/staffManage')
// 组织管理
const department = () => import('@/views/organization/department')
const position = () => import('@/views/organization/position')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 员工管理
  {
    path: '/staffManage',
    component: Home,
    redirect:'/staffManage',
    children:[
      {
        path:'/staffManage',
        name:'staffManage',
        component:staffManage
      }
    ]
  },
  // 组织管理
  {
    path:'/organization',
    name:'organization',
    redirect:'/organization/department',
    component:Home,
    children:[
      {
        path:'/department',
        name:'department',
        component:department
      },
      {
        path:'/position',
        name:'position',
        component:position
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
