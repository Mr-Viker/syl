<template>
  <section class="page goods-detail-page">
    <div class="page-hd">
      <van-swipe :autoplay="3000" :duration='3000' class='hd-t' v-if='detail'>
        <van-swipe-item v-for="item in detail.imgs" :key="item">
          <img v-lazy="getImgURL(item)" class="img-b" />
        </van-swipe-item>
      </van-swipe>
      <div class="hd-m">
        <p class="hd-m-t">{{ detail.title }}</p>
        <p class="hd-m-b"><van-icon name="gold-coin"></van-icon>{{ format(detail.price) }}</p>
      </div>
      <div class="hd-b">
        <span class="hd-b-l">运费: {{ format(detail.freight) }}</span>
        <span class="hd-b-c">已售{{ detail.sold }}</span>
        <span class="hd-b-r">剩余{{ detail.amount }}</span>
      </div>
    </div>

    <div class="page-bd">
      <van-tabs v-model="active" :swipeable='true' sticky>
        <van-tab title="商品介绍" v-html='detail.desc'></van-tab>
        <!-- <van-tab title="参 数"></van-tab> -->
      </van-tabs>
    </div>

    <van-goods-action class='page-ft-fixed'>
      <van-goods-action-mini-btn icon="shop" text="首页" to='/' />
      <van-goods-action-mini-btn class='ft-c' icon="like" text="取消" @click='onCancelCollect' v-if='detail.isCollected'/>
      <van-goods-action-mini-btn class='ft-c' icon="like-o" text="收藏" @click='onCollect' v-else/>
      <!-- <van-goods-action-mini-btn icon="cart" text="购物车" info="5" /> -->
      <!-- <van-goods-action-big-btn text="加入购物车" /> -->
      <van-goods-action-big-btn text="立即购买" primary @click='showSkuPopup = !showSkuPopup'/>
    </van-goods-action>

    <sku-popup :data='detail' :show='showSkuPopup'></sku-popup>
  </section>
</template>


<script>
import SkuPopup from '@/components/SkuPopup';

export default {
  name: 'GoodsDetail',
  components: { SkuPopup },
  data() {
    return {
      id: this.$route.query.id,
      detail: {},
      active: 0,
      showSkuPopup: false,
    };
  },

  created() {
    if (this.id) {
      this.getGoodsDetail();
    } else {
      this.$toast('缺少商品ID');
      this.$router.back();
    }
  },

  methods: {
    // 收藏
    onCollect() {
      this.collect(this.id)
      .then(res => {
        if (res.code === '00') {
          this.$set(this.detail, 'isCollected', 1);
        }
      })
    },

    // 取消收藏
    onCancelCollect() {
      this.cancelCollect(this.id)
      .then(res => {
        if (res.code === '00') {
          this.$set(this.detail, 'isCollected', 0);
        }
      })
    },

    getGoodsDetail() {
      this.$api.getGoodsDetail({id: this.id})
      .then(res => {
        if (res.code === '00') {
          this.detail = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    }
  },
} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.goods-detail-page {
  .page-hd {
    background-color: #fff;
    margin-bottom: .3rem;
    border-bottom: 1px solid @border-c;
    .hd-t {
      height: 2.5rem;
    }
    .hd-m {
      padding: 0 .1rem;
    }
    .hd-m-t {
      font-size: .14rem;
    }
    .hd-m-b {
      color: @danger;
      i {
        vertical-align: top;
        margin-right: .03rem;
      }
    }
    .hd-b {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid @border-c;
      color: @gray;
      padding: .1rem;
    }
  }

  .page-bd {
    background-color: #fff;
    .van-tabs__content {
      width: 100%;
      min-height: 90vh;
      padding: .15rem .1rem;
      overflow-x: hidden;
      box-sizing: border-box;
      img {
        max-width: 100%;
        height: auto !important;
      }
    }
  }

  .page-ft-fixed {
    z-index: 100;
    .ft-c {
      color: @pink
    }
  }








}
</style>