<template lang="html">
<div :class="$style.address">
  <ul v-if="userinfo.home_name" :class="$style.list">
    <li>
      <h4>{{ userinfo.home_name ? userinfo.home_name : userinfo.nickname }} {{ userinfo.home_phone ? userinfo.home_phone : userinfo.phone }}</h4>
      <p>{{ userinfo.home_address }}</p>
      <div :class="$style.more">
        <p :class="$style.default1">
          <i :class="$style.active"></i>
          <span>默认</span>
        </p>
        <router-link tag="p" :to="{ name: 'AddAddress' }" :class="$style.edit">
          <i></i>
          <span>编辑</span>
        </router-link>
        <!--<p :class="$style.remove">
          <i></i>
          <span>删除</span>
        </p>-->
      </div>
    </li>
  </ul>
  <router-link
    :to="{ name: 'AddAddress' }"
    tag="div"
    :class="$style.btn"
    v-else
  >
    添加地址
  </router-link>
</div>
</template>

<script>
export default {
  props: {
    userinfo: {
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

.address {
  .list {
    width: 93%;
    margin:0 auto;
    padding-top:20px;
    padding-bottom:200px;
    overflow:hidden;

    li {
      width: 100%;
      background:#fff;
      border-radius:10px;
      min-height: 212px;
      box-sizing:border-box;
      padding:20px 20px 0;
      margin-bottom:20px;
      box-shadow:4px 4px 4px #c9c9c9;
      background: -webkit-linear-gradient(left top, #fff , #f1f1f1); /* Safari 5.1 - 6.0 */
      background: linear-gradient(to bottom right, #fff , #f1f1f1); /* 标准的语法 */

      h4 {
        font-size: 28px;
        color:#272727;
        line-height: 48px;
        margin-bottom:10px;
      }

      >p {
        font-size: 24px;
        line-height: 32px;
        color:#939393;
        max-height: 64px;
        margin-bottom:18px;
        line-height:normal;
        display: table;

        span {
          display: table-cell;
          vertical-align: middle;
          @include multiline-truncation;
        }
      }

      .more {
        height: 80px;
        width: 100%;
        @include border($bg: #ededed, $direction: top)
        @include list(row);
        align-items:center;
        font-size: 24px;
        justify-content:space-between;

        .default1 {
          height: 100%;
          @include list(row);
          align-items:center;
          width: 200px;

          i {
            width: 50px;
            height: 50px;
            background:url("@/assets/checked1.png") no-repeat;
            background-size: cover;
          }

          .active {
            background:url("@/assets/checked.png") no-repeat;
            background-size: cover;
          }
        }

        .edit {
          width: 120px;
          height: 100%;
          @include list(row);
          align-items:center;
          margin-left: auto;
          margin-right:20px;

          i {
              width: 30px;
              height: 30px;
              background:url('@/assets/edit.png') no-repeat;
              background-size:cover;
              margin-right: 10px;
          }
        }

        .remove {
          width: 120px;
          height: 100%;
          @include list(row);
          align-items:center;

          i {
              width: 35px;
              height: 35px;
              background:url('@/assets/remove.png') no-repeat;
              background-size:cover;
              margin-right: 10px;
          }
        }
      }
    }
  }

  .btn {
    width: 93%;
    height: 100px;
    box-sizing:border-box;
    @include border($bg: #c9c9c9)
    padding:0;
    background: -webkit-linear-gradient(left top, #fff , #f1f1f1); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to bottom right, #fff , #f1f1f1); /* 标准的语法 */
    margin:100px auto 0;
    border-radius:10px;
    font-size: 34px;
    @include list(row);
    align-items:center;
    justify-content:center;
    letter-spacing:3px;
    color:#c9c9c9;

    &:before {
      content: " ";
      width: 34px;
      height: 34px;
      background:url("@/assets/add.png") no-repeat;
      background-size:cover;
      margin-right:2px;
      margin-top:6px;
    }
  }
}
</style>
