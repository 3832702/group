<template lang="html">
  <van-tabs :class="$style.tabs" :swipe-threshold="5.2" v-model="active">
    <van-tab  color="transparent" title="精选"></van-tab>
    <template v-if="!entrances.length">
      <van-tab color="transparent" v-for="(item, index) in fillEntrances" :key="index" :title="item.cate_name"></van-tab>
    </template>
    <template v-else>
      <van-tab color="transparent" v-for="(item, index) in entrances" :key="index" :title="item.cate_name"></van-tab>
    </template>
  </van-tabs>
</template>

<script>
export default {
  props: {
    entrances: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      active: 0,
      fillEntrances: [
        {
          cate_id: 1,
          cate_name: '母婴'
        },
        {
          cate_id: 2,
          cate_name: '美妆'
        },
        {
          cate_id: 3,
          cate_name: '水果'
        },
        {
          cate_id: 4,
          cate_name: '服装'
        },
        {
          cate_id: 5,
          cate_name: '酒水'
        },
        {
          cate_id: 6,
          cate_name: '教育'
        }
      ]
    }
  },
  watch: {
    active(to) {
      this.$emit('active-change', to)
    }
  }
}
</script>

<style lang="scss" module>
.tabs {
  width: 94.6%;
  margin:0 auto;
}
</style>
