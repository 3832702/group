<template lang="html">
<div class="">
  <div class="info">
    <img src="http://img.redocn.com/sheying/20150213/mulanweichangcaoyuanfengjing_3951976.jpg" alt="">
    <div class="goods">
      <p>
        <span>8.88</span>
        <span></span>
        <span>已拼1件</span>
      </p>
      <h4>
        <span class="title">商品名称</span>
        <p v-if="true" :class="['ico', 'person']">
          <span>拼人团</span>
        </p>
        <p v-else :class="['ico', 'goods']">
          <span>拼货团</span>
        </p>
      </h4>


      <div class="more">
        全场包邮 · 同城配送 · 6小时到家
      </div>
    </div>
    <div @click="shareHandler" class="share"></div>
  </div>

  <div v-if="true" class="single">
    <router-link tag="div" class="head">
      3人已开团，可以直接参与
      <span>查看更多</span>
    </router-link>
    <div class="list">
      <transition name="list">
        <ul key="show" v-if="true">
          <li v-for="(item) in 3">
            <img src="http://img.redocn.com/sheying/20150213/mulanweichangcaoyuanfengjing_3951976.jpg" alt="">
            <div>
              <h4><span>团长名称</span></h4>
              <template v-if="true">
                <p v-if="true">
                  <span>还差<i>3件</i>拼成</span>
                  <span>剩余24:00:00</span>
                </p>
                <div class="success" v-else>拼团成功</div>
                <span v-if="true">去拼单</span>
              </template>
              <div v-else class="prepare">
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
                <div class="success" v-else>拼团成功</div>
                <router-link v-if="item.num > 0" :to="{ name: 'Single', query: { group_id: item.group_id, cate_id: details.cate_id } }" tag="span">去拼单</router-link>
              </template>
              <div v-else class="prepare">
                该团已过期
              </div>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </div>

  <div class="content">
    <div class="store">
      <img src="http://img.redocn.com/sheying/20150213/mulanweichangcaoyuanfengjing_3951976.jpg" alt="">
      <div class="store_c">
        <h4>小小朗沙</h4>
        <p>
          <span>商品数量: 10</span>
          <span>已拼: 20件</span>
        </p>
      </div>
      <p class="store_r"><span>进店逛逛</span></p>
    </div>
    <div class="details">
      <div class="head">
        商品详情页
      </div>
      <p>这里是商品详情描述</p>
      <img v-for="(item, index) in 4" :key="index" src="http://img.redocn.com/sheying/20150213/mulanweichangcaoyuanfengjing_3951976.jpg" alt="">
    </div>
  </div>

</div>

</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "@/public/css/elements.scss";

.info {
  width: 100%;
  background:#fff;
  margin-bottom: 20px;
  position:relative;

  >img {
    width: 100%;
    height: 750px;
  }

  .share {
    width: 60px;
    height: 60px;
    position:absolute;
    right: 40px;
    top: 20px;
    // background:url('@/assets/share2.png') no-repeat;
    background-size: cover;
    z-index: 9999999999999;
  }

  .goods {
    width: 100%;
    overflow:hidden;

    >p {
      width: 100%;
      box-sizing:border-box;
      height: 90px;
      padding:0 26px;
      align-items:center;
      @include list(row);
      span {
        &:nth-of-type(1) {
          font-size: 36px;
          color:#e14549;
          height: 36px;
          margin-right: 20px;
          font-weight:500;

          &:before {
            content: "￥";
            font-size: 26px;
          }
        }
        &:nth-of-type(2) {
          font-size: 26px;
          color:#999999;
          text-decoration:line-through;
        }
        &:nth-of-type(3) {
          font-size: 26px;
          color:#999999;
          margin-left: auto;
        }
      }
    }

    >h4 {
      width: 100%;
      box-sizing:border-box;
      padding:0 26px;
      max-height: 88px;
      font-size: 30px;
      margin-bottom:15px;
      color:#000;
      line-height:normal;
      display: table;
      position:relative;

      .title {
        display: table-cell;
        vertical-align: middle;
        @include multiline-truncation;
        line-height: 44px;
        text-indent: 87px;
      }

      .ico {
        position:absolute;
        left:20px;
        top:5px;
        width: 82px;
        height: 26px;
        background:#32c873;
        display:table;
        text-align:center;
        line-height:normal;
        border-radius:4px;
        >span {
          display:table-cell;
          vertical-align:middle;
          font-size: 22px;
          color:#fff;
        }
      }

      .goods {
        background:#e51815;
      }
    }

    .more {
      width: 100%;
      height: 70px;
      @include border($bg: #ccc, $direction: top)
      font-size: 26px;
      color:#999999;
      @include list(row);
      align-items:center;
      box-sizing:border-box;
      justify-content:space-between;;
      padding:0 26px;
      color:#e51815;
      background:#fcfcfc;
    }
  }
}


.content {
  width: 100%;

  .store {
    width: 100%;
    height: 102px;
    background:#fff;
    box-sizing:border-box;
    padding:0 26px;
    @include list(row);
    align-items:center;
    justify-content:space-between;
    margin-bottom:20px;

    >img {
      width: 66px;
      height: 66px;
    }

    .store_c {
      width: 64%;
      height: 100%;
      box-sizing:border-box;
      padding-top:14px;

      h4 {
        width: 100%;
        height: 38px;
        line-height: 38px;
        font-size: 30px;
      }

      p {
        width: 100%;
        height: 32px;
        @include list(row);
        align-items:center;
        font-size: 24px;
        color:#808080;

        span {
          margin-right: 15px;
        }
      }
    }

    .store_r {
      width: 130px;
      height: 54px;
      border-radius:4px;
      @include border($bg: #7e7e7e, $direction: all)
      font-size: 26px;
      display: table;
      line-height:normal;

      >span {
        display: table-cell;
        vertical-align: middle;
        text-align:center;
      }
    }
  }

  .details {
    width: 100%;
    background:#fff;
    box-sizing:border-box;
    padding:20px 26px;
    @include list;

    .head {
      width: 100%;
      height: 78px;
      font-size: 32px;
      text-align:center;
      line-height: 78px;
      font-weight:bold;
      margin-bottom:20px;
    }

    >p {
      width: 100%;
      line-height: 48px;
      font-size: 26px;
      text-indent: 52px;
      margin-bottom:20px;
    }

    >img {
      width: 100%;
    }
  }
}

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
