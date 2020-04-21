<template lang="html">
  <ul :class="$style.tab">
    <li
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ [$style.active]: index == activeIndex - 1 }"
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
        return ['拼团中', '拼团成功', '拼团失败', '拼团完成', '退货']
      }
    },
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  methods: {
    /**
     * [searchHandler 切换tab]
     * @param  {[type]} index 当前点击索引
     * @return {[type]}   [description]
     */
    searchHandler(index) {
      // this.activeIndex = index;
      this.$emit('tab-change', { type: ++index })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.tab {
  width: 100%;
  height: 78px;
  @include list(row);
  background:#fff;
  margin-bottom:20px;
  position:fixed;
  left:0;
  top:0;
  z-index:11111;

  li {
    flex:1;
    height: 100%;
    line-height: 78px;
    text-align:center;
    font-size: 28px;
  }

  .active {
    color:#fb6264;
  }
}
</style>
