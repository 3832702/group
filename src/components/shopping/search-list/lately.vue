<template lang="html">
<div v-if="lately.length" :class="$style.lately">
  <div>
    <img src="@/assets/lately.png" alt="">
    <span>最近搜索</span>
  </div>
  <ul>
    <li @click="searchChange(index)" v-for="(item, index) in lately" :key="index">
      <p :class="$style.txt">
        <span>{{ item }}</span>
      </p>
      <span @click.stop="removeHandler(index)" :class="$style.remove"></span>
    </li>
  </ul>
</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['lately'])
  },
  created() {
    this.latelyHandler()
  },
  methods: {
    ...mapActions(['latelyHandler']),
    ...mapMutations(['CHANGESEARCHTEXT']),
    /**
     * [removeHandler 删除搜索记录]
     * @param  {[Number]} index [索引]
     * @return {[type]}       [description]
     */
    removeHandler(index) {
      const { lately } = this;

      let newLately = JSON.parse(JSON.stringify(lately))

      newLately.splice(index, 1)
      this.latelyHandler(newLately)
    },

    /**
     * [searchChange 搜索]
     * @param  {[Number]} index [索引]
     * @return {[type]}       [description]
     */
    searchChange(index) {
      const { lately } = this;
      this.CHANGESEARCHTEXT(lately[index])
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.lately {
  width: 100%;
  background:#fff;
  >div {
    width: 100%;
    height: 70px;
    box-sizing:border-box;
    padding:0 20px;
    @include list(row);
    align-items:center;
    font-size: 28px;
    color:#999999;

    >img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }

    span {
      height: 28px;
      line-height: 28px;
    }
  }

  >ul {
    width: 100%;
    @include list(row);
    box-sizing:border-box;
    overflow:hidden;

    >li {
      padding:0 20px;
      height: 110px;
      width: 100%;
      box-sizing:border-box;
      @include list(row);
      align-items:center;
      justify-content:space-between;
      font-size: 26px;
      color:#afafaf;
      position:relative;

      .txt {
        width: 80%;
        height:100%;
        line-height:normal;
        @include truncation;
        display: table;

        >span {
          display: table-cell;
          vertical-align: middle;
        }
      }

      .remove {
        width: 110px;
        height: 110px;
        background:url('@/assets/remove1.png') no-repeat;
        background-size: 35px 35px;
        background-position: 37px 37px;
      }

      &:before {
        content: " ";
        position:absolute;
        left: 20px;
        right:0;
        bottom:0;
        height:2px;
        background:#f2f2f2;
      }
    }
  }
}

</style>
