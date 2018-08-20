import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home/Home'

import GoodsList from '@/views/Goods/GoodsList'
const GoodsDetail = () => import('@/views/Goods/GoodsDetail')

const OrderSubmit = () => import('@/views/Order/OrderSubmit')
const OrderList = () => import('@/views/Order/OrderList')

const Pay = () => import('@/views/Pay/Pay')
const PayResult = () => import('@/views/Pay/PayResult')


const AddressList = () => import('@/views/Address/AddressList')
const Address = () => import('@/views/Address/Address')

import Person from '@/views/Person/Person'
const Register = () => import('@/views/Person/Register')
const Login = () => import('@/views/Person/Login')
const Personal = () => import('@/views/Person/Personal')
const ChangePassword = () => import('@/views/Person/ChangePassword')
const ForgetPassword = () => import('@/views/Person/ForgetPassword')
const CollectList = () => import('@/views/Person/CollectList')


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
      path: '/goodsList',
      name: 'GoodsList',
      component: GoodsList,
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
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        title: '修改密码',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },
    {
      path: '/goodsDetail',
      name: 'GoodsDetail',
      component: GoodsDetail,
      meta: {
        title: '商品详情',
        showTab: false,
        showHd: true,
      }
    },
    {
      path: '/orderSubmit',
      name: 'OrderSubmit',
      component: OrderSubmit,
      meta: {
        title: '确认订单',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },
    {
      path: '/addressList',
      name: 'AddressList',
      component: AddressList,
      meta: {
        title: '管理地址',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: {
        title: '编辑地址',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '我的订单',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },
    {
      path: '/collectList',
      name: 'CollectList',
      component: CollectList,
      meta: {
        title: '我的收藏',
        showTab: false,
        showHd: true,
        requireAuth: true,
      }
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: {
        title: '忘记密码',
        showTab: false,
        showHd: true,
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: {
        title: '支 付',
        showTab: false,
        showHd: true,
        requireAuth: true,

      }
    },
    {
      path: '/payResult',
      name: 'PayResult',
      component: PayResult,
      meta: {
        title: '支付结果',
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
