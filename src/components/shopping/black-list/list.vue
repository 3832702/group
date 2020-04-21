<template lang="html">
  <ul v-if="listData.length" :class="$style.list">
    <li v-for="(item, index) in listData" :key="index">
      <img :src="item.head_url" alt="">
      <h4>{{ item.sign }}</h4>
      <p @click="clickChange(index)">移除黑名单</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      defult() {
        return []
      }
    }
  },
  methods: {
    /**
     * [clickChange 点击按钮]
     * @param  {[String]}  type  [类型  delete]
     * @param  {[Number]}  index [当前索引]
     * @return {Promise}       [description]
     */
    async clickChange(index) {
      try {
        const res = await this.$Dialog({ message: '是否将该用户移出黑名单' });
        this[`${res}Change`](index)
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [cancelChange 自定义事件 点击了提示的取消按钮]
     * @param  {[String]}  type  [类型]
     * @param  {[Number]}  index [当前索引]
     * @return {[type]} [description]
     */
    cancelChange(type, index) {
      this.$emit('cancel-handler', { index, type })
    },

    /**
     * [confirmChange 自定义事件 点击了提示的确认按钮]
     * @param  {[String]}  type  [类型]
     * @param  {[Number]}  index [当前索引]
     * @return {[type]} [description]
     */
    confirmChange(index) {
      this.$emit('confirm-handler', { index })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

  .list {
    width: 100%;
    box-sizing:border-box;
    >li {
      width: 100%;
      height: 110px;
      box-sizing:border-box;
      padding:0 20px;
      @include list(row);
      align-items:center;
      font-size: 28px;
      justify-content:space-between;
      background:#fff;
      @include border($bg: #f5f5f5, $direction: bottom)

      &:first-child {
        border: none;
      }

      >img {
        width: 80px;
        height: 80px;
        border-radius: 6px;
        object-fit:cover;
      }

      h4 {
        width: 340px;
        margin-left: 25px;
      }

      p {
        height: 58px;
        padding:0 20px;
        box-sizing:border-box;
        @include border($bg: #dcdcdc, $width: 1px)
        @include list(row);
        align-items:center;
        justify-content:center;
        font-size: 26px;
        color:#dcdcdc;
        margin-left: auto;
        border-radius: 8px;
      }
    }
  }

  .not {
    width: 100%;
    box-sizing:border-box;
    padding-top: 80px;
    height: 100vh;
    box-sizing:border-box;
    padding-bottom:100px;
    @include list;
    align-items:center;
    justify-content:center;

    img {
      width: 100px;
      height: 100px;
      object-fit:cover;
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
