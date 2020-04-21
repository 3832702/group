<template lang="html">
  <ul :class="$style.goods">
    <li>
      <img :src="$coverChange(info.goods_cover)" alt="">
      <div :class="$style.info">
        <h4><span>{{ info.goods_name }}</span></h4>
        <span></span>
        <p>
          <span>￥{{ info.goods_group_price }}</span>
          <span>×{{ info.goods_buy_num }}</span>
        </p>
      </div>
    </li>
  </ul>
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

.goods {
  width: 93%;
  border-radius: 10px;
  background:#fff;
  margin:0 auto;
  margin-bottom:20px;

  >li {
    width: 100%;
    height: 200px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    position:relative;

    &:after {
      content: " ";
      height: 2px;
      position:absolute;
      left:20px;
      right: 20px;
      background:#f1f1f1;
      bottom:0;
    }

    &:last-child {
      &:after {
        background:transparent;
      }
    }

    img {
      width: 160px;
      height: 160px;
      margin-left: 20px;
      object-fit:cover;
    }

    .info {
      width: 71.4%;
      box-sizing:border-box;
      padding-right: 20px;
      @include list;

      h4 {
        width: 100%;
        height: 80px;
        font-size: 28px;
        line-height:normal;
        display: table;

        span {
          display: table-cell;
          vertical-align: middle;
          @include multiline-truncation;
          line-height: 40px;
        }
      }

      >span {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        color:#b7b7b7;
      }

      p {
        width: 100%;
        height: 40px;
        @include list(row);
        align-items:flex-end;
        justify-content:space-between;
        font-size: 24px;
      }
    }
  }
}
</style>
