<template>
  <section class="page person-page">
    <div class="page-hd">
      <router-link :to='hasLogin ? "/personal" : "/login"' class="hd-set"><van-icon name='setting'></van-icon></router-link>
      <van-row class="hd-content" type='flex' justify='center' align='center'>
        <router-link :to='hasLogin ? "/personal" : "/login"'>
          <img :src="getImgURL(userInfo.avatar)" alt="" class="img-face" v-if='userInfo.avatar'>
          <img src="../../assets/img/person/user-default.jpeg" alt="" class="img-face" v-else>
          <van-row class="hd-b">{{ userInfo.username || '登 录' }}</van-row>
        </router-link>
      </van-row>
    </div>

    <van-row class="page-bd" type='flex' justify='center'>
      <van-tabbar-item :icon="item.icon" :to='item.link' v-for='item in bds' :key='item.link'>{{ item.title }}</van-tabbar-item>
    </van-row>

    <div class="page-ft">
      <van-cell :title="item.title" :icon="item.icon" is-link v-for='item in fts' :key='item.link' />
    </div>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Person',
  data() {
    return {
      bds: [
        { title: '待付款', icon: 'pending-payment', link: '/order' },
        { title: '待收货', icon: 'pending-deliver', link: '/order' },
        { title: '已完成', icon: 'sign', link: '/order' },
      ],
      fts: [
        { title: '我的订单', icon: 'pending-orders', link: '/order' },
        { title: '我的收藏', icon: 'like-o', link: '/order' },
        { title: '软件信息', icon: 'points', link: '/order' },
      ],
    };
  },

  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin,
      userInfo: state => state.userInfo,
    }),
  },

  created() {
    if(window.localStorage.getItem('token')) {
      this.getUserInfo();
    }
  },

  methods: {},

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.person-page {
  .page-hd {
    position: relative;
    background-color: #fff;
    .hd-set {
      position: absolute;
      z-index: 1;
      top: .1rem;
      right: .15rem;
      i {
        font-size: .3rem;
        // color: @blue;
        opacity: .3;
      }
    }
    .hd-content {
      position: relative;
      flex-direction: column;
      height: 2rem;
      background: url('../../assets/img/person/person-bg-3.jpeg') center/cover no-repeat;
      border-radius: 0 0 15% 15%;
    }
    .hd-b {
      position: absolute;
      bottom: .2rem;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: .16rem;
      font-weight: bold;
      color: #fff;
    }
  }

  .page-bd {
    background-color: #fff;
    padding: .1rem .4rem;
    margin-bottom: .3rem;
    .van-tabbar-item__icon {
      font-size: .24rem;
    }
    .van-tabbar-item__text {
      font-size: .13rem;
    }
  }















}
</style>