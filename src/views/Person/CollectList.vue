<template>
  <section class="page collect-list-page">
    <van-list v-model="loading" :finished="finished" @load="getCollectList" class='page-bd collect-list' :immediate-check='false'>
      <van-card :title="item.title" desc="" :num="item.num" :price="format(item.price)" v-for='(item, index) in collectList' class='collect-card'>
        <!-- thumb -->
        <router-link slot='thumb' class="card-hd" :to="'/goodsDetail?id=' + item.id">
          <img :src="getImgURL(item.thumb)" alt="">
        </router-link>
        <!-- 收藏 -->
        <div slot="footer" class="card-ft">
          <span class="van-hairline card-ft-btn van-goods-action-mini-btn" @click='onCancelCollect(item.id, index)' v-if='item.isCollected'>
            <i class="van-icon van-icon-like van-goods-action-mini-btn__icon"></i>取消
          </span>
          <span class="van-hairline card-ft-btn van-goods-action-mini-btn" @click='onCollect(item.id, index)' v-else>
            <i class="van-icon van-icon-like-o van-goods-action-mini-btn__icon"></i>收藏
          </span>
        </div>
      </van-card>

      <div class="van-list__loading" v-if='finished'><span class="van-list__loading-text">全部加载完成啦~</span></div>
    </van-list>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'CollectList',
  data() {
    return {
      collectList: [], // 产品列表
      loading: false,
      finished: false,
      page: 1,
      prePage: 10,
    };
  },

  created() {
    this.getCollectList();
  },

  methods: {
    // 收藏
    onCollect(id, index) {
      this.collect(id)
      .then(res => {
        if (res.code === '00') {
          this.$set(this.collectList[index], 'isCollected', 1);
        }
      })
    },

    // 取消收藏
    onCancelCollect(id, index) {
      this.cancelCollect(id)
      .then(res => {
        if (res.code === '00') {
          this.$set(this.collectList[index], 'isCollected', 0);
        }
      })
    },

    // 获取收藏列表
    getCollectList() {
      this.loading = true;
      this.$api.getCollectList({
        page: this.page,
        prePage: this.prePage
      }).then(res => {
        if (res.code === '00') {
          this.collectList = this.collectList.concat(res.data);

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
    }
  },

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.collect-list-page {
  .collect-list {
    .van-cell__value {
      color: @pink;
    }
  }
  .collect-card {
    display: block;
    margin-bottom: .2rem;
    .van-card__price {
      color: @pink;
    }
    .card-ft-btn {
      color: @pink;
      &::after {
        border: none;
      }
    }
  }
}
</style>