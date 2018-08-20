<template>
  <section class="page change-password-page">
    <van-row class="page-hd"><img class="img-w" src="../../assets/img/carouse/carouse-9.jpg"></van-row>

    <van-cell-group>
      <van-field v-model="form.oldPassword" :type='pwdTypes[0]' clearable label="旧密码" left-icon="edit-data" placeholder="请输入旧密码"" @click-icon='toggleEye(0)'>
        <span slot='icon'>
          <van-icon name="password-not-view" v-show='pwdTypes[0] == "password"'/>
          <van-icon name="password-view" v-show='pwdTypes[0] == "text"'/>
        </span>
      </van-field>
      <van-field v-model="form.password" :type='pwdTypes[1]' clearable label="新密码" left-icon="edit-data" placeholder="请输入新密码"" @click-icon='toggleEye(1)'>
        <span slot='icon'>
          <van-icon name="password-not-view" v-show='pwdTypes[1] == "password"'/>
          <van-icon name="password-view" v-show='pwdTypes[1] == "text"'/>
        </span>
      </van-field>
      <van-field v-model="form.confirmPassword" :type='pwdTypes[2]' clearable label="确认密码" left-icon="edit-data" placeholder="请再次输入新密码"" @click-icon='toggleEye(2)'>
        <span slot='icon'>
          <van-icon name="password-not-view" v-show='pwdTypes[2] == "password"'/>
          <van-icon name="password-view" v-show='pwdTypes[2] == "text"'/>
        </span>
      </van-field>
    </van-cell-group>

    <div class="btn-submit-container">
      <van-button type="primary" :block='true' class='btn-submit' @click='submit'>确 定</van-button>
    </div>
  </section>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'ChangePassword',
  data() {
    return {
      form: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
        type: 'password' // 更新类型 有username password
      },
      pwdTypes: ['password', 'password', 'password'],
    };
  },

  created() {},

  methods: {
    toggleEye(index) {
      var value = this.pwdTypes[index] === 'password' ? 'text' : 'password';
      this.$set(this.pwdTypes, index, value);
    },

    submit() {
      if (this.validate(this.form)) {
        this.$api.updateUserInfo(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '更新成功', duration: 1500});
            setTimeout(() => {
              this.$router.back();
            }, 1500);
          } else {
            this.$toast(res.msg);
          }
        })
      }
    }
  },

} 
</script>


<style lang="less">
@import '../../assets/css/_variable.less';

.change-password-page {
  .page-hd {
    height: 2rem;
    margin-bottom: .2rem;
  }
}
</style>