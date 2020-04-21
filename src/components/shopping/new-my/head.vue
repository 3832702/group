<template lang="html">
<div :class="$style.head">
  <div :class="$style.user">
    <p>
      <img :src="info.headimgurl" alt="">
    </p>
    <div :class="$style.info">
      <h4>{{ info.nickname }}</h4>
      <p>{{ info.phone || '' }}</p>
    </div>
  </div>
  <Entrance></Entrance>
</div>
</template>

<script>
import Entrance from "@/components/shopping/new-my/entrance.vue"
export default {
  components: {
    Entrance
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.head {
  width: 100%;
  height: 280px;
  background:url('@/assets/my_bg1.png') no-repeat;
  background-size: cover;
  overflow:hidden;
  position:relative;

  .user {
    height: 160px;
    width:100%;
    box-sizing:border-box;
    padding: 30px 20px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    >p {
      width: 96px;
      height: 96px;
      @include list(row);
      border-radius:50%;
      background:#ffffff;
      align-items:center;
      justify-content:center;

      img {
        width: 92px;
        height: 92px;
        border-radius:50%;
        margin:0 auto;
      }
    }

    .info {
      width: 82%;
      height: 92px;
      position:relative;

      h4 {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 30px;
        color:#fff;
      }

      p {
        width: 100%;
        height: 42px;
        line-height: 42px;
        font-size: 28px;
        color:#fff;
      }

      &:after {
        content: " ";
        @include leftArrow($width:16px, $bg: #fff,$rotate:rotate(-45deg));
        position:absolute;
        right:0;
        top: 50%;
        margin-top: -8px;
      }
    }
  }


  // .bg {
  //   width: 860px;
  //   height: 860px;
  //   position:absolute;
  //   border-radius:0 25% 70% 0;
  //   background:linear-gradient(to right, #d82221, #f22627);
  //   left: -430px;
  //   top: -430px;
  //   overflow:hidden;
  //   transform:rotate(20deg);
  // }
}
</style>
