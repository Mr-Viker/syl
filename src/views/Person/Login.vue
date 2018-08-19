<template>
  <section class="page auth-page">
    <van-row class="page-hd" type='flex' justify='center' align='center'>
      <div class="upload-container">
        <img :src="getImgURL(avatar)" alt="" v-if='avatar' class="img-face">
        <img src="../../assets/img/person/user-default.jpeg" alt="" class="img-face" v-else>
      </div>
    </van-row>


    <div class="page-bd">
      <form @submit.prevent='login' novalidate>
        <van-cell-group>
          <van-field v-model="form.phone" clearable label="手机号" left-icon="phone" placeholder="请输入手机号""/>
          <van-field v-model="form.password" :type='pwdType' clearable label="密码" left-icon="edit-data" placeholder="请输入密码"" @click-icon='toggleEye'>
            <span slot='icon'>
              <van-icon name="password-not-view" v-show='pwdType == "password"'/>
              <van-icon name="password-view" v-show='pwdType == "text"'/>
            </span>
          </van-field>
        </van-cell-group>
        <div class="btn-submit-container">
          <van-button type="primary" native-type='submit' tag='input' :block='true' class='btn-submit' value="登 录"></van-button>
        </div>
      </form>

      <van-row type='flex' justify='space-between' align='center' class='bd-tips'>
        <van-col span="6"><router-link to='/forgetPassword'>忘记密码</router-link></van-col>
        <van-col span="6"><router-link to="/register">前往注册</router-link></van-col>
      </van-row>
    </div>

  </section>
</template>


<script>
import axios from '@/assets/js/http';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        phone: '',
        password: '',
      },
      pwdType: 'password',
      avatar: '',
    }
  },

  created() {
    this.avatar = this.$route.query.avatar ? this.$route.query.avatar : '';
  },

  methods: {
    // 切换eye
    toggleEye() {
      this.pwdType = this.pwdType == 'password' ? 'text' : 'password';
    },
    // 表单提交
    login() {
      if (this.validate(this.form)) {
        this.$api.login(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '登录成功', duration: 1500});
            this.$store.commit('setHasLogin', true);
            this.$store.commit('setUserInfo', res.data);
            
            window.localStorage.setItem('token', res.data.token);
            axios.defaults.headers.token = 'bearer ' + res.data.token;

            setTimeout(() => {
              console.log(this.$route.query.redirect);
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect);
              } else {
                this.$router.push({name: 'Person'});
              }
              // window.location.reload();
            }, 1500);
            
            // setTimeout(() => {
              // window.location.reload();
            // }, 500);
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