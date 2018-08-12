import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home/Home'

import Type from '@/views/Type/Type'

import Person from '@/views/Person/Person'
const Register = () => import('@/views/Person/Register')
const Login = () => import('@/views/Person/Login')
const Personal = () => import('@/views/Person/Personal')
const ChangePassword = () => import('@/views/Person/ChangePassword')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首 页',
        showTab: true,
        showHd: false,
      }
    },
    {
      path: '/type',
      name: 'Type',
      component: Type,
      meta: {
        title: '全部分类',
        showTab: true,
        showHd: false,
      }
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        title: '我 的',
        showTab: true,
        showHd: false,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注 册',
        showTab: false,
        showHd: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登 录',
        showTab: false,
        showHd: true,
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta: {
        title: '个人中心',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },
    {
      path: '/change_password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        title: '修改密码',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },



    // 必须放最后
    {
      path: '*',
      redirect: '/'
    },
  ]
})
