<template lang="html">
<div :class="$style.list">
  <div>问题类型</div>
  <ul>
    <router-link :to="{ name: 'GreenhandArticle', query: { id: item.question_id } }" tag="li" v-for="(item, index) in listData" :key="index">
      <p>{{ item.question_cate }}</p>
      <span></span>
    </router-link>
  </ul>
</div>
</template>

<script>

import { questionList } from "@/server/index.js"
export default {
  data() {
    return {
      listData: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    /**
     * [getData 获取数据]
     * @return {[type]} [description]
     */
    async getData() {
      try {
        this.listData = await questionList();
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.list {
  width: 100%;

  >div {
    width: 100%;
    height: 72px;
    line-height: 72px;
    box-sizing:border-box;
    padding:0 30px;
    font-size: 28px;
  }

  >ul {
    width: 100%;
    background:#fff;
    >li {
      width: 100%;
      height: 92px;
      @include list(row);
      box-sizing:border-box;
      padding:0 30px;
      align-items:center;
      justify-content:space-between;
      position:relative;

      &:after {
        content: " ";
        height: 1px;
        background:#c8c8ca;
        position:absolute;
        left: 30px;
        right: 30px;
        bottom: 0;
      }

      &:last-child {
        &:after {
          content: " ";
          background:transparent;
        }
      }

      >img {
        width: 70px;
        height: 70px;
      }

      p {
        width: 570px;
        font-size: 32px;
      }

      span {
        @include leftArrow($width:14px, $bg: #c8c8ca,$rotate:rotate(-45deg));
      }
    }
  }
}
</style>
