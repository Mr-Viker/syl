<template>
  <section class="page home-page">
    <van-swipe :autoplay="3000" :duration='3000' class='page-hd'>
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" class="img-b" />
      </van-swipe-item>
    </van-swipe>

    <div class="page-bd">
      <van-row class="bd-t" type='flex' justify='center' align='center'>
        <router-link :to='item.link' v-for='item in types' :key='item.title' class='bd-t-item'>
          <img :src="item.src" alt="" class="img-face">
          <van-row class="bd-t-item-title">{{ item.title }}</van-row>
        </router-link>
      </van-row>

      <van-row class="bd-b">
        <router-link class="bd-b-item" :to='item.link' v-for='item in bigPics' :key='item.link'>
          <img :src="item.src" alt="" class='img-w'>
        </router-link>
      </van-row>
    </div>

    <div class="page-ft">
      <van-row class='ft-title text-c'>
        <van-col class="ft-title-text" offset='3' span='18'><span>随机推荐</span></van-col>
      </van-row>
      <van-list v-model="loading" :finished="finished" @load="getGoodsList" class='ft-content goods-list'>
        <!-- <van-cell v-for="item in goodsList" :key="item" :title="item + ''" /> -->
        <div class="goods-card">
          <div class="card-hd"><img src="../../assets/img/person/user-default-1.jpeg" alt="" class="card-thumb"></div>
          <div class="card-bd van-ellipsis">我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题</div>
        </div>
        <div class="goods-card">
          <div class="card-hd"><img src="../../assets/img/person/user-default-2.jpeg" alt="" class="card-thumb"></div>
          <div class="card-bd van-ellipsis">我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题</div>
        </div>
        <div class="goods-card">
          <div class="card-hd"><img src="../../assets/img/person/user-default-2.jpeg" alt="" class="card-thumb"></div>
          <div class="card-bd van-ellipsis">我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题</div>
        </div>
      </van-list>
    </div>

  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      // 轮播
      images: [
        // require('@/assets/img/carouse/carouse-1.jpg'),
        require('@/assets/img/carouse/carouse-6.jpg'),
        // require('@/assets/img/carouse/carouse-7.jpg'),
        // require('@/assets/img/carouse/carouse-8.jpg'),
        require('@/assets/img/carouse/carouse-9.jpg'),
      ],
      // 分类导航
      types: [
        {title: '艺术', src: require('@/assets/img/type/type-3.jpeg'), link: '/type?id=1'},
        {title: '人文', src: require('@/assets/img/type/type-6.jpeg'), link: '/type?id=2'},
        {title: '风光', src: require('@/assets/img/type/type-7.png'), link: '/type?id=1'},
        {title: '全部', src: require('@/assets/img/type/type-5.jpeg'), link: '/type'},
      ],
      // 大图
      bigPics: [
        {src: require('@/assets/img/carouse/carouse-1.jpg'), link: '/goos_detail?id=1'},
        {src: require('@/assets/img/carouse/carouse-2.jpg'), link: '/goos_detail?id=1'},
        {src: require('@/assets/img/carouse/carouse-3.jpg'), link: '/goos_detail?id=1'},
        {src: require('@/assets/img/carouse/carouse-4.jpg'), link: '/goos_detail?id=1'},
        {src: require('@/assets/img/carouse/carouse-5.jpg'), link: '/goos_detail?id=1'},
      ],
      loading: false,
      finished: false,
      goodsList: [],
    };
  },

  created() {},

  methods: {
    getGoodsList() {
      // this.loading = true;
    }
  },

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.home-page {
  .page-hd {
    height: 2rem;
  }

  .page-bd {
    padding: .15rem 0;

    .bd-t {
      // background-color: #fff;
      padding-bottom: .3rem;
      .bd-t-item {
        flex: 1;
        text-align: center;
      }
      .img-face {
        width: .6rem;
        height: .6rem;
      }
      .bd-t-item-title {
        font-size: .13rem;
        color: @blue
      }
    }

    .bd-b {
      .bd-b-item {
        display: block;
        padding: .1rem .1rem 0;
      }
      img {
        border-radius: .2rem;
      }
    }
  }

  .page-ft {
    padding-top: .2rem;
    .ft-title-text {
      border-bottom: 1px solid @border-c;
      span {
        position: relative;
        z-index: 1;
        top: .08rem;
        padding: 0 .1rem;
        background-color: #fff;
      }
    }

    .ft-content {
      // padding-top: .2rem;
    }
  }



















}
</style>
