<template>
  <section class="page personal-page">

    <van-cell-group class='page-hd'>
      <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.inputName' compress='50' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="uploading" @imageuploaded="uploaded" @errorhandle="errorhandle" inputAccept='image/*' class='upload-container'>
        <van-cell title="头像" :center='true'>
          <img :src="getImgURL(userInfo.avatar)" alt="" slot="right-icon" class="van-cell__right-icon img-face-mini">
        </van-cell>
      </vue-core-image-upload>
    </van-cell-group>

    <van-cell-group class="page-bd">
      <van-cell title="昵称" :value='userInfo.username' icon="contact" @click='showDialog = !showDialog' is-link />
      <van-cell title="手机号" :value='userInfo.phone' icon="phone" class='bd-cell-2' />
      <van-cell title="密码" value='修改密码' icon="edit-data" is-link to='/changePassword' />
      <van-cell title="地址" value='管理地址' icon="location" is-link to='/addressList' />
      <!-- <van-switch-cell v-model="userInfo.autoplay" title="自动播放" @change='updateAutoplay' /> -->
    </van-cell-group>

    <div class="btn-submit-container">
      <van-button type="danger" :block='true' class='btn-submit' @click='logout'>退出登录</van-button>
    </div>
    
    <change-name-dialog :show='showDialog' :username='userInfo.username' @close='showDialog = false'></change-name-dialog>
  </section>
</template>


<script>
import {mapState} from 'vuex';
import VueCoreImageUpload  from 'vue-core-image-upload';
import ChangeNameDialog  from '@/components/ChangeNameDialog';
import axios from '@/assets/js/http';

export default {
  name: 'Personal',
  components: {VueCoreImageUpload, ChangeNameDialog},
  data() {
    return {
      // 上传图片配置
      options: {
        url: this.$store.state.baseURL + '/user/uploadAvatar',
        headers: {'token': window.localStorage.getItem('token') ? 'bearer ' + window.localStorage.getItem('token') : ''},
        inputName: 'avatar',
        extensions: 'png, jpeg, jpg, gif',
      },
      showDialog: false, //修改昵称弹框状态
    };
  },

  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },

  methods: {
    // 更新自动播放设置
    updateAutoplay(checked) {
      var autoplay = checked ? 1 : 0;
      this.$api.updateUserInfo({autoplay: autoplay, type: 'autoplay'})
      .then(res => {
        if (res.code === '00') {
          this.$store.commit('updateUserInfo', {autoplay: checked});
        } else {
          this.$toast(res.msg);
        }
      })
    },

    // 登出
    logout() {
      this.$api.logout()
      .then(res => {
        this.$toast({message: '登出成功', duration: 1500});
        this.$store.commit('setHasLogin', false);
        this.$store.commit('setUserInfo', {});

        window.localStorage.removeItem('token');
        axios.defaults.headers.token = '';

        setTimeout(() => {
          this.$router.push({name: 'Person'});
          // window.location.reload();
        }, 1500);
      })
    },

    // 读取头像前
    uploading(res) {
      this.$toast.loading({duration: 0, forbidClick: true});
    },

    // 读取头像后
    uploaded(res) {
      this.$toast.clear('clearAll');
      if (res.code === '00') {
        this.$store.commit('updateUserInfo', {avatar: res.data});
      } else {
        this.$toast(res.msg);
      }
    },

    // 上传失败
    errorhandle(err) {
      this.$taost.clear('clearAll');
      this.$toast(err);
    },
  },
} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.personal-page {
  .page-bd {
    margin: .3rem 0 .6rem;
  }
  .upload-container {
    border: none;
  }
  .bd-cell-2 {
    .van-cell__value {
      color: @gray;
    }
  }
}
</style>