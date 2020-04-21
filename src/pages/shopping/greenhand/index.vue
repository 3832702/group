<template lang="html">
<div id="white">
  <Head></Head>
  <Issue :listData="listData" @display-handler="displayHandler"></Issue>
  <List :classifyData="classifyData"></List>
  <!-- <Strategy></Strategy> -->
  <transition name="fade">
    <Answer @hide-handler="hideHandler" :displayData="displayData" v-if="isHide"></Answer>
  </transition>
</div>
</template>

<script>
import Head from "@/components/shopping/greenhand/head.vue"
import Issue from "@/components/shopping/greenhand/issue.vue"
// import Strategy from "@/components/shopping/greenhand/strategy.vue"
import Answer from "@/components/shopping/greenhand/answer.vue"
import List from "@/components/shopping/greenhand/list.vue"

import { questionList, questionIndexList } from "@/server/index.js"

export default {
  components: {
    Head,
    Issue,
    // Strategy,
    Answer,
    List
  },
  data() {
    return {
      isHide: false,
      displayData: {},
      listData: [], // 数据
      classifyData: [], // 问题类型
    }
  },
  created() {
    this.getData()
    this.getclassifyData();
  },
  methods: {
    /**
     * [displayHandler 自定义事件-----显示弹窗]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    displayHandler({ data }) {
      this.isHide = true;
      this.displayData = data;
      console.log(data)
    },

    /**
     * [hideHandler 自定义事件-----关闭弹窗]
     * @return {[type]} [description]
     */
    hideHandler() {
      this.isHide = false;
    },

    /**
     * [getData 获取新手上路数据]
     * @return {[type]} [description]
     */
    async getData() {
      try {
        this.listData = await questionIndexList();
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [getData 获取问题列表]
     * @return {[type]} [description]
     */
    async getclassifyData() {
      try {
        this.classifyData = await questionList();
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
  #white {
    min-height: 100vh;
    width: 100%;
    background:#fff;
  }

.fade-enter-active, .fade-leave-active {
  transition: .3s;
}
.fade-enter, .fade-leave-to  {
  transform: translateY(100vh);
}
</style>
