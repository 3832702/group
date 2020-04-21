<template lang="html">
  <div id="app">
    <Tab @tab-change="tabChange"></Tab>
    <FlowList :class="$style.list" :isNot="isNot" :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
      <List @confirm-handler="confirmHandler" :listData="listData"></List>
    </FlowList>
  </div>
</template>

<script>
import List from "@/components/shopping/black-list/list.vue"
import Tab from "@/components/shopping/black-list/tab.vue"
import { blackList, blackDelControl, debounce } from "@/server/index.js"

import { isFinished } from "@/utils/util.js"

export default {
  components: {
    Tab,
    List
  },
  data() {
    return {
      type: 0,
      page: 1, // 分页
      isNot: false, // 是否显示
      finishedText: '',
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      controlIndex: 0, // 当前操作的索引
      listData: [], //
    }
  },
  created() {
    this.loading = true;
    this.getList();
  },
  methods: {

    /**
     * [tabChange 自定义事件-----更改tab]
     * @param  {[Number]} index [要更改的索引]
     * @return {[type]}       [description]
     */
    tabChange({ type }) {
      this.type = type;
      this.listData = [];
      this.page = 1;
      this.loading = true;
      this.finished = false;

      this.getList();
    },

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
        let list;
        if (type) {
          list = await blackList({ page, type: 2 })
        } else {
          list = await blackList({ page, type: 1 })
        }

        this.listData = [...this.listData, ...list];
        this.loading = false

        this.finished = isFinished(list, 5)

        if (!this.listData.length) {
          this.finishedText = "暂无数据"
          this.isNot = true
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [confirmHandler 确定取消黑名单]
     * @param  {[Number]} index [当前索引]
     * @return {[type]}       [description]
     */
    confirmHandler({ index }) {
      this.controlIndex = index;
      debounce(300, this.blackDelControl)
    },

    /**
     * [blackDelControl 取消黑名单]
     * @return {Promise} [description]
     */
    async blackDelControl() {
      const { controlIndex, listData, type } = this;
      const { shop_id, colonel_id } = listData[controlIndex]

      try {
        if (type) {
          await blackDelControl({ value:colonel_id, type: 2 })
        } else {
          await blackDelControl({ value:shop_id, type: 1 })
        }

        this.listData.splice(controlIndex, 1)
      }catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" module>
.list {
  padding-top: 98px;
}
</style>
