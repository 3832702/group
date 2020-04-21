<template lang="html">
<div :class="$style.single">
  <template v-if="details.goods_id">
    <Info :details="details"></Info>
    <Participate :condition="condition" :group_id="group_id" :t="t" :details="details"></Participate>
  </template>
  <Recommend :recommendList="recommendList" v-if="recommendList.length"></Recommend>
  <ShareTips @hide-share-handler="isTips=false" v-if="isTips"></ShareTips>
</div>
</template>

<script>

import Info from "@/components/shopping/single/info"
import Participate from "@/components/shopping/single/participate"
import Recommend from "@/components/shopping/single/recommend"

import { groupShow, referralList, groupWebDown } from "@/server/index.js"
import { setShareConfig } from "@/utils/employ-jssdk.js"
import { domain } from "@/utils/util.js"
import { setShareFn } from "@/utils/share.js"

export default {
  components: {
    Info,
    Participate,
    Recommend
  },
  data() {
    return {
      details: {}, // 拼团详情
      validTimer: 86400000, // 拼团有效时间  单位：毫秒
      t: { day: 0, m: 0, s: 0 }, // 剩余时间
      timer: "", // 定时器索引
      isTips: false, // 是否提示
      recommendList: [], // 推荐列表
      condition: false
    }
  },
  computed: {
    group_id() { // 拼单Id
      return this.$route.query.group_id
    },
    fullPath() {
      return this.$route.fullPath
    }
  },
  async created() {
    setShareFn.call(this)
    await this.getGroupShow();
    this.referralList();
    this.setShareConfig();
  },
  methods: {
    /**
     * [getGroupShow 获取拼单详情]
     * @return {[type]} [description]
     */
    async getGroupShow() {
      const { group_id } = this;

      try {
        this.details = await groupShow({ group_id })
        this.setGroupDate(this.details)
      } catch(err) {
        console.log(err)
      }
    },

    /**
     * [referralList 获取推荐列表]
     * @return {[type]} [description]
     */
    async referralList() {
      let { $route: { query: { cate_id } } } = this;
      cate_id = cate_id ? cate_id : 0;
      try {
        this.recommendList = await referralList({ cate_id, page: 1 })
      }catch(err) {
        console.log(err)
      }
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
     * [setShareConfig 设置分享数据]
     */
    setShareConfig() {
      const {
        fullPath,
        details: {
          goods_name,
          goods_cover
        }
      } = this;

      if (!goods_name) {
        return;
      }

      let shareObj = {
        title: goods_name,
        link: `${domain}${fullPath}`,
        desc: '这个宝贝很不错哦，大家都在抢，赶快看看吧！',
        imgUrl: this.$coverChange(goods_cover)
      }

      setShareConfig(this.$wx, shareObj)
    },

    /**
     * [setGroupDate 截止日期]
     * @param {[Array]} timer [拼单列表]
     */
    async setGroupDate(singles) {

      let pastTime = new Date(singles.create_time.split('-').join('/')).getTime() + this.validTimer;
      let condition = this.judgeWhetherStart(pastTime);
      if (!singles.validTimer) {
        singles.validTimer = pastTime
      }

      singles.timeText = this.setDownHandler(singles.validTimer)

      this.condition = condition

      try {
        if(condition) {
          if (!singles.isStartPurchase) {
            const { group_id } = this;
              await groupWebDown(group_id)
          }
        }
      }catch(err) {
        console.log(err)
      }

      singles.isStartPurchase = condition ? 1 : 0
      this.details = singles

      this.iteratorHandler(this.details)
    },

    /**
     * [judgeWhetherStart 判断是否开始起售]
     * @return {[type]} [description]
     */
    judgeWhetherStart(time) {
      const currTime = new Date().getTime()
      return currTime > time
    },

    /**
     * [iteratorHandler 倒计时]
     * @param {[Array]} timer [拼单列表]
     * @return {[type]} [description]
     */
    iteratorHandler(singles) {
      this.timer = window.setTimeout(() => {
        this.setGroupDate(singles)
      }, 1000)
    },

    beforeDestroy() {
      window.clearTimeout(this.timer)
    },

    /**
     * [setDownHandler 设置倒计时]
     * @param {[Number]} timestamp [截止时间时间戳]
     * @return {[String]} t [当前剩余时间]
     */
    setDownHandler(timestamp) {
      let t = {};
      const d = new Date().getTime();
      const remaining = timestamp - d;
      //alert(timestamp, d)

      if (remaining < 0) {
        this.t = { day: 0, m: 0, s: 0 }
      }

      let day = Math.floor(remaining / 1000 / 60 / 60)
      let m = Math.floor(remaining / 1000 / 60 % 60)
      let s = Math.floor(remaining / 1000 % 60)

      if (day < 0 || m < 0 || s < 0) {
        this.t = {
          day: '00',
          m: '00',
          s: '00'
        }
        return;
      }

      if (day < 10) {
        day = '0' + day
      }

      if (m < 10) {
        m = '0' + m
      }

      if (s < 10) {
        s = '0' + s
      }

      t = {
        day,
        m,
        s
      }

      this.t = t
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.single {
  width: 100%;
}
</style>
