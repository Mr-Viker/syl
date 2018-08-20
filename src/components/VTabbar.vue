<template>
  <van-tabbar v-model="active" class='v-tabbar'>
    <van-tabbar-item :icon="item.icon" :to='item.link' v-for='item in tabs' :key='item.link'>{{ item.title }}</van-tabbar-item>
  </van-tabbar>
</template>


<script>
export default {
  name: 'VTabbar',
  data() {
    return {
      tabs: [
        { title: '首页', icon: 'shop', link: '/' },
        { title: '分类', icon: 'wap-nav', link: '/goodsList' },
        { title: '我的', icon: 'contact', link: '/person' },
      ]
    };
  },
  computed: {
    active: {
      get() {
        for (var i = this.tabs.length - 1; i >= 0; i--) {
          if (this.tabs[i].link == this.$route.path) {
            return i;
          }
        }
      },
      set() {}
    }
  },

} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-tabbar {
  
}
</style>