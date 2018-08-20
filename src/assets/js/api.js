/**
 * API请求
 */
import axios from '@/assets/js/http';

export default {
  // 获取系统设置
  getConfig(params) {
    return axios.post('/config', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 用户登录
  getSms(params) {
    return axios.post('/sms', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 用户注册
  register(params) {
    return axios.post('/user/register', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 用户登录
  login(params) {
    return axios.post('/user/login', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 获取用户信息
  getUserInfo(params) {
    return axios.post('/user/info', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 上传
  // upload(params) {
  //   var config = {headers: {'Content-Type': 'multipart/form-data'}};
  //   return axios.post('/upload', params, config)
  //   .then(res => res.data)
  //   .catch(err => console.log(err));
  // },

  // 登出
  logout(params) {
    return axios.post('/user/logout', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 修改用户信息
  updateUserInfo(params) {
    return axios.post('/user/update', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },


  // banner
  getBanner(params) {
    return axios.post('/index/banner', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 首页大图专区列表
  getBigPic(params) {
    return axios.post('/index/bigPic', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 产品分类列表
  getCate(params) {
    return axios.post('/cate/list', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 产品列表
  getGoodsList(params) {
    return axios.post('/goods/list', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 产品详情
  getGoodsDetail(params) {
    return axios.post('/goods/detail', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 收藏
  collect(params) {
    return axios.post('/collect/store', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 取消收藏
  cancelCollect(params) {
    return axios.post('/collect/destroy', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取地址列表
  getAddressList(params) {
    return axios.post('/address/list', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取地址详情
  getAddressDetail(params) {
    return axios.post('/address/detail', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 保存地址
  saveAddress(params) {
    return axios.post('/address/store', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 更新地址
  updateAddress(params) {
    return axios.post('/address/update', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 删除地址
  deleteAddress(params) {
    return axios.post('/address/destroy', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 提交订单
  submitOrder(params) {
    return axios.post('/order/store', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取订单列表
  getOrderList(params) {
    return axios.post('/order/list', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取收藏列表
  getCollectList(params) {
    return axios.post('/collect/list', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 获取收藏列表
  forgetPassword(params) {
    return axios.post('/user/forgetPassword', params)
    .then(res => res.data)
    .catch(err => console.log(err)); 
  },

  // 支付
  pay(params) {
    return axios.post('/pay', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 取消订单 - 待付款
  cancelOrder(params) {
    return axios.post('/order/cancel', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 检测订单状态
  checkOrder(params) {
    return axios.post('/order/check', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },

  // 确认收货
  confirmOrder(params) {
    return axios.post('/order/confirm', params)
    .then(res => res.data)
    .catch(err => console.log(err));
  },








}