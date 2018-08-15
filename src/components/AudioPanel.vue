<template>
  <transition name="van-fade">
    <div class="audio-panel" v-if='show'>
      <van-row class="panel-bd" type='flex' justify='center' align='center'>
        <van-col class='bd-item bd-item-1' @click.native='onPrev'><i class="iconfont icon-shangyishou"></i></van-col>
        <van-col class='bd-item bd-item-2' @click.native='onPause' v-if='playing'><van-icon name='pause'></van-icon></van-col>
        <van-col class='bd-item bd-item-2' @click.native='onPlay' v-else><van-icon name='play'></van-icon></van-col>
        <van-col class='bd-item bd-item-3' @click.native='onNext'><i class="iconfont icon-xiayishou"></i></van-col>
      </van-row>
    </div>
  </transition>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: '',
  props: ['show'],
  data() {
    return {
      // ready: false,
      // playing: false,
      // id: '', //声音id
    };
  },

  computed: {
    ...mapState({
      sound: state => state.sound,
      userInfo: state => state.userInfo,
    }),
    // 当前是否正在播放音频
    playing() {
      return this.sound.playing();
    }
  },

  // watch: {
  //   sound(newVal, oldVal) {
  //     if (this.userInfo.autoplay) {
  //       this.sound.play();
  //     }
  //   }
  // },

  // created() {
  //   if (this.userInfo.autoplay) {
  //     this.onPlay();
  //   }
  // },

  methods: {

    onPlay() {
      if (this.sound.state() == 'loaded') {
        this.sound.play();
        // this.playing = true;
        return;
      }
      setTimeout(() => {
        this.onPlay();
      }, 1000);
    },

    onPause() {
      console.log('onPause');
      // if (this.playing) {
        this.sound.pause();
        // this.playing = false;
      // }
    },

    onPrev() {
      this.sound.stop();
      this.initAudio(true);
    },

    onNext() {
      this.sound.stop();
      this.initAudio(true);
    }

  },
} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.audio-panel {
  position: absolute;
  z-index: 100;
  bottom: 1rem;
  right: .1rem;
  width: .4rem;
  box-sizing: border-box;
  // background-color: #fff;
  // border: 1px solid @pink;
  border-radius: .1rem .1rem 0 0;
  padding: .05rem;

  .panel-bd {
    flex-direction: column;
  }
  .bd-item {
    font-size: .3rem;
    color: @pink;
  }
  .iconfont {
    font-size: .3rem;
  }

}
</style>