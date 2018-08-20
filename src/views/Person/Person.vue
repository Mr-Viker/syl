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
      <van-tabbar class='bd-content'>
        <van-tabbar-item :icon="item.icon" :to='item.link' v-for='item in bds' :key='item.title' :info='item.info'>{{ item.title }}</van-tabbar-item>
      </van-tabbar>
    </van-row>

    <div class="page-ft">
      <template v-for='item in fts'>
        <van-cell :title="item.title" :icon="item.icon" clickable is-link v-if='item.id == 3' @click='showAppInfo' />
        <van-cell :title="item.title" :icon="item.icon" clickable is-link v-else-if='item.id == 4' @click='showQrcode' />
        <van-cell :title="item.title" :icon="item.icon" :to='item.link' clickable is-link v-else/>
      </template>
    </div>
    
  </section>
</template>


<script>
import {mapState} from 'vuex';
import { ImagePreview } from 'vant';

export default {
  name: 'Person',
  data() {
    return {
      bds: [
        { title: '待付款', icon: 'pending-payment', link: '/orderList?index=1', info: '' },
        { title: '待发货', icon: 'pending-payment', link: '/orderList?index=2', info: '' },
        { title: '待收货', icon: 'pending-deliver', link: '/orderList?index=3', info: '' },
        // { title: '已完成', icon: 'sign', link: '/orderList?index=4' },
      ],
      fts: [
        { id: 1, title: '我的订单', icon: 'pending-orders', link: '/orderList' },
        { id: 2, title: '我的收藏', icon: 'like-o', link: '/collectList' },
        { id: 3, title: '软件信息', icon: 'info-o', link: '' },
        { id: 4, title: '联系客服', icon: 'chat', link: '' },
      ],
    };
  },

  computed: {
    ...mapState({
      hasLogin: state => state.hasLogin,
      userInfo: state => state.userInfo,
      config: state => state.config,
    }),
  },

  watch: {
    userInfo(newVal, oldVal) {
      newVal.waitPay > 0 ? this.$set(this.bds[0], 'info', newVal.waitPay) : '';
      newVal.waitSend > 0 ? this.$set(this.bds[1], 'info', newVal.waitSend) : '';
      newVal.waitConfirm > 0 ? this.$set(this.bds[2], 'info', newVal.waitConfirm) : '';
    },
  },

  created() {
    if(window.localStorage.getItem('token')) {
      this.getUserInfo();
    }
  },

  methods: {
    // qrcode弹框
    showQrcode() {
      ImagePreview([this.getImgURL(this.config.qrcode)]);
    },

    // 软件信息
    showAppInfo() {
      this.$dialog.alert({
        title: '随性的森屿鹿小店',
        message: '<div>一个非盈利非营业性的App</div><div>如果能让您片刻得到放松欢愉</div><div>那是我的荣幸</div><div>感谢</div>',
        closeOnClickOverlay: true,
        className: 'info-dialog',
      });
    },
  },

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
    .bd-content {
      position: relative;
      &::after{
        border: none;
      }
    }
    .van-tabbar-item__icon {
      font-size: .24rem;
    }
    .van-tabbar-item__text {
      font-size: .13rem;
    }
  }

}
</style>