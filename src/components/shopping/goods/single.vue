<!-- <template lang="html">
  <div v-if="singles.length" :class="$style.single">
    <router-link tag="div" :to="{ name: 'SingleList', query: { goods_id } }" :class="$style.head">
      {{ details.colonel_now_count || 0 }}人在拼单，可以直接参与
      <span>查看更多</span>
    </router-link>
    <ul>
      <li v-show="item.timeText" v-for="(item, index) in singles" :key="index">
        <img :src="item.head_url" alt="">
        <div>
          <h4><span>{{ item.sign }}</span></h4>
          <template v-if="!item.isStartPurchase">
            <p v-if="item.num > 0">
              <span>还差<i>{{ item.num + (item.genre == 1 ? '人' : '件')}}</i>拼成</span>
              <span>剩余{{ item.timeText }}</span>
            </p>
            <div :class="$style.success" v-else>拼团成功</div>
            <router-link v-if="item.num > 0" :to="{ name: 'Single', query: { group_id: item.group_id, cate_id: details.cate_id } }" tag="span">去拼单</router-link>
          </template>
          <div v-else :class="$style.prepare">
            该团已过期
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    singles: {
      type: Array,
      default() {
        return []
      }
    },
    goods_id: [String, Number],
    details: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.single {
  width: 100%;
  background:#fff;
  margin-bottom:20px;

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
      height: 70px;
      line-height: 70px;
      font-size: 24px;
      @include list(row);
      align-items:center;
      position:relative;

      &:after {
        content: " ";
        @include leftArrow($width:10px, $bg: #cfcfcf);
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
          display:table;
          line-height: normal;

          >span {
            display: table-cell;
            vertical-align:middle;
          }
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
</style> -->

<template lang="html">
  <div v-if="singles.length" :class="$style.single">
    <router-link tag="div" :to="{ name: 'SingleList', query: { goods_id } }" :class="$style.head">
      {{ details.colonel_now_count }}人已开团，可以直接参与
      <span>查看更多</span>
    </router-link>
    <div :class="{[$style.list]: true, [$style.list1]: details.colonel_now_count == 1}">
      <transition name="list">
        <ul key="show" v-if="show">
          <li v-for="(item) in arrayData" :key="item.colonel_id">
            <img :src="item.head_url" alt="">
            <div>
              <h4><span>{{ item.sign }}</span></h4>
              <template v-if="!item.isStartPurchase">
                <p v-if="item.num > 0">
                  <span>还差<i>{{ item.num + (item.genre == 1 ? '人' : '件')}}</i>拼成</span>
                  <span>剩余{{ item.timeText }}</span>
                </p>
                <div :class="$style.success" v-else>拼团成功</div>
                <router-link v-if="item.num > 0" :to="{ name: 'Single', query: { group_id: item.group_id, cate_id: details.cate_id } }" tag="span">去拼单</router-link>
              </template>
              <div v-else :class="$style.prepare">
                该团已过期
              </div>
            </div>
          </li>
        </ul>
        <ul key="hide" v-else>
          <li v-for="(item) in arrayData" :key="item.colonel_id">
            <img :src="item.head_url" alt="">
            <div>
              <h4><span>{{ item.sign }}</span></h4>
              <template v-if="!item.isStartPurchase">
                <p v-if="item.num > 0">
                  <span>还差<i>{{ item.num + (item.genre == 1 ? '人' : '件')}}</i>拼成</span>
                  <span>剩余{{ item.timeText }}</span>
                </p>
                <div :class="$style.success" v-else>拼团成功</div>
                <router-link v-if="item.num > 0" :to="{ name: 'Single', query: { group_id: item.group_id, cate_id: details.cate_id } }" tag="span">去拼单</router-link>
              </template>
              <div v-else :class="$style.prepare">
                该团已过期
              </div>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singles: {
      type: Array,
      default() {
        return []
      }
    },
    goods_id: [String, Number], // 商品id
    details: { // 商品数据
      type: Object,
      default() {
        return {}
      }
    },
    nextData: { // 下一页数据
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      allData: [], // 数据
      arrayData: [], // 展示数据
      show: true, // 是否显示
      delay: 20, // 延迟时间
    }
  },
  created() {
    this.changeHandler();
  },
  methods: {
    /**
     * [circulationHandler 循环]
     * @return {[type]} [description]
     */
    circulationHandler() {
      setTimeout(() => {
        this.changeHandler();
      }, this.delay)
    },

    /**
     * [changeHandler 滚动]
     * @return {[type]} [description]
     */
    changeHandler() {
      const { show, singles } = this;

      this.delayChangle();
      this.allData = JSON.parse(JSON.stringify(singles))

      if ( !this.isCirculation() ) {
        this.arrayData = this.allData;
        this.circulationHandler();
        return;
      }

      this.show = !show;

      this.emptyNextData();

      this.circulationHandler();
    },

    /**
     * [delayChangle 更改间隔时间]
     * @return {[type]} [description]
     */
    delayChangle() {
      const { singles } = this;

      if (singles.length) {
          this.delay = 10000;
      }
    },

    /**
     * [isCirculation 判断是否循环]
     * @return {Boolean} [description]
     */
    isCirculation() {
      const { allData } = this;
      if (allData.length < 2) {
        return false;
      }
      return true;
    },

    /**
     * [emptyNextData 清空下一页数据]
     * @return {[type]} [description]
     */
    emptyNextData() {
      const { allData, nextData } = this;
      let list = allData.splice(0, 2);
      if (nextData.length) {
        this.allData = [...allData, ...nextData, ...list];
        this.$emit('empty-nextdata', {  })
      } else {
        this.allData = [...allData, ...list];
      }

      this.arrayData = list
    }
  }
}
</script>

<style lang="scss" module>

@import "@/public/css/elements.scss";

.single {
  width: 100%;
  background:#fff;
  margin-bottom:20px;

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
      height: 70px;
      line-height: 70px;
      font-size: 24px;
      @include list(row);
      align-items:center;
      position:relative;

      &:after {
        content: " ";
        @include leftArrow($width:10px, $bg: #cfcfcf);
      }
    }
  }

  .list {
    width: 100%;
    height: 224px;
    overflow:hidden;
    position:relative;
  }

  .list1 {
    height: 112px;
    overflow:hidden;
  }

  ul {
    width: 100%;
    position:absolute;
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
          display:table;
          line-height: normal;

          >span {
            display: table-cell;
            vertical-align:middle;
          }
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


<style>
.list-enter-active, .list-leave-active {
  transition: transform 3s;
}

.list-enter {
  transform: translateY(224px);
}

.list-leave-to {
  transform: translateY(-224px);
}

.v-enter-to {
  transform: translateY(0);
}

.list-leave {
  transform: translateY(0);
}

</style>
