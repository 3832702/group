<template lang="html">
<div>
  <Head @share-handler="shareHandler" @change-black="changeBlack" @change-focus="changeFocus" :shop_id="shop_id" :skip="skip" :shopDetails="shopDetails"></Head>
  <Slider v-if="spellList.length" :banner_list="spellList"></Slider>
  <Tab :activeIndex="activeIndex" @tab-change="tabChange"></Tab>
  <FlowList :isNot="isNot" :finishedText="finishedText" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <List v-if="indexList.length" :indexList="indexList"></List>
  </FlowList>
  <ShareTips @hide-share-handler="isTips=false" v-if="isTips"></ShareTips>
</div>
</template>

<script>
import Head from "@/components/shopping/new-store/head.vue"
import Slider from "@/components/shopping/new-store/slider.vue"
import Tab from "@/components/shopping/new-store/tab.vue"
import List from "@/components/shopping/new-store/list.vue"

import { setShareConfig } from "@/utils/employ-jssdk.js"

import { shopHead, shopList, debounce, shopSwa, referralList } from "@/server/index.js"
import { isFinished, domain } from "@/utils/util.js"
import { setShareFn } from "@/utils/share.js"

import { mapMutations } from "vuex"

export default {
  components: {
    Head,
    Slider,
    Tab,
    List
  },
  data() {
    return {
      isTips: false, // 是否提示
      indexList: [],
      page: 1, // 分页
      is_more: true, // 是否可以在加载
      activeIndex: 0, // tab当前索引
      isNot: false, // 是否显示
      loading: false, // 是否处于加载状态，加载过程中不触发load事件
      finished: false, // 是否已加载完成，加载完成后不再触发load事件
      shopDetails: {}, // 店铺信息
      spellList: [], // 大家都在拼
      skip: 0, // 是否跳转
    }
  },
  computed: {
    shop_id() {
      return this.$route.query.shop_id
    },
    fullPath() {
      return this.$route.fullPath
    }
  },
  beforeRouteEnter(to, from, next) {
    const { query: { skip } } = to;
    next((vm) => {
      if (from.path === '/' && skip) {
        vm.skip = skip
        // vm.CHANGESKIP(skip)
      }
    })
  },
  async created() {
    setShareFn.call(this)
    this.loading = true
    await this.getShopDetails();
    this.getSpellList();
    this.getIndexList();
    this.shopSwa();
    this.referralList();
    this.setShareConfig();
  },
  methods: {
    ...mapMutations(['CHANGESKIP']),
    /**
     * [setShareConfig 设置分享数据]
     */
    setShareConfig() {
      const {
        fullPath,
        shopDetails: {
          sign,
          head_url
        }
      } = this;

      if (!sign) {
        return;
      }

      let shareObj = {
        title: sign,
        link: `${domain}${fullPath}`,
        desc: '大家都很喜欢这家店铺，东西好价格也实惠，你也来看看吧！',
        imgUrl: head_url
      }

      setShareConfig(this.$wx, shareObj)
    },

    /**
     * [shareHandler 点击分享]
     * @return {[type]} [description]
     */
    shareHandler() {
      this.setShareConfig();
      this.isTips = true;
    },

    /**
     * [referralList 获取推荐列表]
     * @return {[type]} [description]
     */
    async referralList() {
      // let { $route: { query: { cate_id } } } = this;
      // cate_id = cate_id ? cate_id : 0;
      try {
        this.recommendList = await referralList({ cate_id: 1, page: 1 })
        console.log('this.recommendList', this.recommendList)
      }catch(err) {
        console.log(err)
      }
    },


    /**
     * [shopSwa 访问掌柜]
     * @return {[type]} [description]
     */
    shopSwa() {
      const { shop_id } = this;

      shopSwa({ shop_id })
    },

    /**
     * [getShopDetails 获取头部信息]
     * @return {[type]} [description]
     */
    async getShopDetails() {
      const { shop_id } = this;

      try {
        this.shopDetails = await shopHead({ shop_id })
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [changeFocus 自定义事件-----更改关注状态]
     * @param  {Number} is_focus [关注状态]
     * @return {[type]}           [description]
     */
    changeFocus({ is_focus }) {
      this.shopDetails = { ...this.shopDetails, is_focus }
    },

    /**
     * [changeBlack 自定义事件-----更改拉黑状态]
     * @param  {Number} is_black [拉黑状态]
     * @return {[type]} [description]
     */
    changeBlack({ is_black }) {
      this.shopDetails = { ...this.shopDetails, is_black }
    },

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
        this.getIndexList();
      }
    },

    /**
     * [tabChange 自定义事件-----更改tab]
     * @param  {[Number]} index [要更改的索引]
     * @return {[type]}       [description]
     */
    tabChange({ index }) {
      this.activeIndex = index;
      this.indexList = [];
      this.page = 1;
      this.loading = true;
      this.finished = false;
      this.isNot = false;
      this.getIndexList();
    },

    /**
     * [getSpellList 大家都在拼]
     * @return {Promise} [description]
     */
    async getSpellList() {
      const { shop_id, page, activeIndex } = this;

      try {
        this.spellList = await shopList({ shop_id, page, type: 4 });
        // this.spellList = spellList;
        //console.log('spell', spellList)
      } catch(err) {
        console.log(err)
      }
    },

    /**
     * [getIndexList 获取首页商品列表]
     * @return {[type]} [description]
     */
    async getIndexList() {
      const { shop_id, page, activeIndex } = this;

      const type = activeIndex + 1;

      try {
        const indexList = await shopList({ shop_id, page, type });

        this.indexList = [...this.indexList, ...indexList]

        this.loading = false

        this.finished = isFinished(indexList, 5)

        if (!this.indexList.length) {
          this.finishedText = '该栏目下暂无数据'
          this.isNot = true;
        } else {
          this.finishedText = ''
        }
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" module>
</style>
