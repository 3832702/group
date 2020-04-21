<template lang="html">
  <FlowList :isNot="isNot" :finishedText="finishedText" :class="$style.single" :loading="loading" :finished="finished" @load-list-change="loadListChange">
    <ul>
      <li v-show="item.timeText" v-for="(item, index) in singles" :key="index">
        <img :src="item.head_url" alt="">
          <div>
            <h4>{{ item.sign }}</h4>
            <template v-if="!item.isStartPurchase">
              <p v-if="item.num > 0">
                <span>还差<i>{{ item.num + (item.genre == 1 ? '人' : '件') }}</i>拼成</span>
                <span>剩余{{ item.timeText }}</span>
              </p>
              <div :class="$style.success" v-else>拼团成功</div>
              <router-link v-if="item.num > 0" :to="{ name: 'Single', query: { group_id: item.group_id } }" tag="span">去拼单</router-link>
            </template>
            <div v-else :class="$style.prepare">
              {{ item.timeText }}秒后可拼单
            </div>
          </div>
      </li>
    </ul>
  </FlowList>
</template>

<script>

import { groupList, debounce, groupWebDown } from "@/server/index.js"

import { isFinished } from "@/utils/util.js"
export default {
  data() {
    return {
      singles: [], // 拼单列表
      validTimer: 86400000, // 拼团有效时间  单位：毫秒
      timer: null, //
      page: 1, // 分页
      loading: false, //
      finished: false,
      isNot: false, // 是否显示
      finishedText: '',
      first_load: true, //第一次加载
      is_more: true, // 是否可以在加载
    }
  },
  computed: {
    goods_id() {
      return this.$route.query.goods_id
    }
  },
  created() {
    this.loading = true;
    this.getGroupList();
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

      let { page, singles } = this;

      if (singles.length) {
        this.page = page + 1;
        this.getGroupList();
      }
    },

    /**
     * [getGroupList 获取拼团列表]
     * @return {Promise} [description]
     */
    async getGroupList() {

      const { page, goods_id } = this;

      try {
        const singles = await groupList({ goods_id, page })

        this.singles = [...this.singles, ...singles]

        this.loading = false

        this.finished = isFinished(singles, 5)

        if (!this.singles.length) {
          this.finishedText = "暂无数据"
          this.isNot = true
        }

        window.clearTimeout(this.timer);
        this.setGroupDate(this.singles)
      }catch(err) {
        console.log(err)
      }
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
      this.iteratorHandler(singles)
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

@import "@/public/css/elements.scss";

.single {
  width: 100%;
  background:#fff;

  .head {
    width: 100%;
    height: 70px;
    box-sizing:border-box;
    padding:0 26px;
    @include border($bg: #f4f4f4, $direction: bottom)
    font-size: 26px;
    @include list(row);
    align-items:center;
    justify-content:space-between;

    span {
      color:#9a9a9a;
      font-size: 24px;
      @include list(row);
      align-items:center;
      &:after {
        content: " ";
        @include leftArrow($width:10px, $bg: #cfcfcf)
      }
    }
  }

  ul {
    width: 100%;

    li {
      width: 100%;
      box-sizing:border-box;
      padding:0 26px;
      height: 112px;
      @include list(row);
      align-items:center;
      justify-content:space-between;
      @include border($bg: #f4f4f4, $direction: bottom)

      &:last-child {
        border:none;
      }

      >img {
        width: 80px;
        height: 80px;
        border-radius:50%;
      }

      >div {
        width: 78%;
        height: 100%;
        @include list(row);
        justify-content:space-between;
        align-items:center;

        h4 {
          width: 33%;
          @include truncation;
          font-size: 28px;
          color:#000000;
        }

        .success {
          width: 33%;
          overflow:hidden;
          @include list(row);
          text-align:right;
          font-size: 32px;
          align-items: center;
          color:#dd3b30;
        }

        .prepare {
          width: 64%;
          height: 100%;
          @include list(row);
          font-size: 30px;
          align-items: center;
          justify-content:flex-end;
          color:#dd3b30;
          overflow:hidden;
        }

        p {
          width: 33%;
          overflow:hidden;
          @include list;

          span {
            width: 100%;
            text-align:right;
            font-size: 24px;
            &:first-child {
              height: 34px;
              margin-bottom: 2px;
              line-height: 34px;
              color:#4d4d4d;

              i {
                color:#dc3c2e;
              }
            }

            &:last-child {
              height: 40px;
              line-height: 40px;
              color:#808080;
            }
          }
        }

        >span {
          width: 150px;
          height: 66px;
          text-align:center;
          line-height: 66px;
          font-size: 28px;
          color:#fff;
          background:#dd3b30;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
