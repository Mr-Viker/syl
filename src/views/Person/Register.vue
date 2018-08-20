<template>
  <section class="page auth-page">
    <van-row class="page-hd" type='flex' justify='center' align='center'>
      <v-uploader input-name='avatar' @uploaded='uploaded'></v-uploader>
    </van-row>

    <div class="page-bd">
      <form @submit.prevent='register' novalidate>
        <van-cell-group>
          <van-field v-model="form.username" clearable label="昵称" left-icon="contact" placeholder="请输入昵称""/>
          <van-field v-model="form.phone" clearable label="手机号" left-icon="phone" placeholder="请输入手机号""/>
          <van-field v-model="form.password" :type='pwdType' clearable label="密码" left-icon="edit-data" placeholder="请输入密码"" @click-icon='toggleEye'>
            <span slot='icon'>
              <van-icon name="password-not-view" v-show='pwdType == "password"'/>
              <van-icon name="password-view" v-show='pwdType == "text"'/>
            </span>
          </van-field>
          <van-field v-model="form.smsCode" left-icon='more-o' center clearable label="验证码" placeholder="请输入验证码">
            <van-button native-type='button' slot="button" size="small" type="primary" @click='getSms' v-if='leftTime <= 0'>发送验证码</van-button>
            <van-button native-type='button' slot="button" size="small" type="primary" disabled v-else>{{leftTime}}s后重新获取</van-button>
          </van-field>
        </van-cell-group>

        <div class="btn-submit-container">
          <van-button type="primary" native-type='submit' tag='input' :block='true' class='btn-submit' value='注 册'></van-button>
        </div>
      </form>

      <van-row type='flex' justify='end' align='center' class='bd-tips'>
        <van-col span="6"><router-link to="login">前往登录</router-link></van-col>
      </van-row>
    </div>

  </section>
</template>


<script>
import VUploader  from '@/components/VUploader';
import axios from '@/assets/js/http';

export default {
  name: 'Register',
  components: { VUploader },
  data() {
    return {
      form: {
        avatar: '',
        username: '',
        phone: '',
        password: '',
        smsCode: '',
      },
      pwdType: 'password',
      timer: '', //计时器
      leftTime: 0,
    }
  },

  methods: {
    // 读取头像后
    uploaded(res) {
      this.form.avatar = res.data.avatar;
    },

    // 切换eye
    toggleEye() {
      this.pwdType = this.pwdType == 'password' ? 'text' : 'password';
    },

    // 获取短信验证码
    getSms() {
      if (this.validate({phone: this.form.phone})) {
        this.$api.getSms({
          phone: this.form.phone,
          type: 'register',
        }).then(res => {
          if (res.code === '00') {
            this.leftTime = 60;
            this.timer = setInterval(() => {
              if (this.leftTime <= 0) {
                clearInterval(this.timer);
                return;
              } else {
                this.leftTime--;
              }
            }, 1000);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },

    // 表单提交
    register() {
      if (this.validate(this.form)) {
        this.$api.register(this.form)
        .then(res => {
          if (res.code === '00') {
            // 注册成功则保存token和用户信息
            this.$toast({message: '注册成功', duration: 1500});
            this.$store.commit('setHasLogin', true);
            this.$store.commit('setUserInfo', res.data);
            
            window.localStorage.setItem('token', res.data.token);
            axios.defaults.headers.token = 'bearer ' + res.data.token;

            setTimeout(() => {
              this.$router.push({name: 'Person'});
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    },
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (vm.$store.state.hasLogin) {
        vm.$router.back();
      }
    })
  },
}
</script>


<style lang='less'>
@import '../../assets/css/auth.less';
</style>