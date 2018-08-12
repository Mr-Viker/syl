<template>
  <div id="app">
    <v-header :title='title' v-if='showHd'></v-header>
    <router-view :class='{"page-has-hd": showHd, "page-has-tab": showTab}'/>
    <v-tabbar v-if='showTab'></v-tabbar>
  </div>
</template>


<script>
import VHeader from '@/components/VHeader';
import VTabbar from '@/components/VTabbar';

export default {
  name: 'App',
  components: { VHeader, VTabbar },
  data() {
    return {

    };
  },
  computed: {
    title() { return this.$route.meta.title; },
    showHd() { return this.$route.meta.showHd; },
    showTab() { return this.$route.meta.showTab; },
  },

  created() {
    this.getConfig()
    .then(res => {
      this.initTitle();
      this.watchRouter();
    });

    if (window.localStorage.getItem('token')) {
      this.getUserInfo();
    }
  },

  methods: {

    // 初始化title（进入或刷新）
    initTitle() {
      document.title = this.$route.meta.title + ' - ' + this.$store.state.config.system_name;
    },

    // 路由跳转时检测是否需要登录
    watchRouter() {
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.title) {
          document.title = to.meta.title + ' - ' + this.$store.state.config.system_name;
        }

        if (to.matched.some(record => record.meta.requireAuth)) {
          if (!this.$store.state.hasLogin) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next();
          }
        } else {
          next();
        }
        // 每次路由跳转都会滚动到顶部
        window.scrollTo(0, 0);
      })
    },
  }
}
</script>


<style lang="less">
@import './assets/css/app.less';
</style>
