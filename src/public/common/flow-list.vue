<template lang="html">
  <!-- <van-pull-refresh> -->
    <van-list :finished-text="isNot ? '' : finishedText" :offset="100" v-model="loading" :finished="finished" @load="onLoad">
      <slot></slot>
      <div v-if="isNot" :class="$style.not">
        <img src="@/assets/not-1.png" alt="">
        <span>{{ finishedText }}</span>
      </div>
    </van-list>
 <!-- </van-pull-refresh> -->
</template>

<script>
export default {
  props: {
    finished: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    isNot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    onLoad() {
      this.$emit('load-list-change')
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.not {
  width: 750px;
  height: 250px;
  @include list(row);
  align-items:center;
  justify-content:center;

  img {
    width: 150px;
    height: 150px;
  }

  span {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    color:#ccc;
    text-align:center;
  }
}
</style>
