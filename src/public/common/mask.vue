<template lang="html">
  <div :class="$style.hint">
    <div :class="$style.wrap">
      <div :class="$style.head">
        <h4>
          <slot name="title"></slot>
        </h4>
        <slot name="text">
        </slot>
      </div>
      <div :class="$style.btn">
        <slot name="cancel">
          <p @click="cancelChange">取消</p>
        </slot>
        <slot name="confirm">
          <p @click="confirmChange">确定</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * [cancelChange 点击了取消]
     * @return {[type]} [description]
     */
    cancelChange() {
      this.$emit('cancel-change')
    },

    /**
     * [confirmChange 点击了确定]
     * @return {[type]} [description]
     */
    confirmChange() {
      this.$emit('confirm-change')
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.hint {
  width: 100vw;
  height: 100vh;
  background:rgba(0,0,0,.3);
  position:fixed;
  left:0;
  top:0;
  z-index: 11113;

  .wrap {
    width: 540px;
    background:#fff;
    border-radius:20px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
    overflow:hidden;

    .head {
      min-height: 160px;
      width: 100%;
      box-sizing:border-box;
      padding: 35px 0;

      h4 {
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        text-align:center;
        margin-bottom: 20px;
        color:#000;
      }

      >p {
        line-height: 40px;
        font-size: 28px;
        box-sizing: border-box;
        width: 100%;
        padding:0 30px;
        text-align:center;
      }
    }

    .btn {
      width: 100%;
      height: 90px;
      @include border($bg: #cbd5d4, $direction: top)
      position:relative;
      @include list(row);
      &:after {
        content: " ";
        width: 2px;
        @include border($bg: #cbd5d4, $direction: right)
        height: 90px;
        position:absolute;
        left: 50%;
        top:0;
        transform:translateX(-50%);
      }

      p {
        width: 50%;
        height: 100%;
        line-height: 90px;
        height:90px;
        text-align:center;
        font-size: 26px;
        color:#008cff;
      }
    }
  }
}

</style>
