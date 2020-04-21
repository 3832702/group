<template lang="html">
  <div :class="$style.goods">
    <Info @share-handler="shareHandler" :details="details"></Info>
    <Single :details="details" :goods_id="goods_id" :singles="singles"></Single>
    <Details :details="details"></Details>
    <Suffix></Suffix>
    <FAoter :goods_id="goods_id" :singles="singles" :details="details" @collect-handler="collectHandler"></FAoter>
    <ShareTips @hide-share-handler="isTips=false" v-if="isTips"></ShareTips>
    <Roll v-if="rollList.length > 1" :rollList="rollList" :class="$style.roll"></Roll>
  </div>
</template>

<script>

import Info from "@/components/shopping/goods/info.vue"
import Single from "@/components/shopping/goods/single.vue"
import Details from "@/components/shopping/goods/details.vue"
import FAoter from "@/components/shopping/goods/footer.vue"
import Suffix from "@/components/shopping/goods/suffix.vue"

import Roll from "@/public/common/roll.vue"

import { judgeLogin } from "@/utils/login.js"

import {
  goodsShow,
  groupList,
  goodsSwa,
  collectControl,
  collectDelControl,
  debounce,
  groupWebDown,
  groupUserList
} from "@/server/index.js"

import { domain } from "@/utils/util.js"

import { setShareConfig } from "@/utils/employ-jssdk.js"

import { setShareFn } from "@/utils/share.js"

export default {
  data() {
    return {
      details: {}, // 商品详情
      singles: [], // 拼单列表
      validTimer: 86400000, // 拼团有效时间  单位：毫秒
      isTips: false, // 是否提示
      collectStatus: null, // 收藏状态
      timer: null, //
      rollList: [], // 滚动数据
    }
  },
  async created() {
    setShareFn.call(this)
    this.getGroupList();
    this.getGroupUserList();

    try {
      await this.getGoodsDetails();
      //this.setShareConfig();
    }catch(err) {
      console.log(err)
    }
  },

  beforeDestroy() {
    window.clearTimeout(this.timer)
  },
  computed: {
    goods_id() {
      return this.$route.query.goods_id
    },
    fullPath() {
      return this.$route.fullPath
    }
  },
  components: {
    Info,
    Single,
    Details,
    FAoter,
    Suffix,
    Roll
  },
  methods: {
    /**
     * [setShareConfig 设置分享数据]
     */
    setShareConfig() {
      const {
        fullPath,
        details: {
          goods_name,
          goods_cover,
          goods_about
        }
      } = this;

      if (!goods_name) {
        return;
      }

      let shareObj = {
        title: goods_name,
        link: `${domain}${fullPath}`,
        desc: goods_about,
        imgUrl: this.$coverChange(goods_cover)
      }

      setShareConfig(this.$wx, shareObj)
    },

    /**
     * [getGroupUserList 获取当前商品下购买人]
     * @return {[type]} [description]
     */
    async getGroupUserList() {

      try {
        const { goods_id } = this;
        let rollList = await groupUserList({ goods_id })
        let array = []
        let obj = {};

        rollList.forEach(item => {
          if (!obj[item.headimgurl]) {
            array.push(item)
            obj[item.headimgurl] = item;
          }
        })

        this.rollList = array;
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
     * [getGoodsDetails 获取商品详情]
     * @return {[type]} [description]
     */
    async getGoodsDetails() {

      try {
        let {
          genre,
          goods_id,
          goods_name,
          goods_cover,
          goods_group_num,
          goods_group_price
        } = this.details = await goodsShow({ goods_id: this.goods_id })

        await goodsSwa({ goods_id, goods_name, goods_cover: this.$coverChange(goods_cover), goods_group_price, goods_group_num, genre })
        this.setShareConfig();
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [collectHandler 自定义事件-----点击收藏]
     * @param  {[Boolean]} status [收藏状态]
     * @return {[type]}        [description]
     */
    collectHandler({ status }) {
      this.collectStatus = status;

      this.$route.matched[0].meta.is_login = true;
      judgeLogin(this.$route, this.$route, () => {
        debounce(300, this.collectControl)
      }, this)
    },

    /**
     * [collectControl 收藏]
     * @param  {[Boolean]} status [收藏状态]
     * @return {[type]}        [description]
     */
    async collectControl() {

      let {
        details: {
          goods_id,
          goods_name,
          goods_cover,
          goods_group_price,
          goods_group_num,
          genre
        },
        collectStatus: status
      } = this;


      try {

        let methods = [collectDelControl, collectControl]
        let is_collect = status ? 1 : 0;

        await methods[is_collect]({ goods_id, goods_name, goods_cover: goods_cover[0], goods_group_price, goods_group_num, genre })
        this.details = { ...this.details, is_collect };

      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [getGroupList 获取拼团列表]
     * @return {Promise} [description]
     */
    async getGroupList() {
      try {
        this.singles = await groupList({ goods_id: this.goods_id })

        // this.singles = this.singles.slice(0, 5)
        // console.log(this.singles)
        //this.setRollList(this.singles)
        this.setGroupDate(this.singles)
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [setRollList 设置滚动数据]
     * @param {[type]} data [description]
     */
    setRollList(data) {
      let rollList = [];

      data.forEach(item => {
        if (item.buy.length) {
          rollList.push(item.buy)
        }
      })

      this.rollList = rollList;
    },

    /**
     * [setGroupDate 截止日期]
     * @param {[Array]} timer [拼单列表]
     */
    setGroupDate(singles) {

      singles.forEach(async (item) => {
        let pastTime = new Date(item.create_time.split('-').join('/')).getTime() + this.validTimer;
        let condition = this.judgeWhetherStart(pastTime);

        if (!item.validTimer) {
          item.validTimer = pastTime
        }

        item.timeText = this.setDownHandler(item.validTimer)

        try {
          if(condition) {
            if (!item.isStartPurchase) {
              await groupWebDown(item.group_id)
            }
          }
        }catch(err) {
          console.log(err)
        }

        item.isStartPurchase = condition ? 1 : 0
      })

      this.singles = [...singles]
      this.iteratorHandler(this.singles)
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

    /**
     * [setDownHandler 设置倒计时]
     * @param {[Number]} timestamp [截止时间时间戳]
     * @return {[String]} t [当前剩余时间]
     */
    setDownHandler(timestamp) {
      const d = Date.now();
      const remaining = timestamp - d;

      if (remaining < 0) {
        return 0
      }

      let day = Math.floor(remaining / 1000 / 60 / 60)
      let m = Math.floor(remaining / 1000 / 60 % 60)
      let s = Math.floor(remaining / 1000 % 60)

      if (day < 0 || m < 0 || s < 0) {
        return `00:00:00`;
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
      return `${day}:${m}:${s}`;
    }
  }
}
</script>

<style lang="scss" module>

.goods {
  width: 100%;
  position:relative;
}

.roll {
  position:absolute;
  left:0;
  top:0;
  z-index: 99999;
}
</style>
