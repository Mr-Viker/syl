<template>
  <section class="page order-submit-page">
    <div class="page-hd">
      <!-- 没有收货地址时显示 -->
      <van-contact-card type="add" @click="" v-if='!selectedAddress' @click='gotoAddressList' />

      <!-- 有收货地址时显示 -->
      <div class="contact-card van-contact-card van-contact-card--edit" v-else @click='gotoAddressList'>
        <div class="van-contact-card__content">
          <i class="van-icon van-icon-contact van-contact-card__icon"></i>
          <div class="card-c van-contact-card__text">
            <div class="card-c-t"><span class="card-c-t-l">{{ selectedAddress.realname }}</span><span>{{ selectedAddress.phone }}</span></div>
            <div class="card-c-b">{{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.county }}{{ selectedAddress.area }}</div>
          </div>
        </div>
        <i class="van-icon van-icon-arrow van-contact-card__arrow"></i>
      </div>
    </div>

    <router-link :to="'/goodsDetail?id=' + form.goodsId" class='page-bd'>
      <van-card :title="form.goods.title" desc="默认" :num="form.num" :price="format(form.price)" :thumb="form.goods.picture"/>
    </router-link>

    <van-submit-bar class='page-ft' :price="format(total * 100)" button-text="提交订单" @submit="onSubmit" />
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'OrderSubmit',
  data() {
    return {
      form: {}, //下单表单
      selectedAddress: '', //选择的地址
    };
  },


  computed: {
    total() {
      return this.format(this.form.price * this.form.num);
    }
  },

  created() {
    // 如果有cart信息，则表明已选择了商品 cart是选择的sku等信息
    var cart = window.sessionStorage.getItem('cart');
    if (cart) {
      this.form = JSON.parse(cart);
    } else {
      this.$toast('还没选择商品购买哦~');
      return this.$router.back();
    }
    // 如果url中有addressId 则表示是从管理地址页回来的 需要更新选中地址 否则需要获取地址列表来显示
    if (this.$route.query.addressId) {
      this.getSelectedAddress();
    } else {
      this.getAddressList()
    }

  },

  methods: {
    // 下单
    onSubmit() {
      this.form.addressId = this.selectedAddress.id;
      if (this.validate(this.form)) {
        this.$api.submitOrder(this.form)
        .then(res => {
          if (res.code === '00') {
            // 提交成功后带着订单ID去支付页
            this.$router.push({name: 'Pay', query: {id: res.data.id, total: this.total}});
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    // 获取在地址列表页选中的地址
    getSelectedAddress() {
      this.$api.getAddressDetail({id: this.$route.query.addressId})
      .then(res => {
        if (res.code === '00') {
          this.selectedAddress = res.data;
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 前往地址列表页
    gotoAddressList() {
      // console.log(this.$route);
      this.$router.push({name: 'AddressList', query: {redirect: this.$route.name}});
    },

    // 获取收货地址列表
    getAddressList() {
      this.$api.getAddressList()
      .then(res => {
        if (res.code === '00') {
          if (res.data.length > 0) {
            var addressList = res.data;
            // 获取默认地址 没有则显示第一个
            var address = addressList[0];
            for (var i = addressList.length - 1; i >= 0; i--) {
              if (addressList[i]['is_default']) {
                address = addressList[i];
              }
            }
            this.selectedAddress = address;
          }
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

.order-submit-page {
  .contact-card {
    .card-c {
      font-size: .12rem;
    }
    .card-c-t-l {
      margin-right: .1rem;
    }
  }

  .page-bd {
    display: block;
    margin-top: .5rem;
    background-color: #fff;
    .van-card__price {
      color: @pink;
    }
  }
}
</style>