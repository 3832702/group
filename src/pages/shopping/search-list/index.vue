<template lang="html">
<div id="app">
  <Search @empty-handler="emptyHandler" @search-change="searchChange"></Search>
  <Hot v-if="!searchText"></Hot>
  <Lately v-if="!searchText"></Lately>
  <FlowList v-if="indexList.length" :isNot="isNot" :finishedText="finishedText" :class="$style.van_list" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <List :class="$style.list" :listData="indexList"></List>
  </FlowList>
  <div :class="$style.not" v-if="!indexList.length && finished">
    <img src="@/assets/not.png" alt="">
    <span>暂无满足条件的商品</span>
  </div>
  <FAoter></FAoter>
</div>
</template>

<script>
import Search from "@/components/shopping/search-list/input.vue"
import Hot from "@/components/shopping/search-list/hot.vue"
import Lately from "@/components/shopping/search-list/lately.vue"
import List from "@/public/common/list.vue"

import FAoter from "@/public/common/new-footer.vue"

import { homeSearch, debounce } from "@/server/index.js"
import { isFinished } from "@/utils/util.js"
import { mapState, mapActions, mapMutations } from "vuex"

export default {
  components: {
    Search,
    List,
    FAoter,
    Hot,
    Lately
  },
  data() {
    return {
      indexList: [], // 首页商品列表
      page: 1, // 分页
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      finishedText: '', // 提示语
      search: '', // 搜索值
      isNot: false, // 是否显示
    }
  },
  computed: {
    ...mapState(['area_id', 'searchText'])
  },
  destroyed() {
    this.CHANGESEARCHTEXT('')
  },
  async created() {
    try {
      await this.initDetails()
    }catch(err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions(['initDetails', 'latelyHandler']),
    ...mapMutations(['CHANGESEARCHTEXT']),
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

      let { page, indexList } = this;

      if (indexList.length) {
        this.page = page + 1;
        this.getData();
      }
    },

    /**
     * [getData 获取数据]
     * @return {[type]} [description]
     */
    async getData() {
      const { area_id, searchText: search, page } = this;

      // alert(search)

      if (!search) {
        return;
      }

      try {
        let indexList = await homeSearch({ area_id, search, page })

        //this.latelyHandler(search)

        this.indexList = [...this.indexList, ...indexList];

        this.loading = false

        if (!this.indexList.length) {
          this.finishedText = "暂无满足条件的商品"
          this.isNot = true
        }
        // alert('搜索值得数量' + this.indexList.length)
        this.finished = isFinished(indexList, 5)
      }catch(err) {
        //alert(err)
        console.log(err)
      }
    },

    /**
     * [searchChange 自定义事件-----点击搜索]
     * @return {[type]} [description]
     */
    searchChange() {
      this.emptyHandler();
      this.getData();
    },

    /**
     * [emptyHandler 清空搜索数据]
     * @return {[type]} [description]
     */
    emptyHandler() {
      this.indexList = [];
      this.page = 1;
      this.loading = true;
      this.isNot = false;
      this.finishedText = ''
      this.finished = false;
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";
.list {
  margin:0;
  box-sizing:border-box;
  padding-top:100px;
}

.not {
  width: 100%;
  box-sizing:border-box;
  padding-top: 80px;
  height: 90vh;
  padding-bottom: 100px;
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
</style>
