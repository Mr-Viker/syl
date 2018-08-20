<template>
  <vue-core-image-upload :url='options.url' text='' :inputOfFile='options.inputName' compress='50' :isXhr='true' :credentials='false' :headers='options.headers' @imageuploading="uploading" @imageuploaded="uploaded" @errorhandle="errorhandle" inputAccept='image/*' class='upload-container'>
    <img :src="getImgURL(imgSrc)" alt="" v-if='imgSrc' class="img-face">
    <van-icon name="photograph" v-else/>
  </vue-core-image-upload>
</template>


<script>
import VueCoreImageUpload  from 'vue-core-image-upload';

export default {
  name: 'Uploader',
  components: {VueCoreImageUpload},
  props: [ 'inputName' ],
  data() {
    return {
      // 上传图片配置
      options: {
        url: this.$store.state.baseURL + '/upload',
        headers: {'token': window.localStorage.getItem('token') ? 'bearer ' + window.localStorage.getItem('token') : ''},
        inputName: this.inputName,
        extensions: 'png, jpeg, jpg, gif',
      },
      imgSrc: '', //预览图片地址
    };
  },

  methods: {
    // 读取头像前
    uploading(res) {
      this.$toast.loading({duration: 0, forbidClick: true});
    },

    // 读取头像后
    uploaded(res) {
      this.$toast.clear('clearAll');
      if (res.code === '00') {
        this.imgSrc = res.data[this.inputName];
        // console.log(res.data[this.inputName]);
        // console.log(this.imgSrc);
      } else {
        this.$toast(res.msg);
      }
      this.$emit('uploaded', res);
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
@import '../assets/css/_variable.less';

.upload-container {
  
}
</style>