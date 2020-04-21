<template lang="html">
  <ul :class="$style.entrance">
    <li @click="jumpHandler(index)" v-for="(item, index) in routers" :key="index">
      <img v-lazy="item.ico" alt="">
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      routers: [
        {
          name: '热销榜',
          ico: require("@/assets/hot.png"),
          path: { name: "HotSales" }
        },
        {
          name: '推荐榜',
          ico: require("@/assets/brand.png"),
          path: { name: "RecommendedSales" }
        },
        {
          name: '新品',
          ico: require("@/assets/new.png"),
          path: { name: "NewSales" }
        },
        {
          name: '邀好友',
          ico: require("@/assets/invite.png"),
          path: { name: "Share" }
        },
        {
          name: '新手上路',
          ico: require("@/assets/greenhand.png"),
          path: { name: 'Greenhand' }
        }
      ]
    }
  },
  methods: {
    /**
     * [jumpHandler 跳转页面]
     * @param  {[Number]} index [索引]
     * @return {[type]}       [description]
     */
    jumpHandler(index) {
      const { routers } = this;
      const { path } = routers[index]

      if (path) {
          this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.entrance {
  width: 100%;
  height: 178px;
  background:#fff;
  box-sizing:border-box;
  padding: 29px 20px;
  @include list(row);
  align-items:center;
  justify-content:center;
  // margin-bottom:20px;
  >li {
    width: 20%;
    height: 120px;
    @include list;
    align-items: center;
    position:relative;
    img {
      width: 113px;
      height: 100%;
    }
    span {
      width: 100%;
      height: 28px;
      line-height: 28px;
      text-align:center;
      position:absolute;
      font-size: 26px;
      left:0;
      bottom:-5px;
    }
  }
}
</style>
