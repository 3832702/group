<template lang="html">
<ul :class="$style.tab">
  <li
    v-for="(item, index) in tabs"
    :key="index"
    :class="{[$style.active]: activeIndex === index }"
    @click="tabsChange(index)"
  >
    {{ item }}
  </li>
</ul>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabs: ['商家推荐', '最多购买', '最近发布']
    }
  },
  methods: {
    /**
     * [tabsChange 切换tab]
     * @param  {[Number]} index [当前点击索引]
     * @return {[type]}       [description]
     */
    tabsChange(index) {
      this.$emit('tab-change', { index })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.tab {
  width:100%;
  height: 80px;
  @include list(row);
  background:#fff;
  li {
    flex: 1;
    height:100%;
    text-align:center;
    line-height: 80px;
    font-size: 26px;
    box-sizing:border-box;

    &:first-child {
      padding-left: 26px;
      text-align:left;
    }

    &:last-child {
      padding-right: 35px;
      text-align:right;
    }
  }

  .active {
    color:#e62625;
  }
}
</style>
