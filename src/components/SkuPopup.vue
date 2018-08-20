<template>
  <van-sku
    class='sku-popup'
    v-model="myShow"
    stepper-title="请选择"
    :sku="sku"
    :goods="goods"
    :goods-id="data.id"
    :hide-stock="false"
    :quota="0"
    :quota-used="0"
    :show-add-cart-btn='false'
    :close-on-click-overlay='true'
    :custom-stepper-config="customStepperConfig"
    @buy-clicked="onBuyClicked"
  >
    <!-- 自定义 sku-header-price -->
    <!-- <template slot="sku-header-price" slot-scope="props">
      <div class="van-sku__goods-price">
        <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ props.price }}</span>
      </div>
    </template> -->
    <!-- 自定义 sku actions -->
    <!-- <template slot="sku-actions" slot-scope="props">
      <div class="van-sku-actions">
        <van-button bottom-action @click="onPointClicked">积分兑换</van-button>
        <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">买买买</van-button>
      </div>
    </template> -->
  </van-sku>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: '',
  props: [ 'data', 'show' ],
  data() {
    return {
      form: {
        goodsId: '',
        price: '',
        num: '',
        msg: '',
      },
      myShow: false,
      // 步进器配置
      customStepperConfig: {
        // 自定义限购文案
        // quotaText: '每次限购xxx件',
        // 自定义步进器超过限制时的回调
        handleOverLimit: (data) => {
          const { action, limitType, quota, quotaUsed } = data;
          if (action === 'minus') {
            this.$toast('至少选择一件商品');
          } else if (action === 'plus') {
            this.$toast('不够再多了~~');
          }
        }
      }
    };
  },

  computed: {
    ...mapState({

    }),
    // 商品默认显示
    goods() {
      return {
        title: this.data.title,
        picture: this.getImgURL(this.data.thumb),
      };
    },
    // sku
    sku() {
      return {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          // {
          //   k: '颜色', // skuKeyName：规格类目名称
          //   v: [
          //     {
          //       id: '30349', // skuValueId：规格值 id
          //       name: '红色', // skuValueName：规格值名称
          //       imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
          //     },
          //     {
          //       id: '1215',
          //       name: '蓝色',
          //       imgUrl: 'https://img.yzcdn.cn/2.jpg'
          //     }
          //   ],
          //   k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          // }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          // {
          //   id: 2259, // skuId，下单时后端需要
          //   price: 100, // 价格（单位分）
          //   s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
          //   s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
          //   s3: '0', // 最多包含3个规格值，为0表示不存在该规格
          //   stock_num: 110 // 当前 sku 组合对应的库存
          // }
        ],
        price: this.data.price, // 默认价格（单位元）
        stock_num: this.data.amount, // 商品总库存
        collection_id: this.data.id, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: true, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '0' // 是否必填 '1' 表示必填
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      };
    },
  },


  watch: {
    show(newVal, oldVal) {
      this.myShow = true;
    }
  },

  created() {},

  methods: {

    // 下单
    onBuyClicked(data) {
      // console.log(data);
      this.form.goodsId = data.goodsId;
      this.form.price = parseFloat(data.selectedSkuComb.price / 100);
      this.form.num = data.selectedNum;
      this.form.msg = data.messages.message_0;
      this.form.goods = this.goods;
      window.sessionStorage.setItem('cart', JSON.stringify(this.form));
      this.$router.push({name: 'OrderSubmit'});
    }
  },

} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.sku-popup {
  
}
</style>