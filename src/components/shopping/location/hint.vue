<template lang="html">
  <div :class="$style.hint">
    <div :class="$style.wrap">
      <div :class="$style.head">
        <slot name="text"></slot>
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
    }

    .btn {
      width: 100%;
      height: 90px;
      border-top:1px solid #cbd5d4;
      position:relative;
      @include list(row);
      &:after {
        content: " ";
        width: 2px;
        border-right:1px solid #cbd5d4;
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
