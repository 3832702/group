<template lang="html">
<div :class="$style.hot">
  <div :class="$style.line"></div>
  <div>
    <img src="@/assets/hot1.png" alt="">
    <span>热门搜索</span>
  </div>
  <ul>
    <li @click="changeSearchHandler(index)" v-for="(item,index) in hots" :key="index"><span>{{ item.name }}</span></li>
  </ul>
</div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    hots: {
      type: Array,
      default() {
        return [
          {
            name: '水果'
          },
          {
            name: '母婴'
          },
          {
            name: '菠萝'
          },
          {
            name: '柠檬'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['CHANGESEARCHTEXT']),
    /**
     * [changeSearchHandler 点击热搜]
     * @param  {[Number]} index [索引]
     * @return {[type]}       [description]
     */
    changeSearchHandler(index) {
      const { hots } = this;
      const { name } = hots[index]
      this.CHANGESEARCHTEXT(name)
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.hot {
  width: 100%;
  max-height: 300px;
  background:#fff;
  padding-top:100px;
  margin-bottom:20px;
  overflow:hidden;
  >div {
    width: 100%;
    height: 70px;
    box-sizing:border-box;
    padding:0 20px;
    @include list(row);
    align-items:center;
    font-size: 28px;
    color:#999999;
    >img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }

    span {
      height: 28px;
      line-height: 28px;
    }
  }

  .line {
    width: 100%;
    height: 20px;
    background:#f5f5f5;
  }

  >ul {
    width: 100%;
    max-height: 210px;
    @include list(row);
    box-sizing:border-box;
    padding: 0 20px;
    overflow:hidden;

    >li {
      padding:0 20px;
      height: 46px;
      font-size: 26px;
      color:#afafaf;
      line-height:normal;
      margin:0 10px 20px;
      @include border($bg: #afafaf, $direction: all)
      border-radius:25px;
      display: table;

      span {
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
}
</style>
