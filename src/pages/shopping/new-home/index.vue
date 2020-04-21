<template lang="html">
<div ref="hemo">
  <Head @active-change="activeChange" :entrances="entrances"></Head>
  <Entrance></Entrance>
  <Ad :activeIndex="activeIndex" :ads="ads"></Ad>
  <FlowList :isNot="isNot" :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <List :listData="listData"></List>
  </FlowList>
  <NewFooter></NewFooter>
</div>
</template>

<script>
import Head from "@/components/shopping/new-home/head.vue"
import Entrance from "@/components/shopping/new-home/entrance.vue"
import Ad from "@/components/shopping/new-home/ad.vue"
import List from "@/public/common/list.vue"

import NewFooter from "@/public/common/new-footer.vue"
import FlowList from "@/public/common/flow-list.vue"

import { cateList, indexList, debounce, homeCateList } from "@/server/index.js"
import { mapActions, mapState } from "vuex"
import { isFinished } from "@/utils/util.js"

export default {
  components: {
    Head,
    Entrance,
    Ad,
    List,
    FlowList,
    NewFooter
  },
  data() {
    return {
      entrances: [], // 分类数据
      page: 1, // 分页
      loading: false, //
      finished: false,
      isNot: false, // 是否显示
      finishedText: '', // 提示语
      activeIndex: 0, // 当前点击索引
      listData: [], // 首页数据
      ads: [require('@/assets/ad.png'), require('@/assets/ad1.png'), require('@/assets/ad2.png'), require('@/assets/ad3.png')],
    }
  },
  computed: {
    ...mapState(['area_id'])
  },
  async created() {
    try {
      this.loading = true;
      this.getEntrances()
      await this.changeAreaId();
      this.controlList()
    }catch(err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions(['changeAreaId']),

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
        this.controlList();
      }
    },

    /**
     * [getEntrances 获取分类数据]
     * @return {Promise} [description]
     */
    async getEntrances() {
      try {
        this.entrances = await cateList();
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [activeChange 自定义事件-----当tab索引改变时触发]
     * @param  {[Number]} index [当前点击的索引]
     * @return {[type]}       [description]
     */
    activeChange(index) {
      this.activeIndex = index;
      this.page = 1;
      this.listData = [];
      this.loading = true;
      this.finished = false;
      this.isNot = false;
      this.finishedText = ''
      this.controlList();
    },

    /**
     * [controlList 控制是显示全部还是分类]
     * @return {[type]} [description]
     */
    controlList() {
      const { activeIndex } = this;
      if (activeIndex) {
        this.getCateList();
      } else {
        this.getHomeList();
      }
    },

    /**
     * [getHomeList 获取全部首页列表]
     * @return {[type]} [description]
     */
    async getHomeList() {
      const { page, area_id } = this;
      try {
        const listData = await indexList({ page, area_id });
        this.loading = false
        this.listData = [...this.listData, ...listData];
        this.finished = isFinished(listData)
        //this.finishedText = "已经到底了哦~~~"

        if (!this.listData.length) {
          this.finishedText = "暂无数据"
          this.isNot = true
        }
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [getCateList 获取分类列表]
     * @return {Promise} [description]
     */
    async getCateList() {
      const { page, activeIndex, entrances } = this;

      const { cate_id, cate_name } = entrances[activeIndex - 1];

      try {
        const listData = await homeCateList({ page, cate_id })
        this.loading = false
        this.listData = [...this.listData, ...listData];
        this.finished = isFinished(listData)

        if (!this.listData.length) {
          this.finishedText = `${cate_name}栏目暂无数据`
          this.isNot = true
        }
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="css" module>
</style>
