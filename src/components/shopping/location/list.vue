<template lang="html">
  <div :style="height" :class="$style.list">
    <dl v-if="nearbyList">
      <dt @click="searchChange(-1)" :class="{ [$style.active]: currentActive === -1 }">
        <p>
          {{ currAddress }}
        </p>
      </dt>
      <dd
        v-for="(item, index) in nearbyList"
        :key="item.id"
        @click="searchChange(index, item)"
        :class="{[$style.active]: currentActive === index}"
      >
        <h4>{{ item.title }}</h4>
        <p>{{ item.address }}</p>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    'listHeight': {
      type: Object,
      default() {
          return {}
      }
    },
    nearby: {
      type: Object,
      default() {
        return {}
      }
    },
    isRange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentActive: -1, // 当前点击按钮
    }
  },
  watch: {
    nearby() {
      this.currentActive = -1;
    }
  },
  computed: {
    height() { // 高度
      return this.listHeight;
    },
    nearbyList() { // pois列表
      if (this.nearby) {
          return this.nearby.result.pois;
      }

      return [];
    },
    currAddress() { // 当前地址
      if (this.nearby) {
          return this.nearby.result.address;
      }

      return ''
    }
  },
  methods: {
    /**
     * [searchChange 选中列表的某一项]
     * @param  {[Number]} index   [当前点击的索引]
     * @param  {[Object]} address [当前点击的详细信息]
     * @return {[type]}         [description]
     */
    searchChange(index, address) {

      if (!this.isRange) {
        this.$emit('range-block-change', { isRangeBlock: false })
        return;
      }

      this.currentActive = index;

      if (index === -1) {
        address = this.nearby.result;
      }
      const { location: { lat, lng } } = address;
      this.$emit('map-change', { location: [lat, lng], address })
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.list {
  width: 100%;
  background:#fff;
  overflow: hidden {
    y: auto
  }

  dl {
    width: 100%;
    dt {
      height: 102px;
      width: 100%;
      box-sizing:border-box;
      padding:0 30px;
      @include list(row);
      align-items:center;
      justify-content:space-between;
      font-size:30px;
      position:relative;

      p {
        width: 90%;
        @include truncation;
      }
    }
    dd {
      height: 102px;
      width: 100%;
      box-sizing:border-box;
      padding:0 30px;
      position:relative;

      &:after {
        content: " ";
        height: 2px;
        background:#e9e9e9;
        position:absolute;
        top:0;
        left: 30px;
        right:0;
      }
      h4 {
        width: 90%;
        font-size: 30px;
        height: 62px;
        line-height: 62px;
        @include truncation;
      }

      p {
        font-size: 26px;
        color:#aaaaaa;
        width: 90%;
        height: 30px;
        line-height: 30px;
        @include truncation;
      }
    }

    .active {
      &:before {
        content: " ";
        width: 44px;
        height: 44px;
        background:url("@/assets/check.png") no-repeat;
        background-size: cover;
        position:absolute;
        right:30px;
        top: 30px;
      }
    }
  }
}
</style>
