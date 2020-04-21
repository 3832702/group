<template lang="html">
<div :class="$style.article">
  <FlowList :isNot="isNot" :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <ul :class="$style.list">
      <li :class="$style.item" v-for="(item, index) in listData" :key="index">
        <h5>{{ item.question }}</h5>
        <p>{{ item.answer }}</p>
      </li>
    </ul>
  </FlowList>
</div>
</template>

<script>
import { questionList, debounce } from "@/server/index.js"
import { isFinished } from "@/utils/util.js"
export default {
  data() {
    return {
      listData: [],
      page: 1, // 分页
      loading: false, //
      finished: false,
      isNot: false, // 是否显示
      finishedText: '', // 提示语
    }
  },
  created() {
    this.loading = true;
    this.getData();
  },
  methods: {
    /**
     * [getData 获取数据]
     * @return {[type]} [description]
     */
    async getData() {
      const {
        $route: {
          query: {
            id: type
          }
        },
        page
      } = this;

      try {
        let listData = await questionList({ page, type });

        this.loading = false
        this.listData = [...this.listData, ...listData];
        this.finished = isFinished(listData)

        if (!this.listData.length) {
          this.finishedText = "暂无数据"
          this.isNot = true
        }
      }catch(err) {
        console.log(err)
      }
    },

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
        this.getData();
      }
    },
  }
}
</script>

<style lang="scss" module>
.article {
  width: 100%;

  .list {
    width: 100%;
  }

  .item {
    width: 100%;
    background:#fff;
    margin-bottom: 5px;
    padding: 20px 0;
  }

  h5 {
    width: 100%;
    box-sizing:border-box;
    padding:5px 20px;
    font-size: 28px;
    line-height: 40px;
    margin-bottom: 5px;
    position:relative;
    &:before {
      content: " ";
      height: 1px;
      position:absolute;
      left: 20px;
      right:0;
      bottom:0;
      background:#f9f9f9;
    }
  }

  p {
    width: 100%;
    box-sizing:border-box;
    padding: 0 20px;
    font-size: 24px;
    line-height: 36px;
  }
}
</style>
