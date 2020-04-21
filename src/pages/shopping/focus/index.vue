<template lang="html">
  <div>
    <Tab @tab-change="tabChange"></Tab>
    <FlowList :class="$style.list" :isNot="isNot" :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
      <List @confirm-handler="confirmHandler" :listData="listData"></List>
    </FlowList>
  </div>
</template>

<script>
import Tab from "@/components/shopping/focus/tab.vue"
import List from "@/components/shopping/focus/list2.vue"

import { focusList, debounce, focusControl } from "@/server/index.js"
import { isFinished } from "@/utils/util.js"

export default {
  components: {
    Tab,
    List
  },
  data() {
    return {
      type: 1, // 当前tab索引
      listData: [], // 数据
      page: 1, // 分页
      isNot: false, // 是否显示
      finishedText: '',
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      controlIndex: 0, // 当前操作
    }
  },
  created() {
    this.loading = true
    this.getList();
  },

  methods: {

    /**
     * [loadListChange 加载更多]
     * @return {Promise} [description]
     */
    async loadListChange() {
      const { loading } = this;

      if (!loading) {
        debounce(900, this.controlHandler)
      }
    },

    /**
     * [controlHandler 回调]
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
     * [getList 获取数据]
     * @return {[type]} [description]
     */
    async getList() {
      const { page, type } = this;
      try {
        const listData = await focusList({ page, type })
        this.listData = [...this.listData, ...listData];

        this.loading = false

        this.finished = isFinished(listData, 5)

        if (!this.listData.length) {
          this.finishedText = "你还没有关注任何人"
          this.isNot = true
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [confirmHandler 确定删除]
     * @param  {[Number]} index [要删除的索引]
     * @return {[type]}       [description]
     */
    async confirmHandler({ index }) {
      this.controlIndex = index;
      debounce(300, this.focusControl)
    },

    /**
     * [focusControl 取消关注]
     * @return {[type]}       [description]
     */
    async focusControl() {
      const { controlIndex, listData, type } = this;
      const { shop_id, colonel_id } = listData[controlIndex]
      try {
        if (type === 1) {
          await focusControl({ type: 3, value: shop_id })
        }else {
          await focusControl({ type: 3, value: colonel_id })
        }
        this.listData.splice(controlIndex, 1)
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [tabChange 自定义事件-----点击tab]
     * @param  {[Number]} type [当前点击索引]
     * @return {[type]}      [description]
     */
    tabChange({ type }) {
      this.type = type;
      this.page = 1;
      this.listData = [];
      this.loading = true;
      this.finished = false;
      this.finishedText = ""
      this.isNot = false
      this.getList();
    }
  }
}
</script>
<style lang="scss" module>
@import "@/public/css/elements.scss";
.not {
  width: 100%;
  box-sizing:border-box;
  padding-top: 80px;
  height: 100vh;
  padding-bottom:100px;
  @include list;
  align-items:center;
  justify-content:center;

  img {
    width: 100px;
    height: 100px;
  }

  span {
    width: 100%;
    height: 90px;
    line-height: 90px;
    font-size: 28px;
    color:#bcbcbc;
    text-align:center;
  }
}

.list {
  padding-top: 98px;
}
</style>
