<template lang="html">
<ul :class="$style.entrance">
  <router-link :to="{ name: 'Collection' }" tag="li">
    <span>{{ countData.collect || 0 }}</span>
    <p>收藏夹</p>
  </router-link>
  <router-link :to="{ name: 'Focus' }" tag="li">
    <span>{{ countData.focus || 0  }}</span>
    <p>我的关注</p>
  </router-link>
  <router-link :to="{ name: 'Browse' }" tag="li">
    <span>{{ countData.goods_swa + countData.shop_swa || 0  }}</span>
    <p>我的浏览</p>
  </router-link>
  <router-link :to="{ name: 'BlackList' }" tag="li">
    <span>{{ countData.black || 0  }}</span>
    <p>黑名单</p>
  </router-link>
</ul>
</template>

<script>
import { countHandler } from "@/server/index.js";

export default {
  data() {
    return {
      countData: {}
    }
  },
  async created() {
    try {
      this.countData = await countHandler();

    }catch(err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.entrance {
  width: 100%;
  height: 120px;
  @include list(row);
  box-sizing:border-box;
  padding: 0 20px;

  li {
    width: 25%;
    @include list;
    align-items:center;
    justify-content:center;
    color:#fff;
    >span {
      width: 100%;
      height: 28px;
      font-size: 26px;
      text-align:center;
      margin-bottom: 10px;
    }

    p {
      height: 28px;
      line-height:normal;
      display: table;
      font-size: 26px;
      >span {
        display: table-cell;
        vertical-align: middle;
        @include multiline-truncation;
      }
    }
  }
}

</style>
