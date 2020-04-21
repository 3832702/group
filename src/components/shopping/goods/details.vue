<template lang="html">
  <div v-if="details.shop" :class="$style.content">
    <router-link :to="{ name: 'Store', query: { shop_id: details.shop_id } }" tag="div" :class="$style.store">
      <img :src="details.shop.head_url" alt="">
      <div :class="$style.store_c">
        <h4>{{ details.shop.sign }}</h4>
        <p>
          <span>商品数量: {{ details.shop.play_count }}</span>
          <span>已拼: {{ details.shop.sell_count }}件</span>
        </p>
      </div>
      <p :class="$style.store_r"><span>进店逛逛</span></p>
    </router-link>
    <div :class="$style.details">
      <div :class="$style.head">
        商品详情页
      </div>
      <p>{{ details.goods_about }}</p>
      <img v-for="(item, index) in details.goods_content" :key="index" :src="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default() {
        return {
          details: {}
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.content {
  width: 100%;

  .store {
    width: 100%;
    height: 102px;
    background:#fff;
    box-sizing:border-box;
    padding:0 26px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    margin-bottom:20px;

    >img {
      width: 66px;
      height: 66px;
    }

    .store_c {
      width: 64%;
      height: 100%;
      box-sizing:border-box;
      padding-top:14px;

      h4 {
        width: 100%;
        height: 38px;
        line-height: 38px;
        font-size: 30px;
      }

      p {
        width: 100%;
        height: 32px;
        @include list(row);
        align-items:center;
        font-size: 24px;
        color:#808080;

        span {
          margin-right: 15px;
        }
      }
    }

    .store_r {
      width: 130px;
      height: 54px;
      border-radius:4px;
      @include border($bg: #7e7e7e, $direction: all)
      font-size: 26px;
      display: table;
      line-height:normal;

      >span {
        display: table-cell;
        vertical-align: middle;
        text-align:center;
      }
    }
  }

  .details {
    width: 100%;
    background:#fff;
    box-sizing:border-box;
    padding:20px 26px;
    @include list;

    .head {
      width: 100%;
      height: 78px;
      font-size: 32px;
      text-align:center;
      line-height: 78px;
      font-weight:bold;
      margin-bottom:20px;
    }

    >p {
      width: 100%;
      line-height: 48px;
      font-size: 26px;
      text-indent: 52px;
      margin-bottom:20px;
    }

    >img {
      width: 100%;
    }
  }
}
</style>
