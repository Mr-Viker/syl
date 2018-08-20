<template>
  <section class="page auth-page">
    <van-row class="page-hd" type='flex' justify='center' align='center'>
      <div class="upload-container">
        <img :src="getImgURL(avatar)" alt="" v-if='avatar' class="img-face">
        <img src="../../assets/img/person/user-default.jpeg" alt="" class="img-face" v-else>
      </div>
    </van-row>

    <div class="page-bd">
      <form @submit.prevent='submit' novalidate>
        <van-cell-group>
          <van-field v-model="form.phone" clearable label="手机号" left-icon="phone" placeholder="请输入手机号""/>
          <van-field v-model="form.smsCode" left-icon='more-o' center clearable label="验证码" placeholder="请输入验证码">
            <van-button native-type='button' slot="button" size="small" type="primary" @click='getSms' v-if='leftTime <= 0'>发送验证码</van-button>
            <van-button native-type='button' slot="button" size="small" type="primary" disabled v-else>{{leftTime}}s后重新获取</van-button>
          </van-field>
          <van-field v-model="form.password" :type='pwdTypes[0]' clearable label="新密码" left-icon="edit-data" placeholder="请输入新密码"" @click-icon='toggleEye(0)'>
            <span slot='icon'>
              <van-icon name="password-not-view" v-show='pwdTypes[0] == "password"'/>
              <van-icon name="password-view" v-show='pwdTypes[0] == "text"'/>
            </span>
          </van-field>
          <van-field v-model="form.confirmPassword" :type='pwdTypes[1]' clearable label="确认密码" left-icon="edit-data" placeholder="请再次输入新密码"" @click-icon='toggleEye(1)'>
            <span slot='icon'>
              <van-icon name="password-not-view" v-show='pwdTypes[1] == "password"'/>
              <van-icon name="password-view" v-show='pwdTypes[1] == "text"'/>
            </span>
          </van-field>
        </van-cell-group>

        <div class="btn-submit-container">
          <van-button type="primary" native-type='submit' tag='input' :block='true' class='btn-submit' value='确 定'></van-button>
        </div>
      </form>
    </div>

  </section>
</template>


<script>
export default {
  name: 'ForgetPassword',
  data() {
    return {
      form: {
        phone: '',
        smsCode: '',
        password: '',
        confirmPassword: '',
      },
      pwdTypes: ['password', 'password'],
      timer: '', //计时器
      leftTime: 0,
    }
  },

  created() {
    this.avatar = this.$route.query.avatar ? this.$route.query.avatar : '';
  },

  methods: {
    // 切换eye
    toggleEye(index) {
      var value = this.pwdTypes[index] === 'password' ? 'text' : 'password';
      this.$set(this.pwdTypes, index, value);
    },

    // 获取短信验证码
    getSms() {
      if (this.validate({phone: this.form.phone})) {
        this.$api.getSms({
          phone: this.form.phone,
          type: 'forgetPassword',
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
    submit() {
      if (this.validate(this.form)) {
        this.$api.forgetPassword(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '修改成功', duration: 1500});
            setTimeout(() => {
              this.$router.push({name: 'Login'});
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