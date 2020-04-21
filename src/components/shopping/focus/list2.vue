<template lang="html">
  <ul v-if="listData.length" :class="$style.list">
    <router-link :to="{ name: 'Store', query: { shop_id: item.shop_id } }" tag="li" v-for="(item, index) in listData" :key="item.shop_id ? item.shop_id : item.colonel_id">
      <img :src="item.head_url" alt="">
      <h4>{{ item.sign }}</h4>
      <p @click.stop="clickChange(index)">取消关注</p>
    </router-link>
  </ul>
</template>

<script>

export default {
  props: {
    listData: {
      type: Object,
      default() {
        return {}
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
        const res = await this.$Dialog({ message: '是否取消关注该用户' });
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
    cancelChange(index) {
      this.$emit('cancel-handler', { index })
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
    overflow:hidden;
    >li {
      width: 100%;
      height: 110px;
      box-sizing:border-box;
      padding:0 20px;
      @include list(row);
      align-items:center;
      font-size: 32px;
      justify-content:space-between;
      background:#fff;
      @include border($bg: #f5f5f5, $direction: bottom)

      &:last-child {
        border: none;
      }

      >img {
        width: 80px;
        height: 80px;
        border-radius: 6px;
      }

      h4 {
        width: 340px;
        margin-left: 25px;
      }

      p {
        height: 58px;
        padding:0 20px;
        box-sizing:border-box;
        @include border($bg: #dcdcdc, $direction: bottom)
        @include list(row);
        align-items:center;
        justify-content:center;
        font-size: 28px;
        color:#dcdcdc;
        margin-left: auto;
        border-radius: 8px;
      }
    }
  }

</style>
