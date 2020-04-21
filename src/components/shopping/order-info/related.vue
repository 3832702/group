<template lang="html">
  <div :class="$style.related">
    <div v-if="info.remark" :class="$style.note">
      <span>订单备注</span>
      <p>{{ info.remark }}</p>
    </div>

    <ul :class="$style.price">
      <li>
        <span>商品总额</span>
        <span>￥{{ info.goods_group_price * info.goods_buy_num }}</span>
      </li>
      <li>
        <span>运费合计</span>
        <span>￥0.00</span>
      </li>

      <li>
        <span>订单总价</span>
        <span>￥{{ info.goods_group_price * info.goods_buy_num }}</span>
      </li>
    </ul>

    <ul :class="$style.order">
      <li>
        <span>订单编号</span>
        <span>{{ info.order_id }}</span>
      </li>
      <li>
        <span>支付方式</span>
        <span>微信支付</span>
      </li>
      <li>
        <span>交易单号</span>
        <span>{{ info.transaction_id }}</span>
      </li>
      <li>
        <span>下单时间</span>
        <span>{{ info.create_time }}</span>
      </li>
      <li>
        <span>支付时间</span>
        <span>{{ info.create_time }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default() { return {}}
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.related {
  width: 93%;
  margin:0 auto;

  .note {
    width: 100%;
    border-radius:10px;
    background:#fff;
    box-sizing:border-box;
    padding:30px 20px;
    font-size: 26px;
    color:#8d8d8d;
    @include list(row);
    margin-bottom:20px;

    >span {
      width: 160px;
      height: 36px;
      line-height: 36px;
    }

    p {
      width: 71.4%;
      line-height: 36px;
      @include multiline-truncation;
    }
  }

  .price {
    width: 100%;
    background:#fff;
    border-radius:10px;
    padding-top: 20px;
    font-size:26px;
    margin-bottom:20px;

    >li {
      height: 48px;
      @include list(row);
      align-items:center;
      justify-content:space-between;
      color:#777777;
      box-sizing:border-box;
      padding:0 20px;

      &:last-child {
        height: 80px;
        position:relative;
        margin-top:20px;
        color:#2c2c2c;
        span {
          &:nth-of-type(2) {
            color:#fb6264;
          }
        }
        &:before {
          content: " ";
          height: 2px;
          background:#f1f1f1;
          position:absolute;
          left:20px;
          right:20px;
          top:0;
        }
      }
    }
  }

  .order {
    box-sizing:border-box;
    padding:20px;
    background:#fff;
    border-radius:10px;

    li {
      width: 100%;
      height: 48px;
      font-size: 26px;
      @include list(row);
      justify-content:space-between;
      align-items:center;
      color:#898989;
    }
  }
}
</style>
