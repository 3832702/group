<template lang="html">
  <div
    v-if="listData.length"
    :class="$style.listWrap"
  >
    <ul
      v-if="!index"
      :class="$style.goods"
      key="goods"
    >
      <router-link
        tag="li"
        :to="{ name: 'Goods', query: { goods_id: item.goods_id } }"
        v-for="(item, index1) in listData"
        :key="index1"
      >
        <img :src="$coverChange(item.goods_cover)" alt="">
        <div>
          <span>{{ item.goods_group_price }}</span>
          <p>...</p>
        </div>
      </router-link>
    </ul>
    <ul v-else :class="$style.list">
      <router-link
        tag="li"
        :to="{ name: 'Store', query: { shop_id: item.shop_id } }"
        v-for="(item, index2) in listData"
        :key="index2"
      >
        <img :src="item.head_url" alt="">
        <h4>{{ item.sign }}</h4>
        <p></p>
      </router-link>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.listWrap {
  width: 100%;
  overflow:hidden;
  box-sizing:border-box;
  padding-top:88px;
}

.goods {
  width: 100%;
  @include list(row);
  >li {
    width: 245px;
    margin-bottom:6px;

    &:nth-of-type(3n+1) {
      margin-right: 6px;
    }

    &:nth-of-type(3n+2) {
      margin-right: 6px;
    }

    img {
      width: 245px;
      height: 245px;
      object-fit:cover;
    }

    div {
      width: 100%;
      height: 100px;
      line-height:100px;
      box-sizing:border-box;
      padding:0 20px;
      background:#fff;
      @include list(row);
      align-items:center;
      justify-content:space-between;
      span {
        height: 50px;
        line-height: 50px;
        font-size: 32px;
        color:#fb6264;

        &:before {
          content: "￥";
          height: 50px;
          line-height: 50px;
          font-size: 28px;
          color:#fb6264;
        }
      }

      p {
        height: 50px;
        line-height: 40px;
        font-size: 32px;
      }
    }
  }
}

.list {
width: 100%;
>li {
  width: 100%;
  height: 110px;
  box-sizing:border-box;
  padding:0 20px;
  @include list(row);
  align-items:center;
  font-size: 28px;
  justify-content:space-between;
  background:#fff;
  @include border($bg: #f5f5f5, $direction: bottom)

  &:first-child {
    border: none;
  }

  >img {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    object-fit:cover;
  }

  h4 {
    width: 340px;
    margin-left: 25px;
  }

  p {
    height: 58px;
    padding:0 20px;
    box-sizing:border-box;
    @include list(row);
    align-items:center;
    justify-content:center;
    font-size: 26px;
    color:#dcdcdc;
    margin-left: auto;
    border-radius: 8px;
  }
}
}
</style>
