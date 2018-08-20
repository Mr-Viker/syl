<template>
  <section class="page home-page">
    <van-swipe :autoplay="3000" :duration='3000' class='page-hd'>
      <van-swipe-item v-for="item in banners" :key="item.id">
        <img v-lazy="getImgURL(item.img)" class="img-b" />
      </van-swipe-item>
    </van-swipe>

    <div class="page-bd">
      <van-row class="bd-t" type='flex' justify='center' align='center'>
        <router-link :to="'/goodsList?id=' + item.id" v-for='(item, index) in cates' :key='item.id' class='bd-t-item'>
          <img :src="getImgURL(item.icon)" alt="" class="img-face">
          <van-row :class="['bd-t-item-title', 'bd-t-item-title-' + index]">{{ item.name }}</van-row>
        </router-link>
      </van-row>

      <van-row class="bd-b">
        <router-link class="bd-b-item" :to='item.link' v-for='item in bigPics' :key='item.id'>
          <img :src="getImgURL(item.img)" alt="" class='img-w'>
        </router-link>
      </van-row>
    </div>

    <div class="page-ft">
      <van-row class='ft-title text-c'>
        <van-col class="ft-title-text" offset='3' span='18'><span>随机推荐</span></van-col>
      </van-row>

      <van-list v-model="loading" :finished="finished" @load="getGoodsList" class='ft-content goods-list'>
        <router-link :to="'/goodsDetail?id=' + item.id" class="goods-card" v-for='item in goodsList' :key='item.id'>
          <div class="card-hd"><img :src="getImgURL(item.thumb)" alt="" class="card-thumb"></div>
          <div class="card-bd">{{ item.title }}</div>
          <div class="card-ft">
            <span class="card-ft-l"><van-icon name="gold-coin"></van-icon><span>{{ format(item.price) }}</span></span>
            <span class="card-ft-r">已售{{ item.sold }}</span>
          </div>
        </router-link>

        <div class="van-list__loading" v-if='finished'><span class="van-list__loading-text">全部加载完成啦~</span></div>
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
      banners: [], // 轮播图列表
      cates: [], // 分类列表
      bigPics: [], //大图专区列表
      goodsList: [], // 产品列表
      loading: false,
      finished: false,
      page: 1,
      prePage: 10,
    };
  },

  created() {
    this.getBanner();
    this.getCate();
    this.getBigPic();
  },

  methods: {
    getGoodsList() {
      this.loading = true;
      this.$api.getGoodsList({page: this.page, prePage: this.prePage})
      .then(res => {
        if (res.code === '00') {
          this.goodsList = this.goodsList.concat(res.data);

          if (this.page >= res.lastPage) {
            this.finished = true;
          }
          this.page++
          this.loading = false;
        } else {
          this.$toast(res.msg);
          this.loading = false;
        }
      })
    },

    // 获取banner
    getBanner() {
      this.$api.getBanner()
      .then(res => {
        if (res.code === '00') {
          this.banners = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 获取大图专区
    getBigPic() {
      this.$api.getBigPic()
      .then(res => {
        if (res.code === '00') {
          this.bigPics = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 获取分类列表
    getCate() {
      this.$api.getCate()
      .then(res => {
        if (res.code === '00') {
          this.cates = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    },

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
      padding-bottom: .2rem;
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
      }
      .bd-t-item-title-0 {
        color: @blue;
      }
      .bd-t-item-title-1 {
        color: @pink;
      }
      .bd-t-item-title-2 {
        color: @green;
      }
      .bd-t-item-title-3 {
        color: @purple;
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
      padding-top: .3rem;
    }
  }

}
</style>
