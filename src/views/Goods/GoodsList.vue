<template>
  <section class="page goods-list-page">
    <van-tabs v-model="active" :swipeable='true' sticky>
      <van-tab v-for="(item, index) in cates" :title="item.name" :key='item.id'>
        <van-list v-model="loading" :finished="finished" @load="getGoodsList" v-if='active == index' class='page-bd goods-list' :immediate-check='false'>
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
      </van-tab>
    </van-tabs>

  </section>
</template>


<script>

export default {
  name: 'goodsList',
  data() {
    return {
      active: 0,
      cates: [], //分类列表
      activeCateId: '', //选中的分类ID
      goodsList: [], // 产品列表
      loading: false,
      finished: false,
      page: 1,
      prePage: 10,
    };
  },

  watch: {
    // 如果有切换则更新id并获取列表
    active(newVal, oldVal) {
      this.activeCateId = this.cates[newVal].id;
      this.reset();
      this.getGoodsList();
    }
  },

  created() {
    this.getCate()
    .then(res => {
      // 如果是从其他页带着分类id跳转过来的 则切换到该分类tab
      if (this.$route.query.id) {
        for (var i = this.cates.length - 1; i >= 0; i--) {
          if (this.cates[i].id == this.$route.query.id) {
            this.active = i;
          }
        }
      } else {
        this.getGoodsList();
      }
    })
  },

  methods: {
    // 重置
    reset() {
      this.goodsList = [];
      this.page = 1;
      this.loading = false;
      this.finished = false;
    },

    // 获取分类列表
    getCate() {
      return this.$api.getCate()
      .then(res => {
        if (res.code === '00') {
          this.cates = res.data;
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    },

    // 获取产品列表
    getGoodsList() {
      this.loading = true;
      this.$api.getGoodsList({
        cateId: this.activeCateId,
        page: this.page,
        prePage: this.prePage
      }).then(res => {
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
    }
  },

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.goods-list-page {
  
}
</style>