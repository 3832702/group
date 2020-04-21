<template lang="html">
  <div :class="$style.address">
    <!--<div :class="$style.head">
      <p>包裹正在等待揽收</p>
      <span>2019/08/01 11:24:01</span>
    </div>
  -->
    <div :class="$style.user">
      <h4>
        <span>{{ info.home_name }}</span>
        <span>{{ info.home_phone }}</span>
      </h4>
      <p>{{ info.home_address }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() { return {}}
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.address {
  width: 93%;
  background:#fff;
  border-radius:10px;
  margin:0 auto;
  padding-bottom:30px;
  box-shadow:4px 4px 20px #f0f0f0;
  margin-bottom:20px;

  .head {
    width: 100%;
    height: 98px;
    box-sizing:border-box;
    padding:10px 75px 0;
    @include list;
    position:relative;
    @include border($bg: #f7f7f7, $direction: bottom)

    &:before {
      width: 33px;
      height: 33px;
      content: " ";
      position:absolute;
      left:22px;
      top:22px;
      background:url('@/assets/transport.png') no-repeat;
      background-size: cover;
    }

    &:after {
      content: " ";
      @include leftArrow($width: 14px,$bg:#cacaca,$rotate:rotate(45deg));
      position:absolute;
      right:20px;
      top:39px;
    }

    p {
      width: 100%;
      font-size: 28px;
      height: 46px;
      line-height: 46px;
      color:#fb6264;
    }

    span {
      height: 38px;
      line-height: 38px;
      font-size: 24px;
      color:#afafaf;
    }
  }

  .user {
    width: 100%;
    box-sizing:border-box;
    padding: 0 25px 0 75px;
    position:relative;
    @include list;

    &:before {
      content: " ";
      width: 30px;
      height: 30px;
      background:url('@/assets/wz.png') no-repeat;
      background-size:cover;
      position:absolute;
      left:20px;
      top:20px;
    }

    h4 {
      width: 100%;
      height: 66px;
      font-size: 28px;
      @include list(row);
      justify-content:space-between;;
      align-items:center;
      margin-bottom:10px;
    }

    p {
      width:100%;
      line-height: 36px;
      font-size: 24px;
      color:#6e6e6e;
    }
  }
}

</style>
