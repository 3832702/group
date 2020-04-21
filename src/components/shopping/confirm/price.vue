<template lang="html">
  <div :class="$style.price">
    <div :class="$style.item">
      <span>商品金额</span>
      <p></p>
      <span>￥{{ price }}</span>
    </div>
    <div :style="{ border:'none' }" :class="$style.item">
      <span>运费</span>
      <span>+￥0.00</span>
    </div>
    <!--<div :class="$style.total">
      总价:
      <span>￥1235.79</span>
    </div>
  -->
    <div v-if="details && details.goods && details.goods.goods_stock" :class="$style.btn">
      <p>实付款: <span>{{ price }}</span></p>
      <button @click="submitHandler">去支付</button>
    </div>

    <Prompt @cancel-change="cancelChange" @confirm-change="confirmChange" v-if="isMask">
      <template v-slot:text>
        <p>收货地址不能为空</p>
      </template>
    </Prompt>
  </div>
</template>

<script>

export default {
  props: {
    totalPrice: {
      type: Number,
      default: 0
    },
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    price() {
      return typeof this.totalPrice === 'number' ? this.totalPrice.toFixed(2) : this.totalPrice
    }
  },
  data() {
    return {
      isMask: false, // 是否弹窗提示
    }
  },
  methods: {
    /**
     * [submitHandler 去支付]
     * @return {[type]} [description]
     */
    submitHandler() {
      const { details: { address: { home_address } } } = this;
    //  console.log(this.details)
      if (!home_address) {
        this.isMask = true
        return;
      }

      this.$emit('call-pay')
    },

    /**
     * [cancelChange 点击取消]
     * @return {[type]} [description]
     */
    cancelChange() {
      this.isMask = false
    },

    /**
     * [confirmChange 点击确认]
     * @return {[type]} [description]
     */
    confirmChange() {
      this.isMask = false;
      this.$router.push({ name: "Address" })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.price {
  width: 100%;
  background:#fff;
  padding: 15px 0;
  padding-bottom:98px;

  .item {
    width: 100%;
    height: 90px;
    box-sizing:border-box;
    padding: 0 20px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    @include border($bg: #e6e6e6, $width: 2px, $direction: bottom)

    p {
      font-size: 30px;
    }

    span {
      &:nth-of-type(1) {
        font-size: 32px;
      }

      &:nth-of-type(2) {
        font-size: 30px;
        color:#ef3c52;
      }
    }
  }

  .total {
    width: 100%;
    height: 88px;
    box-sizing:border-box;
    padding:0 20px;
    font-size: 30px;
    line-height: 88px;
    text-align:right;
    margin-bottom:20px;

    span {
      color:#da4040;
      font-size: 28px;
      margin-left: 30px;
    }
  }

  .btn {
    width:100%;
    height: 100px;
    position:fixed;
    left:0;
    bottom:0;
    background:#fff;
    @include list(row);
    justify-content:flex-end;
    align-items:center;
    @include border($bg: #f1f1f1, $direction: top)

    p {
      font-size: 28px;
      color:#e93b3d;

      span {
        font-size: 34px;
        &:before {
          content: "￥";
          font-size: 26px;
        }
      }
    }

    button {
      background:#e93b3d;
      border:none;
      padding:0;
      width: 275px;
      height: 100%;
      text-align:center;
      line-height: 100px;
      color:#fff;
      font-size: 32px;
      margin-left:20px;
    }
  }
}
</style>
