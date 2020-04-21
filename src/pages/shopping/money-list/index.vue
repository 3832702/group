<template lang="html">
  <div>
  <Tab @tab-change="tabChange"></Tab>
  <FlowList :isNot="isNot" :finishedText="finishedText" :class="$style.van_list" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <ul :class="$style.list">
      <li v-for="(item,index) in listData" :key="index">
        <div>
          <p v-if="!type">{{ item.goods_name }}</p>
          <p v-else>提现</p>
          <p>{{ item.create_time }}</p>
        </div>
        <span v-if="type" :class="$style.status">
          {{ item.state ? '已处理': '待处理' }}
        </span>
        <!-- <span v-else :class="$style.status">{{ item.state ? '待入账': '已入账' }}</span> -->
        <p v-if="item.cny_into">+{{ item.cny_into }}</p>
        <p v-else>-{{ item.cny_out }}</p>
      </li>
    </ul>
  </FlowList>
  </div>
</template>

<script>
import Tab from "@/components/shopping/money-list/tab.vue"
import { billList, debounce, billOutList } from "@/server/index.js";
import { isFinished } from "@/utils/util.js"

export default {
  data() {
    return {
      type: 0,
      listData: [], // 数据
      page: 1, // 分页
      isNot: false, // 是否显示
      finishedText: '',
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
    }
  },
  components: {
    Tab
  },
  created() {
    this.loading = true;
    this.getData();
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
      this.finishedText = ''

      this.getData();
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
        this.getData();
      }
    },

    /**
     * [getData 获取数据]
     * @return {[type]} [description]
     */
    async getData() {
      const { page, type } = this;
      try {
          let listData;

          if (type) {
            listData = await billOutList({ page })
          } else {
            listData = await billList({ page })
          }

          this.listData = [...this.listData, ...listData];

          this.loading = false

          this.finished = isFinished(listData, 5)

          if (!this.listData.length) {
            this.finishedText = "暂无数据"
            this.isNot = true
          }
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
  background:#fff;
  box-sizing:border-box;
  padding-top:88px;
  li {
    width: 100%;
    height: 150px;
    @include list(row);
    align-items:center;
    box-sizing:border-box;
    padding:0 20px;
    position:relative;
    justify-content:space-around;
    &:after {
      content: " ";
      position:absolute;
      height: 2px;
      background:#f1f1f1;
      bottom:0;
      left: 20px;
      right:0;
    }

    >img {
      width: 100px;
      height: 100px;
      border-radius:4px;
    }

    >div {
      width: 440px;
      height: 100px;
      @include list;

      p {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 30px;
        @include truncation;
      }
      span {
        width: 100%;
        line-height: 50px;
        height: 50px;
        font-size: 26px;
        color:#ccc;
      }
    }

    >p {
      min-width: 100px;
      height: 100px;
      line-height: 100px;
      font-size: 36px;
      color:#fb6264;
    }

    >span {
      width: 100px;
      height: 100px;
      line-height: 100px;
      font-size: 32px;
      color:#ccc;
    }
  }
}
</style>
