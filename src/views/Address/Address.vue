<template>
  <section class="page address-page">
    <van-address-edit
      :area-list="areaList"
      :address-info='detail'
      show-postal
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
  </section>
</template>


<script>
import {mapState} from 'vuex';
import AreaList from '@/assets/js/area.js';

export default {
  name: 'Address',
  data() {
    return {
      areaList: AreaList, //省市区地地Zhi列表
      form: {}, // 地址表单
      detail: {}, //地址信息 如果是更新则会去获取该信息
    };
  },

  computed: {
    ...mapState({

    }),
  },

  watch: {},

  created() {
    if (this.$route.query.id) {
      this.getAddressDetail();
    }
  },

  methods: {
    // 获取地址详情
    getAddressDetail() {
      this.$api.getAddressDetail({id: this.$route.query.id})
      .then(res => {
        if (res.code === '00') {
          var data = res.data;
          this.detail = {
            id: data.id,
            name: data.realname,
            tel: data.phone,
            province: data.province,
            city: data.city,
            county: data.county,
            address_detail: data.area,
            area_code: data.area_code,
            postal_code: data.postcode,
            is_default: !!(data.is_default),
          };
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 保存
    onSave(data) {
      // this.form = {
      //   id: data.id,
      //   realname: data.name,
      //   phone: data.tel,
      //   province: data.province,
      //   city: data.city,
      //   county: data.county,
      //   area: data.address_detail,
      //   postcode: data.postal_code,
      //   is_default: data.is_default,
      // };
      this.form = data;
      if (data.id) {
        this.updateAddress();
      } else {
        this.saveAddress();
      }
    },

    // 保存
    saveAddress() {
      if (this.validate(this.form)) {
        this.$api.saveAddress(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '保存成功', duration: 1500});
            setTimeout(() => {
              this.$router.back();
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    // 更新
    updateAddress() {
      if (this.validate(this.form)) {
        this.$api.updateAddress(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '更新成功', duration: 1500});
            setTimeout(() => {
              this.$router.back();
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    // 删除
    onDelete(data) {
      if (!data.id) {
        this.$toast({message: '删除成功', duration: 1500});
        setTimeout(() => {
          this.$router.back();
        })
      }

      this.$api.deleteAddress({id: data.id})
      .then(res => {
        if (res.code === '00') {
          this.$toast({message: '删除成功', duration: 1500});
          setTimeout(() => {
            this.$router.back();
          })
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

.address-page {
  
}
</style>