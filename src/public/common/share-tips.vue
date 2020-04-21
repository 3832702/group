<template lang="html">
<div @click="hideShareHandler" :class="$style.tips">
  <img src="@/assets/tips.png" alt="">
  <ul :class="$style.content">
    <li>1.点击右上角</li>
    <li>2.点击<img :src="images.py" />发送给朋友或<img :src="images.pyq" />分享给朋友圈</li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      images: {
        py: '',
        pyq: ''
      }
    }
  },
  created() {
    let u = navigator.userAgent;

    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (!isiOS) {
      this.images = { py: require("@/assets/py1.png"), pyq: require("@/assets/pyq1.png") }
    } else {
      this.images = { py: require("@/assets/py2.png"), pyq: require("@/assets/pyq2.png") }
    }
  },
  methods: {
    hideShareHandler() {
      this.$emit('hide-share-handler', {})
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.tips {
  width: 100vw;
  height: 100vh;
  position:fixed;
  left:0;
  top:0;
  background:rgba(0,0,0,.3);
  z-index: 999999999999;

  >img {
    width: 120px;
    height: 120px;
    position:absolute;
    right: 30px;
    top: 28px;
  }

  .content {
    position:absolute;
    height: 200px;
    background:#fff;
    top: 205px;
    left: 70px;
    right: 70px;
    border-radius: 10px;
    box-sizing:border-box;
    padding:30px 0;

    >li {
      width: 100%;
      height: 70px;
      @include list(row);
      align-items:center;
      font-size: 26px;
      color:#000;
      box-sizing:border-box;
      padding:0 30px;

      >img {
        width: 28px;
        height: 28px;
        margin:0 10px;
      }
    }
  }
}
</style>
