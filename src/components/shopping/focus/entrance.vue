<template lang="html">
  <div :class="$style.entrance">
    <!-- <div :class="$style.search">
      <span>漯河</span>
      <p>
        <input v-model="searchText" placeholder='请输入要搜索的商品'/>
        <router-link tag="span" :to="{name: 'SearchList'}">搜索</router-link>
      </p>
    </div> -->
    <ul :class="$style.list">
      <router-link
        tag="li"
        :to="{name: 'CateList', query: { cate_id: item.cate_id }}"
        v-for="(item, index) in entrans"
        :key="index"
      >
        <img :src="item.icons" alt="">
        <span>{{ item.cate_name }}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  props: {
    entrans: { // 入口数据
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      searchText: ''
    }
  },
  watch: {
    searchText(to) {
      this.CHANGESEARCHTEXT(to)
    }
  },
  created() {
    this.CHANGESEARCHTEXT('')
  },
  methods: {
    ...mapMutations(['CHANGESEARCHTEXT'])
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.entrance {
  width: 100%;
  background:#fff;
  .search {
    width: 100%;
    height: 128px;
    box-sizing:border-box;
    padding:0 30px;
    @include list(row);
    align-items:center;
    justify-content:space-between;

    >span {
      max-width: 120px;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      color:#666666;
      box-sizing:border-box;
      padding-left: 34px;
      position:relative;
      @include truncation;

      &:before {
        content: " ";
        width: 40px;
        height: 40px;
        background:url("@/assets/dh.png") no-repeat;
        background-size: cover;
        position:absolute;
        left:-6px;
        top:0;
      }
    }

    p {
      width: 566px;
      height: 66px;
      @include list(row);
      justify-content:space-between;
      align-items:center;
      position:relative;
      input {
        width: 466px;
        height: 100%;
        font-size: 26px;
        color:#000;
        border-radius:10px 0 0 10px;
        box-sizing:border-box;
        line-height: 26px;
        padding:0 80px 0 30px;
        @include border($bg: #fb6264)
        border-right:none;

        &::placeholder {
          color:#dbdbdb;
          line-height: 60px;
        }
      }

      >span {
        width: 100px;
        height: 66px;
        background:#fb6264;
        padding:0;
        border:none;
        font-size: 30px;
        color:#fff;
        border-radius: 0 10px 10px 0;
        line-height: 66px;
        text-align:center;
      }

      &:after {
        content: " ";
        width: 30px;
        height: 30px;
        background:url("@/assets/search.png") no-repeat;
        background-size: cover;
        position:absolute;
        right:116px;
        top:20px;
      }
    }
  }

  .list {
    width: 100%;
    padding-top:20px;
    @include list(row);
    height: 350px;

    li {
      width: 20%;
      height: 175px;
      @include list;
      box-sizing:border-box;
      align-items:center;
      >img {
        width: 100px;
        height: 100px;
        border-radius:50%;
      }

      span {
        width: 100%;
        height: 72px;
        line-height: 72px;
        font-size: 28px;
        text-align:center;
        color:#666666;
      }
    }
  }
}
</style>
