<template lang="html">
  <div :class="$style.order">
    <p>
      <img :src="$coverChange(send.goods_cover)" alt="">
    </p>
    <ul>
      <li>物流单号: {{ send.send_id }}</li>
      <li>二级镖师: {{ send.sign }}</li>
      <li>联系电话: {{ send.phone }}
        <p>
          <span :class="$style.phone">复制</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    send: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.order {
  width: 100%;
  height: 154px;
  background:#fff;
  box-sizing:border-box;
  padding: 0 20px;
  @include list(row);
  align-items:center;
  justify-content:space-between;
  margin-bottom:20px;

  >p {
    width: 120px;
    height: 120px;
    border-radius: 6px;
    box-sizing:border-box;
    padding:4px;
    background:#fff;
    box-shadow: 2px 2px 2px #f0efed;

    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit:cover;
    }
  }

  ul {
    width: 78.8%;
    li {
      width: 100%;
      height: 40px;
      color:#c8c8c8;
      font-size: 26px;
      @include list(row);
      align-items:center;

      >p {
        display:table;
        height: 40px;
        @include border($bg: #c8c8c8, $direction: all)
        padding:0 20px;
        border-radius:6px;
        margin-left: 20px;
      }
    }
  }

  .phone {
    display:table-cell;
    vertical-align:middle;
    font-size: 26px;
    line-height: 40px;
  }
}
</style>
