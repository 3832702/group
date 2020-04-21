<template lang="html">
<div class="logistics" :class="$style.box">
  <div :class="$style.head">
    物流详情
    <span v-if="true" :class="$style.below"></span>
    <span v-else :class="$style.top"></span>
  </div>
  <van-steps direction="vertical" active-color="#fb6264" :active="send_history.length - 1">
    <van-step v-for="(item,index) in send_history" :key="index">
      <h3>{{ item.status }}</h3>
      <p>{{ item.time }}</p>
    </van-step>
  </van-steps>
</div>
</template>

<script>
export default {
  props: {
    send_history: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.box {
  width: 100%;
  color:#bebebe;

  .head {
    width: 100%;
    height: 80px;
    @include list(row);
    align-items:center;
    justify-content:center;
    font-size: 28px;
    color:#fb6264;
    background:#fff;
    @include border($bg: #f2f2f2, $direction: all)

    .below {
      @include leftArrow($width:10px, $bg: #fb6264,$rotate:rotate(45deg));
      margin-left: 20px;
      margin-top: -4px;
    }

    .top {
      @include leftArrow($width:10px, $bg: #fb6264,$rotate:rotate(-135deg));
      margin-left: 20px;
      margin-top: 10px;
    }
  }
}

</style>

<style lang="scss">
.logistics .van-step__title {
  color:#b9b9b9;
  font-size: 26px;
}

.logistics .van-step__line {
  background:#f2f2f2;
}

.logistics .van-step__circle {
  background:#f2f2f2;
  top: 0;
  left: -4px;
}


.logistics .van-step--vertical.van-step--process .van-icon {
  top: 0;
  left: -8px;
}
</style>
