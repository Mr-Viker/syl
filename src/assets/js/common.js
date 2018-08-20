/**
 * 公共方法
 */
import {Howl, Howler} from 'howler';

export default {
  install(Vue, opts) {
    // 判断是否是微信浏览器
    Vue.prototype.isWeChat = function() {
      return /micromessenger/.test(navigator.userAgent.toLowerCase());
    }
    
    // 获取系统配置
    Vue.prototype.getConfig = function() {
      return this.$api.getConfig()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setConfig', res.data);
        }
        return res.data;
      })
    }

    // 获取用户信息
    Vue.prototype.getUserInfo = function() {
     return  this.$api.getUserInfo()
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('setUserInfo', res.data);
          this.$store.commit('setHasLogin', true);
        }
        return res;
      });
    }

    // 判断路径是否是绝对路径
    Vue.prototype.getImgURL = function(url) {
      if (url && /^[http|www]/.test(url)) {
        return url;
      } else {
        return this.$store.state.baseImgURL + url;
      }
    }

    // 格式化数据 保留两位
    Vue.prototype.format = function(value, keep) {
      keep = keep || 2;
      if (typeof value == 'undefined' || value == null || isNaN(value)) {
        return value;
      }
      return parseFloat(Number(value).toFixed(keep));
    }


    // 收藏
    Vue.prototype.collect = function(id) {
      if (!this.$store.state.hasLogin) {
        this.$router.push({name: 'Login'});
        return;
      }
      return this.$api.collect({goodsId: id})
      .then(res => {
        if (res.code === '00') {
          this.$toast.success({message: '收藏成功', duration: 1500});
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    }

    // 取消收藏
    Vue.prototype.cancelCollect = function(id) {
      if (!this.$store.state.hasLogin) {
        this.$router.push({name: 'Login'});
        return;
      }
      return this.$api.cancelCollect({goodsId: id})
      .then(res => {
        if (res.code === '00') {
          this.$toast.success({message: '取消收藏成功', duration: 1500});
        } else {
          this.$toast(res.msg);
        }
        return res;
      })
    }

    // 音频播放器
    Vue.prototype.initAudio = function(autoplay) {
      var srcs = [
        require('@/assets/audio/audio-1.mp3'),
        require('@/assets/audio/audio-2.mp3'),
        require('@/assets/audio/audio-3.mp3'),
        require('@/assets/audio/audio-4.mp3'),
        require('@/assets/audio/audio-5.mp3'),
      ];
      // Setup the new Howl.
      var sound = new Howl({
        src: srcs[Math.floor(Math.random() * srcs.length)],
        autoplay: autoplay || false,
        loop: false,
        volume: 0.3,
      });
      sound.on('end', (id) => {
        this.$store.state.sound.stop();
        this.$store.commit('setSound', {});

        this.initAudio(true);
      });
      this.$store.commit('setSound', sound);
    }


  }
}