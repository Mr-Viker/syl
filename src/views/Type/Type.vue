<template>
  <section class="page type-page">
    <div class="page-hd">分类</div>
    <div class="page-bd"></div>
    <div class="page-ft"></div>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'Type',
  data() {
    return {
      
    };
  },

  computed: {
    ...mapState({

    }),
  },

  watch: {},

  created() {},

  methods: {},

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.type-page {
  
}
</style>