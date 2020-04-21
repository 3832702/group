<template lang="html">
<div :class="$style.content">
  <ul :class="$style.list">
    <router-link tag="li" :to="{ name: 'Goods', query: { goods_id: item.goods_id } }" v-for="(item,index) in indexList" :key="index">
      <p>
        <img :src="$coverChange(item.goods_cover)" alt="">
      </p>
      <div class="">
        <h4>{{ item.goods_name }}</h4>
        <p>
          <span :class="$style.price">{{ item.goods_group_price }}</span>
          <span :class="$style.num">库存: {{ item.goods_stock }}</span>
        </p>
      </div>
    </router-link>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    indexList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.content {
  width: 100%;
  .list {
    width: 100%;
    @include list(row);
    justify-content:space-between;

    >li {
      width: 372px;
      height: 494px;
      background:#fff;
      margin-bottom: 6px;

      >p {
        width: 372px;
        height: 372px;
        img {
          width: 100%;
          height: 100%;
          object-fit:cover;
        }
      }

      >div {
        width: 100%;
        box-sizing:border-box;
        padding:0 20px;
        >h4 {
          height: 62px;
          line-height: 62px;
          @include truncation;
          font-size: 26px;
        }

        p {
          height: 52px;
          @include list(row);
          align-items:center;
          justify-content:space-between;
          font-size: 28px;
        }
      }

      .price {
        color:#e61614;
        &:before {
          content: "￥";
          font-size: 24px;
        }
      }

      .num {
        font-size: 24px;
      }
    }
  }
}

</style>
