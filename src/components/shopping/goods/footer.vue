<template lang="html">
<div :class="$style.footer">
  <p @click="jumpHome">
    <img src="@/assets/home_1.png" alt="">
    <span>首页</span>
  </p>
  <p @click="collectHandler(true)" v-if="!details.is_collect">
    <img src="@/assets/collection.png" alt="">
    <span>收藏</span>
  </p>
  <p @click="collectHandler(false)" v-else>
    <img src="@/assets/collection1.png" alt="">
    <span>已收藏</span>
  </p>
  <div @click="jumpHandler" :class="$style.more">发起拼单</div>
</div>
</template>

<script>
export default {
  props: {
    singles: {
      type: Array,
      default() {
        return []
      }
    },
    details: {
      type: Object,
      default() {
        return {}
      }
    },
    goods_id: [String, Number]
  },
  methods: {
    /**
     * [collectHandler 点击收藏]
     * @param  {[Boolean]} status [true 收藏  false  取消收藏]
     * @return {[type]}        [description]
     */
    collectHandler(status) {
      this.$emit('collect-handler', { status })
    },

    /**
     * [jumpHome 跳转首页]
     * @return {[type]} [description]
     */
    jumpHome() {
      this.$router.replace({ name: "Home" })
    },

    /**
     * [jumpHandler 跳转拼单列表]
     * @return {[type]} [description]
     */
    jumpHandler() {
      const { goods_id } = this
      window.location.href = `https://tuan.nineopen.com/colonel/detail/${goods_id}`;
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.footer {
  width: 100%;
  height: 108px;
  position:fixed;
  left:0;
  bottom:0;
  background:#fff;
  align-items:center;
  @include list(row);
  @include border($bg: #f2f2f2, $direction: top)

  >p {
    width: 26%;
    height: 100%;
    @include list;
    align-items:center;
    justify-content:center;

    img {
      width: 42px;
      height: 42px;
      margin-bottom:10px;
    }

    span {
      width: 100%;
      height: 34px;
      line-height: 34px;
      text-align:center;
      font-size: 24px;
    }
  }

  >div {
    width: 48%;
    height: 100%;
    padding:0;
    border:none;
    @include list;
    align-items:center;
    justify-content:center;
    box-sizing:10px 0;
    color:#fff;
    font-size: 30px;
    background:#e51717;
  }
}
</style>
