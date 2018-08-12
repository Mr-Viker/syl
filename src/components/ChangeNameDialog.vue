<template>
  <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" title='修改昵称'>
    <van-field v-model="form.username" label="昵称" placeholder="请输入昵称"/>
  </van-dialog>
</template>


<script>
import {mapState} from 'vuex';

export default {
  name: 'ChangeNameDialog',
  props: [ 'show', 'username' ],
  data() {
    return {
      form: {
        username: this.username,
        type: 'username',
      }
    };
  },

  // computed: {
  //   ...mapState({
  //     userInfo: state => state.userInfo,
  //   }),
  // },

  mounted() {
    console.log('props', this.username);
  },

  methods: {
    beforeClose(action, done) {
      if (action === 'confirm') {
        this.$api.updateUserInfo(this.form)
        .then(res => {
          if (res.code === '00') {
            this.$toast({message: '更新成功', duration: 1500});
            this.$store.commit('updateUserInfo', this.form);
            this.$emit('close');
            done();
          } else {
            this.$toast(res.msg);
            done(false);
          }
        })
      } else {
        this.$emit('close');
        done();

      }
    }
  },

} 
</script>


<style lang="less">
@import '../assets/css/_variable.less';

.change-name-dialog {
  
}
</style>