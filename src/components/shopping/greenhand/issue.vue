<template lang="html">
<div :class="$style.issue">
  <div :class="$style.title">
    <h4>猜你想问</h4>
    <router-link tag="span" :to="{ name: 'GreenhandList' }">查看更多</router-link>
  </div>
  <div :class="$style.list">
    <dl v-for="(item, index) in listData" :key="index" :class="{ [$style.active]: activeIndex === index }">
      <dt @click="activeHandler(index)">
        <img :src="item.ico ? item.ico: 'require(@/assets/rz.png)'" alt="">
        <p><span>{{ item.question_cate }}</span></p>
        <span></span>
      </dt>
      <dd @click="displayHandler(index, subIndex)" v-for="(subItem, subIndex) in (activeIndex === index ? item.list : item.list.slice(0, 2))" :key="subItem.id"><p>{{ subItem.question }}</p></dd>
    </dl>
  </div>
</div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeIndex: -1
    }
  },
  methods: {
    /**
     * [activeHandler 点击展开]
     * @param  {[Number]} index [当前点击的索引]
     * @return {[type]}       [description]
     */
    activeHandler(index) {
      const { activeIndex } = this;
      this.activeIndex = index === activeIndex ? -1: index;
    },

    /**
     * [displayHandler 展示数据]
     * @param  {[Number]} index [当前点击数据]
     * @param  {[Number]} subIndex [当前点击子数据]
     * @return {[type]}       [description]
     */
    displayHandler(index, subIndex) {
      const { listData } = this;

      const data = listData[index].list[subIndex]
      console.log(data)

      this.$emit('display-handler', { data })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.issue {
  width: 100%;
  margin-bottom: 40px;

  .title {
    width: 100%;
    height: 110px;
    box-sizing:border-box;
    padding: 0 30px;
    @include list(row);
    align-items: center;
    justify-content:space-between;
    position:relative;
    >h4 {
      width: 50%;
      font-size: 30px;
    }

    >span {
      width: 30%;
      height: 100%;
      font-size: 26px;
      @include list(row);
      align-items:center;
      justify-content:flex-end;

      &:after {
        content: " ";
        @include leftArrow($width:12px, $bg: #ccc,$rotate:rotate(-45deg));
        margin-left: 10px;
      }
    }

    &:after {
      content: " ";
      height: 1px;
      background:#d7d7d7;
      position:absolute;
      left: 30px;
      right: 30px;
      bottom: 0;
    }
  }

  .list {
    width: 100%;

    dl {
      width: 100%;
      @include list;
      position:relative;
      align-items:flex-end;
      height: 168px;
      overflow:hidden;

      &:after {
        content: " ";
        height: 1px;
        background:#d7d7d7;
        position:absolute;
        left: 30px;
        right: 30px;
        bottom:0;
      }

      dt {
        width: 140px;
        height: 100%;
        position:absolute;
        left: 30px;
        top:0;
        @include border($bg: #d7d7d7, $direction: right)
        @include list;
        align-items:center;
        box-sizing:border-box;
        padding-top: 34px;

        >img {
          width: 40px;
          height: 40px;
          margin-bottom:6px;
        }

        >p {
          width: 100%;
          height: 40px;
          display:table;
          font-size: 24px;
          text-align:center;

          >span {
            display:table-cell;
            vertical-align: middle;
            line-height: 40px;
          }
        }

        >span {
          @include leftArrow($width:14px, $bg: #cacaca,$rotate:rotate(45deg));
        }
      }

      dd {
        width: 552px;
        height: 84px;
        @include border($bg: #d7d7d7, $direction: bottom)
        margin-right: 30px;
        font-size: 28px;
        @include list(row);
        align-items:center;
        box-sizing:border-box;
        padding-left: 20px;

        >p {
          line-height: 36px;
          @include multiline-truncation;
        }

        &:last-child {
          border:none;
        }
      }
    }

    .active {
      min-height: 84px;

      dt {
        >span {
          @include leftArrow($width:14px, $bg: #cacaca,$rotate:rotate(-135deg));
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
