<template lang="html">
<div :class="$style.hot">
  <FlowList :isNot="isNot"  :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <List :listData="listData">
      <template #default="{ index }">
        <img v-if="index === 0" :class="$style.imgwrap" src="@/assets/top1.png" alt="">
        <img v-if="index === 1" :class="$style.imgwrap" src="@/assets/top2.png" alt="">
        <img v-if="index === 2" :class="$style.imgwrap" src="@/assets/top3.png" alt="">
      </template>
    </List>
  </FlowList>
</div>
</template>

<script>

import { isFinished } from "@/utils/util.js"
import { homeGoodsList, debounce } from "@/server/index.js"

import List from "@/public/common/list.vue"

export default {
  components: {
    List
  },
  data() {
    return {
      loading: false, //
      finished: false,
      isNot: false, // 是否显示
      finishedText: '', // 提示语
      page: 1, // 分页
      listData: [], // 数据
      type: 2, // 1=>推荐列表,2=>销量列表,3=>最新商品列表
    }
  },
  created() {
    this.loading = true;
    this.getList();
  },
  methods: {
    /**
     * [loadListChange 自定义事件-----加载中]
     * @return {Promise} [description]
     */
    async loadListChange() {
      const { loading } = this;

      if (!loading) {
          debounce(1000, this.controlHandler)
      }
    },

    /**
     * [controlHandler 加载更多]
     * @return {[type]} [description]
     */
    controlHandler() {
      let { page, listData } = this;

      if (listData.length) {
        this.page = page + 1;
        this.getList();
      }
    },
    /**
     * [getHomeList 获取全部首页列表]
     * @return {[type]} [description]
     */
    async getList() {
      const { page, type } = this;
      try {
        const listData = await homeGoodsList({ page, type });

        this.loading = false
        this.listData = [...this.listData, ...listData];
        this.finished = isFinished(listData)

        if (!this.listData.length) {
          this.finishedText = '该栏目下暂无数据'
          this.isNot = true;
        } else {
          this.finishedText = ''
        }
      }catch(err) {
        console.log(err)
      }
    },
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.imgwrap {
  width: 40px;
  height: 53px;
  position:absolute;
  left:20px;
  top:0;
}
</style>
