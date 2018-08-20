<template>
  <section class="page pay-page">
    <div class="page-hd">
      <div class="hd-t">￥{{ form.total || '0.00' }}</div>
      <div class="hd-m"><span>订单ID: </span><span>{{ form.orderId || '' }}</span></div>
    </div>

    <div class="page-bd">
      <van-radio-group v-model="form.type">
        <van-cell-group>
          <van-cell title="微信支付" icon='wechat' class='bd-cell-wechat' clickable @click="form.type = 'wechat'">
            <van-radio name="wechat" />
          </van-cell>
          <van-cell title="支付宝" icon='alipay' class='bd-cell-alipay' clickable @click="form.type = 'alipay'">
            <van-radio name="alipay" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>

    <div class="page-ft">
      <div class="btn-submit-container">
        <van-button type="primary" :block='true' class='btn-submit' @click='pay' :loading='disabledSubmit'>确认支付</van-button>
      </div>
    </div>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Pay',
  data() {
    return {
      form: {
        orderId: '', //订单ID
        type: 'wechat', //支付类型
        total: '', //总价 只是用来前端显示
      },
      disabledSubmit: false,
    };
  },

  computed: {
    ...mapState({

    }),
  },

  watch: {},

  created() {
    this.form.orderId = this.$route.query.id;
    this.form.total = this.$route.query.total;
  },

  methods: {
    pay() {
      if (this.validate(this.form)) {
        this.disabledSubmit = true;
        this.$api.pay(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '支付成功', duration: 1500});
            setTimeout(() => {
              this.$router.push({name: 'PayResult', query: {orderNo: res.data.orderId}});
            }, 1500);
          } else {
            this.$toast(res.msg);
            this.disabledSubmit = false;
          }
        })
      }
    }
  },
} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.pay-page {
  .page-hd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: .2rem .1rem;
    border-bottom: 1px solid @border-c;
    background-color: #fff;
    .hd-t {
      font-size: .3rem;
      color: @danger;
    }
    .hd-m {
      // display: flex;
      // justify-content: space-between;
      // width: 100%;
      margin-top: .1rem;
      color: @pink;
    }
  }
  .page-bd {
    margin: 1rem 0 .5rem;
  }
  .van-icon-wechat {
    color: @primary;
    font-size: .2rem;
  }
  .van-icon-alipay {
    font-size: .2rem;
    color: @blue;
  }
}
</style>