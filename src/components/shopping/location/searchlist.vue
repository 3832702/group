<template lang="html">
  <div :style="height" :class="$style.searchlist">
    <ul>
      <li
        v-for="(item) in searchList"
        :key="item.id"
        @click="updateChange(item)"
      >
        <h4>{{ item.name }}</h4>
        <p>{{ item.address }}</p>
      </li>
    </ul>
    <Hint @cancel-change="hideHint" @confirm-change="hideHint" v-if="isHint">
      <template v-slot:text>
        <p :class="$style.text">暂不支持搜索其他城市</p>
      </template>
    </Hint>
  </div>
</template>

<script>

import Hint from "@/components/shopping/location/hint.vue"

export default {
  components: {
    Hint
  },
  props: {
    'listHeight': {
      type: Object,
      default() {
          return {}
      }
    },
    searchList: {
      type: Array,
      default() {
        return []
      }
    },
    city: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isHint: false, // 是否显示提示
    }
  },
  computed: {
    height() { // 高度
      return this.listheight;
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

      return "";
    }
  },
  methods: {
    /**
     * [searchChange 选中列表的某一项]
     * @param  {[Object]} address [当前点击的详细信息]
     * @return {[type]}         [description]
     */
    updateChange(address) {

      if (address && address.address || address.name.indexOf(this.city) !== -1) {
        this.$emit('update-change', { address })
      } else {
        this.isHint = true;
      }
    },

    /**
     * [hideHint 隐藏提示窗]
     * @return {[type]} [description]
     */
    hideHint() {
      this.isHint = false;
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.searchlist {
  width: 100%;
  height: 100vh;
  position:fixed;
  left:0;
  top:84px;
  background:#fff;
  overflow: hidden {
    y: auto
  }

  ul {
    width: 100%;
    li {
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
        bottom:0;
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
  }

  .text {
    font-size: 32px;
    color:#000;
    line-height: 100px;
    text-align:center;
    @include truncation;
  }

}
</style>
