<template lang="html">
  <div :class="$style.search">
    <p>
      <input v-model="search" placeholder='请输入要搜索的商品'/>
      <span @click="searchChange">搜索</span>
    </p>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { debounce } from "@/server/index.js"

export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState(['searchText'])
  },
  created() {
    this.search = this.searchText
  },
  watch: {
    search(to) {
      this.CHANGESEARCHTEXT(to)
      if (!to) {
        this.$emit('empty-handler', {  })
      } else {
        debounce(1000, this.searchChange)
      }
    },
    searchText(to) {
      this.search = to
    }
  },
  methods: {
    ...mapMutations(['CHANGESEARCHTEXT']),

    /**
     * [searchChange 点击搜索]
     * @return {[type]} [description]
     */
    searchChange() {
      clearTimeout(this.searchChange.timer)
      this.$emit('search-change', {  })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";
.search {
  width: 100%;
  height: 100px;
  box-sizing:border-box;
  padding:0 20px;
  @include list(row);
  align-items:center;
  justify-content:space-between;
  position:fixed;
  left:0;
  top:0;
  background:#fff;
  z-index:111;

  p {
    width: 710px;
    height: 66px;
    @include list(row);
    justify-content:space-between;
    align-items:center;
    position:relative;
    input {
      width: 610px;
      height: 100%;
      font-size: 26px;
      color:#000;
      border-radius:10px 0 0 10px;
      box-sizing:border-box;
      line-height: 26px;
      padding:0 80px 0 30px;
      @include border($bg: #e51717, $direction: all)
      border-right:none;

      &::placeholder {
        color:#dbdbdb;
        line-height: 26px;
      }
    }

    >span {
      width: 100px;
      height: 66px;
      background:#e51717;
      padding:0;
      border:none;
      font-size: 30px;
      color:#fff;
      border-radius: 0 10px 10px 0;
      line-height: 66px;
      text-align:center;
    }

    &:after {
      content: " ";
      width: 30px;
      height: 30px;
      background:url("@/assets/search.png") no-repeat;
      background-size: cover;
      position:absolute;
      right:116px;
      top:20px;
    }
  }
}
</style>
