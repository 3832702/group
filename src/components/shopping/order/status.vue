<template lang="html">
  <ul v-if="index == 1" :class="$style.status"></ul>
  <ul v-else-if="index == 2 && data.send2_state >= 0" :class="$style.status">
      <li>查看物流</li>
  </ul>
  <!-- <ul v-else-if="index == 4" :class="$style.status">
      <li>确认收货</li>
  </ul> -->
  <ul v-else-if="index == 5 && data.is_return == 0" :class="$style.status">
      <li>扫码退货</li>
  </ul>
</template>

<script>
export default {
  props: {
    index: { // 通过该值判断显示哪些状态
      type: Number,
      default: 1
    },
    data: {
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

.status {
  width: 100%;
  @include list(row);
  justify-content:flex-end;
  box-sizing: border-box;
  padding:10px 26px;

  li {
    padding:0 25px;
    height: 52px;
    box-sizing:border-box;
    font-size: 26px;
    @include list(row);
    justify-content:center;
    align-items:center;
    @include border($bg: #3f3f3f, $direction: all)
    border-radius: 26px;
    margin-left: 20px;
  }
}
</style>
