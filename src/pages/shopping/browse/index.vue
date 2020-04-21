<template lang="html">
<div :class="$style.browse">
  <Tab @tab-change="tabChange"></Tab>
  <FlowList :isNot="isNot" :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <List :index="type" :listData="listData"></List>
  </FlowList>
</div>
</template>

<script>
import Tab from "@/components/shopping/browse/tab.vue"
import List from "@/components/shopping/browse/list.vue"

import { goodsSwaList, debounce, shopSwaList } from "@/server/index.js"
import { isFinished } from "@/utils/util.js"
export default {
  components: {
    Tab,
    List
  },
  data() {
    return {
      listData: [], // 数据
      page: 1, // 分页
      isNot: false, // 是否显示
      finishedText: '',
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      type: 0
    }
  },

  created() {
    this.loading = true;
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
      try {
        const { page, type } = this;
        let list = [];
        if (type) {
          list = await shopSwaList({ page })
        } else {
          list = await goodsSwaList({ page })
        }

        this.listData = [...this.listData, ...list]
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
     * [tabChange 自定义事件-----切换tab]
     * @param  {[Number]} type [当前索引]
     * @return {[type]}      [description]
     */
    tabChange({ type }) {
      this.type = type;
      this.page = 1;
      this.listData = [];
      this.loading = true;
      this.finished = false;
      this.isNot = false
      this.finishedText = ""

      this.getList();
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.browse {
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
