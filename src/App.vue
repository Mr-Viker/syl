<template>
  <div id="app">
    <v-header :title='title' v-if='showHd'></v-header>
    <router-view :class='{"page-has-hd": showHd, "page-has-tab": showTab}'/>
    <v-tabbar v-if='showTab'></v-tabbar>

    <!-- <van-icon name="points" @click='showAudioPanel = !showAudioPanel' class='hd-play' /> -->
    <audio-panel :show="showAudioPanel"></audio-panel>
  </div>
</template>


<script>
import VHeader from '@/components/VHeader';
import VTabbar from '@/components/VTabbar';
import AudioPanel from '@/components/AudioPanel';

export default {
  name: 'App',
  components: { VHeader, VTabbar, AudioPanel },
  data() {
    return {
      showAudioPanel: false, //显示音频播放面板
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
      if (window.localStorage.getItem('token')) {
        return this.getUserInfo();
      }
      return res;
    }).then(res => {
      this.init();
      this.watchRouter();
      return res;
    }).then(res => {
      this.initAudio(this.$store.state.userInfo.autoplay);
    });
  },

  methods: {
    // 初始化（进入或刷新）
    init() {
      document.title = this.$route.meta.title + ' - ' + this.$store.state.config.system_name;
      // 如果本页面要登录且没有登录 则跳去登录
      if (this.$route.meta.requireAuth && !this.$store.state.hasLogin) {
        this.$router.push({name: 'Login', query: {redirect: this.$route.fullPath}});
      }
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
