<template lang="html">
<div v-if="details.group" :class="$style.single">
  <div :class="$style.head">
    <h4>[正在参团]</h4>
    <p>完成支付即可参团成功</p>
  </div>
  <ul>
    <li>
      <img :src="details.group.colonel.head_url" alt="">
      <p>
        <span>团长</span>
      </p>
    </li>
    <li v-for="(item, index) in groups" :key="index">
      <img :src="item.headimgurl" alt="">
      <p>
        <span>已支付</span>
      </p>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    groups() {
      if (Array.isArray(this.details.group.buy)) {
        return this.details.group.buy.filter(item => item.headimgurl != this.details.group.colonel.headimgurl).slice(0, 3)
      } else {
        return this.details.group.buy
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.single {
  width: 100%;
  background:#fff;
  padding: {
    top: 20px;
    bottom: 8px;
  };
  position:relative;
  margin-bottom:30px;

  &:after {
    content: " ";
    height: 2px;
    background:#e8e8e8;
    position:absolute;
    left:20px;
    right:0;
    bottom:0;
  }

  .head {
    width: 100%;
    height: 80px;
    line-height: 40px;
    font-size: 26px;
    position:relative;

    p {
      width: 100%;
      line-height: 40px;
      box-sizing:border-box;
      padding:0 20px 0 200px;
    }

    h4 {
      color:#d72b21;
      width: 186px;
      position:absolute;
      left:20px;
      top:0;
      line-height: 40px;
      height: 40px;
      @include list(row);
      align-items:center;

      &:before {
        content: " ";
        width: 32px;
        height: 32px;
        background:red;
        background:url("@/assets/single.png") no-repeat;
        background-size:cover;
        margin-right:15px;
      }
    }
  }

  ul {
    width: 100%;
    max-width: 550px;
    min-height: 130px;
    background:#fff;
    padding-top:28px;
    box-sizing:border-box;
    @include list(row);
    justify-content:center;
    margin:0 auto;

    li {
      width: 80px;
      height: 80px;
      margin:0 15px;
      position:relative;

      img {
        width: 100%;
        height: 100%;
        border-radius:50%;
      }

      p {
        padding:0 4px;
        height: 28px;
        min-width: 80px;
        color:#fff;
        background:#ed4248;
        font-size: 20px;
        position:absolute;
        left:-4px;
        bottom:-8px;
        border-radius:4px;
        display: table;
        line-height:normal;

        span {
          display: table-cell;
          vertical-align: middle;
          text-align:center;
        }
      }
    }
  }
}
</style>
