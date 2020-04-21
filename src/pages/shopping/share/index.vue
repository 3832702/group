<template lang="html">
  <div :class="$style.share">
    <div :class="$style.imgwrap">
      <img src="@/assets/share.jpg" alt="">
    </div>
    <div :class="$style.btn" @click="shareHandler"><i></i><span>一键分享</span></div>
    <ShareTips @hide-share-handler="isTips=false" v-if="isTips"></ShareTips>
  </div>
</template>

<script>
import { setShareConfig } from "@/utils/employ-jssdk.js"
import { setShareFn } from "@/utils/share.js"

export default {
  data() {
    return {
      isTips: false, // 是否提示
    }
  },
  created() {
    setShareFn.call(this)
    this.judgeTypeHandler();
    setShareConfig(this.$wx)
  },
  methods: {

    setShareConfig() {
      setShareConfig(this.$wx)
    },

    /**
     * [shareHandler 点击分享]
     * @return {[type]} [description]
     */
    shareHandler() {
      setShareConfig(this.$wx)
      this.isTips = true;
    },

    /**
     * [judgeTypeHandler 判断类型]
     * @return {[type]} [description]
     */
    judgeTypeHandler() {
      let u = navigator.userAgent;

      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (!isiOS) {
        this.images = { py: require("@/assets/py1.png"), pyq: require("@/assets/pyq1.png") }
      } else {
        this.images = { py: require("@/assets/py2.png"), pyq: require("@/assets/pyq2.png") }
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.share {
  width: 100vw;
  height: 100vh;
  position:relative;
  overflow:hidden;
  background:#ffdb49;

  .imgwrap {
    width: 100%;
    height: 1054px;
    background:#fff;

    >img {
      width: 100%;
      height: 100%;
    }
  }

  .btn {
    width: 100%;
    height: 102px;
    position:absolute;
    left:0;
    bottom:0;
    font-size: 32px;
    color:#fff;
    @include list(row);
    justify-content:center;
    align-items:center;
    background:linear-gradient(to right, #e51717, #cd1b19);

    i {
      width: 36px;
      height: 36px;
      background:url('@/assets/share.png') no-repeat;
      background-size: cover;
      margin-right: 20px;
    }

    span {
      height: 38px;
      line-height: 38px;
    }
  }
}
</style>
