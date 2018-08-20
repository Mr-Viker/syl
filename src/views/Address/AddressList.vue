<template>
  <section class="page address-list-page">
    <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" @select="onSelect" />
  </section>
</template>


<script>
export default {
  name: 'AddressList',
  data() {
    return {
      chosenAddressId: '',
      list: [],
    };
  },

  created() {
    this.getAddressList();
  },

  methods: {
    getAddressList() {
      this.$api.getAddressList()
      .then(res => {
        if (res.code === '00') {
          var data = res.data;
          for (var i = data.length - 1; i >= 0; i--) {
            var item = {
              id: data[i].id,
              name: data[i].realname,
              tel: data[i].phone,
              address: data[i].province + data[i].city + data[i].county + data[i].area,
            };
            this.list.push(item);
          }
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 新增
    onAdd() {
      this.$router.push({name: 'Address'});
    },

    // 编辑
    onEdit(item, index) {
      this.$router.push({name: 'Address', query: {id: item.id}});
    },

    // 选中
    onSelect(item, index) {
      if (this.$route.query.redirect) {
        // console.log(this.$route.query.redirect, item, url);
        this.$router.push({name: this.$route.query.redirect, query: {addressId: item.id}});
      }
    }

  },

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.address-list-page {
  
}
</style>