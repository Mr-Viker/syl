<template>
  <section class="pay-result-page page text-c">
    <div class="page-bd">
      <div class="green-deep flex-v success-container" v-if='success'>
        <p class="flex-item">
          <van-icon class="icon-success" name='certificate'></van-icon>
        </p>
        <span class="flex-item">支付成功</span>
        <div class="btn-area">
          <!-- <mt-button class="btn-confirm" type='primary' size='large' @click.native='goto({name: "Person"})'>确定</mt-button> -->
          <!-- <van-button type="primary" tag='a' :block='true' class='btn-submit' to='/person'>确 定</van-button> -->
          <router-link class="btn-submit van-button van-button--primary van-button--normal van-button--block" to='/orderList?index=2'>确 定</router-link>
        </div>
      </div>

      <div v-else>
        <p class="text-deal">正在处理支付中</p>
        <dynamic-points></dynamic-points>
        <div class="btn-area">
          <router-link :class="['btn-jump btn-submit van-button van-button--primary van-button--normal van-button--block', {dynamic: showJump}]" to='/orderList?index=2'>等待太久？跳过等待</router-link>
        </div>
      </div>

      <a :href="'tel:' + (config.tel || '13250767640')" class="tips-link">支付遇到问题？请联系客服</a>
    </div>
  </section>
</template>


<script>
import DynamicPoints from '@/components/DynamicPoints';
import {mapState} from 'vuex';

export default {
  name: 'PayResult',
  components: { DynamicPoints },
  data() {
    return {
      success: false,
      timer: null,
      count: 0,
      showJump: false,
    }
  },
  computed: {
    ...mapState({
      config: state => state.config,
    }),
    id() {
      return this.$route.query.orderNo;
    },
  },

  created() {
    if (this.id) {
      this.checkOrder();
    }
  },

  methods: {
    checkOrder() {
      this.$api.checkOrder({id: this.id})
      .then(res => {
        if (res.code === '00') {
          this.success = true;
          clearTimeout(this.timer);
          return;
        }
        if (this.count > 2) {
          this.showJump = true;
        }
        this.count++;
        this.timer = setTimeout(() => {
          this.checkOrder();
        }, 1000);
      })
    }
  },

  beforeRouteLeave (to, from, next) {
    clearTimeout(this.timer);
    next();
  }
}
</script>


<style lang='less'>
@import '../../assets/css/_variable.less';

.pay-result-page {
  position: relative;
  background-color: #fff;
  .page-hd {
    height: .4rem;
    line-height: .4rem;
    font-size: .14rem;
    background-color: #fff;
    border-bottom: 1px solid @border-c;
  }
  .page-bd {
    padding-top: .5rem;
    font-size: .2rem;
    background-color: #fff;
  }
  .success-container {
    .flex-item {
      margin-bottom: .2rem;
    }
    .icon-success {
      font-size: .8rem;
      color: @primary;
    }
    .bd-tips {
      font-size: .14rem;
    }
  }
  .btn-area {
    padding: .5rem .3rem 0;
  }
  .btn-jump {
    position: relative;
    font-size: .14rem;
    opacity: 0;
    transform: scale(0);
    transition: all .7s;
    &.dynamic {
      opacity: 1;
      transform: scale(1);
    }
  }

  .text-deal {
    margin: .5rem 0;
    font-size: .16rem;
  }
  .tips-link {
    display: block;
    padding: .5rem 0;
    width: 100%;
    text-align: center;
    font-size: .12rem;
    color: @blue;
    text-decoration: underline;
  }
}
</style>