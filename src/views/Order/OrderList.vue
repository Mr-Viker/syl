<template>
  <section class="page order-list-page">
    <van-tabs v-model="active" :swipeable='true' sticky>
      <van-tab v-for="(item, index) in tabs" :title="item.name" :key='item.id'>

        <van-list v-model="loading" :finished="finished" @load="getOrderList" v-if='active == index' class='page-bd order-list' :immediate-check='false'>
          <div  class="order-card" v-for='(item, index) in orderList'>
            <van-panel :title="item.realname + ', ' + item.phone" :status="item.status.label">
              <router-link :to="'/goodsDetail?id=' + item.goods_id" class='card-bd'>
                <van-card :title="item.goods.title" desc="默认" :num="item.num" :price="format(item.price)" :thumb="getImgURL(item.goods.thumb)"/>
              </router-link>
              <div slot="footer" class="card-ft">
                <div class="card-ft-l">合计: <span>{{ format(item.total) }}</span></div>
                <div class="card-ft-r">
                  <van-button size="small" v-if='item.status == 0' @click='cancelOrder(item.id, index)'>取消</van-button>
                  <van-button size="small" v-if='item.status == 0' type="danger" @click='gotoPay(item.id, item.total)'>付款</van-button>
                  <van-button size="small" v-if='item.status == 1' @click='cancelOrder(item.id, index)'>退款</van-button>
                  <van-button size="small" v-if='item.status == 1' class='pink-bgc' disabled>待发货</van-button>
                  <van-button size="small" v-if='item.status == 2' type="danger" @click='confirmOrder(item.id, index)'>确认收货</van-button>
                  <van-button size="small" v-if='item.status == 3' class='green-bgc' disabled>已完成</van-button>
                  <van-button size="small" v-if='item.status == 4' disabled>已取消</van-button>
                </div>
              </div>
            </van-panel>
          </div>

          <div class="van-list__loading" v-if='finished'><span class="van-list__loading-text">全部加载完成啦~</span></div>
        </van-list>

      </van-tab>
    </van-tabs>


    
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'OrderList',
  data() {
    return {
      tabs: [ {id: '-1', name: '全部'}, {id: '0', name: '待付款'}, {id: '1', name: '待发货'}, {id: '2', name: '待收货'}, {id: '3', name: '已完成'} ],
      active: '',
      activeTabId: '', //选中的分类ID
      orderList: [], // 产品列表
      loading: false,
      finished: false,
      page: 1,
      prePage: 10,
    };
  },

  watch: {
    // 如果有切换则更新id并获取列表
    active(newVal, oldVal) {
      this.activeTabId = this.tabs[newVal].id;
      this.reset();
      this.getOrderList();
    }
  },

  created() {
    if (this.$route.query.index) {
      this.active = this.$route.query.index;
    } else {
      // this.getOrderList();
      this.active = 0;
    }
  },

  methods: {
    // 确认收货
    confirmOrder(id, index) {
      this.$api.confirmOrder({id: id})
      .then(res => {
        if (res.code === '00') {
          this.$toast({message: '确认收货成功', duration: 1500});
          this.$set(this.orderList[index], 'status', 3); // 4表示已取消
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 前往支付
    gotoPay(id, total) {
      this.$router.push({name: 'Pay', query: {id: id, total: total}});
    },

    // 取消订单
    cancelOrder(id, index) {
      this.$api.cancelOrder({id: id})
      .then(res => {
        if (res.code === '00') {
          this.$toast({message: '取消订单成功', duration: 1500});
          this.$set(this.orderList[index], 'status', 4); // 4表示已取消
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 重置
    reset() {
      this.orderList = [];
      this.page = 1;
      this.loading = false;
      this.finished = false;
    },

    // 获取订单列表
    getOrderList() {
      this.loading = true;
      this.$api.getOrderList({
        type: this.activeTabId,
        page: this.page,
        prePage: this.prePage
      }).then(res => {
        if (res.code === '00') {
          this.orderList = this.orderList.concat(res.data);

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

.order-list-page {
  .order-list {
    .van-cell__value {
      color: @pink;
    }
  }
  .order-card {
    margin-bottom: .2rem;
    .card-ft {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-ft-l {
      font-size: .14rem;
      span {
        color: @pink
      }
    }
    .card-ft-r {
      button {
        margin-left: .05rem;
      }
    }
  }
}
</style>