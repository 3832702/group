<template lang="html">
  <ul :class="$style.tab">
    <li
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ [$style.active]: index == activeIndex }"
      @click="searchHandler(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return ['退款记录', '提现记录']
      }
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    /**
     * [searchHandler 切换tab]
     * @param  {[type]} index 当前点击索引
     * @return {[type]}   [description]
     */
    searchHandler(index) {
      this.activeIndex = index;
      this.$emit('tab-change', { type: index })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.tab {
  width: 100%;
  height: 88px;
  @include list(row);
  background:#fff;
  position:fixed;
  left:0;
  top:0;
  z-index:11111;
  border-bottom:1px solid #f2f2f2;

  li {
    flex:1;
    height: 100%;
    line-height: 88px;
    text-align:center;
    font-size: 32px;
  }

  .active {
    color:#de4547;
  }
}
</style>
