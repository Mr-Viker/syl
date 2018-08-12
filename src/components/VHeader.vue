<template>
  <van-nav-bar class='v-header' :title="title" left-text="返回" :fixed='true' left-arrow  
              @click-left="onClickLeft" @click-right="onClickRight">
    <span slot=right><slot name='right'></slot></span>
  </van-nav-bar>
</template>


<script>
export default {
  name: 'VHeader',
  props: [ 'title' ],
  data() {
    return {
      
    };
  },

  methods: {
    onClickLeft() {
      this.$router.back();
    },

    onClickRight() {

    }
  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.v-header {
  
}
</style>