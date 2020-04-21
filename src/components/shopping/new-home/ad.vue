<template lang="html">
<div :class="$style.ad">
  <img v-lazy="ads[activeIndex] ? ads[activeIndex] : ads[0]" alt="">
</div>
</template>

<script>
export default {
  props: {
    ads: {
      type: Array,
      default() {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.ad {
  width: 100%;
  height: 262px;
  background:#fff;
  @include list(row);
  align-items:center;
  justify-content:center;
  // margin-bottom:20px;
  >img {
    width: 710px;
    height: 220px;
    border-radius:10px;
  }
}
</style>
