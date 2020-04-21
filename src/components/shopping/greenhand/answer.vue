<template lang="html">
<div @click="hideHandler" :class="$style.answer">
  <div :class="$style.content">
    <div :class="$style.t">
      <p>
        {{ displayData.question }}
      </p>
      <span></span>
    </div>
    <div :class="$style.c">
      {{ displayData.answer }}
    </div>
    <div :class="$style.b">
      <p>是否对你有帮助:</p>
      <ul>
        <li><span :class="$style.first"></span>有用</li>
        <li><span :class="$style.last"></span>没用</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    displayData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    /**
     * [hideHandler 隐藏弹窗]
     * @return {[type]} [description]
     */
    hideHandler() {
      this.$emit('hide-handler', {})
    }
  }
}
</script>

<style lang="scss" module>
@import '@/public/css/elements.scss';

.answer {
  width: 100vw;
  height: 100vh;
  background:rgba(0,0,0,.1);
  position:fixed;
  left: 0;
  top:0;

  .content {
    width: 100%;
    position:absolute;
    left:0;
    bottom:0;
    background:#fff;

    .t {
      width: 100%;
      height: 96px;
      @include border($bg: #ddd, $direction: bottom)
      box-sizing:border-box;
      padding: 0 30px;
      font-size: 30px;
      @include list(row);
      align-items:center;
      justify-content:space-between;

      >p {
        width: 90%;
        @include truncation;
      }

      span {
        width: 35px;
        height: 35px;
        background:url("@/assets/remove1.png") no-repeat;
        background-size: cover;
      }
    }

    .c {
      width: 100%;
      box-sizing:border-box;
      padding:30px;
      line-height: 44px;
      font-size: 28px;
      color:#333333;
    }

    .b {
      width: 100%;
      height: 106px;
      box-sizing:border-box;
      padding: 0 30px;
      @include border($bg: #ddd, $direction: top)
      @include list(row);
      align-items:center;
      font-size: 28px;
      color:#c3c3c3;
      justify-content:space-between;

      ul {
        height: 100%;
        @include list(row);
        align-items:center;
        li {
          width: 180px;
          height: 100%;
          @include list(row);
          align-items:center;
          font-size: 28px;
          color:#2e2e2e;

          >span {
            width: 32px;
            height: 32px;
            margin-right: 20px;
          }

          .first {
            background:url('@/assets/praise3.png') no-repeat;
            background-size:cover;
          }

          .last {
            background:url('@/assets/praise1.png') no-repeat;
            background-size:cover;
          }
        }
      }
    }
  }
}
</style>
