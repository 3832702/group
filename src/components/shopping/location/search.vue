<template lang="html">
<div :class="$style.search">
  <div v-if="isWrite" class="">
    <dl>
      <dt @click="changeCurrCity">
        <span>{{ city }}</span>
      </dt>
    </dl>
    <p @click="clickWrite">搜索地点</p>
    <span @click="submitChange">确定</span>
  </div>
  <label v-else>
    <input ref="myInput" type="text" v-model="keyword" key="input1">
    <span @click="isWrite = true">取消</span>
  </label>
</div>
</template>

<script>
export default {
  props: {
    isParentWrite: { // 父级点击状态
      type: Boolean,
      default: true
    },
    city: { // 选择城市
      type: String,
      default: ""
    },
    isRange: { // 是否在已开通城市列表内
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isWrite: true, // 是否不可以写入
      keyword: '', // 要搜索的地址
    }
  },
  watch: {
    //每次变化，input获取焦点
    isWrite(to, from){
      this.writeChange(to);
      if(from == true){
        this.$nextTick(function() {
          this.keyword = ""
          this.$refs.myInput.focus()
        })
      }
    },
    keyword(to) {
      this.$emit('keyword-change', { keyword: to })
    },
    isParentWrite(to) {
      if (to && !this.isWrite) {
        this.isWrite = true
      }
    }
  },
  methods: {
    /**
     * [writeChange 自定义事件  输入状态发生改变]
     * @return {[type]} [description]
     */
    writeChange(isWrite) {
      this.$emit('write-change', { isWrite })
    },

    /**
     * [clickWrite 点击搜索框]
     * @return {[type]} [description]
     */
    clickWrite() {
      if (!this.isRange) {
        this.$emit('range-block-change', { isRangeBlock: false })
        return;
      }
      this.isWrite = false;
    },

    /**
     * [submitChange 自定义事件  点击确定按钮]
     * @return {[type]} [description]
     */
    submitChange() {
      if (!this.isRange) {
        this.$emit('range-block-change', { isRangeBlock: false })
        return;
      }
      this.$emit('submit-change')
    },

    /**
     * [changeCurrCity 显示切换城市列表]
     * @return {[type]} [description]
     */
    changeCurrCity() {
      this.$emit('change-currcity', { isSearchCity: true })
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.search {
  width: 100%;
  height: 88px;
  background:#efeff4;
  box-sizing:border-box;
  border-bottom:1px solid #d6d7dc;
  @include list(row);
  align-items:center;
  justify-content:center;
  >div {
    width: 718px;
    height: 56px;
    font-size: 26px;
    color:#ccc;
    @include list(row);
    justify-content:space-between;

    >dl {
      width: 120px;
      height: 100%;
      @include list(row);
      align-items:center;
      position:relative;
      z-index: 11111;
      overflow:hidden;
      >dt {
        width: 100%;
        font-size: 26px;
        color:#373737;
        @include list(row);
        align-items:center;
        height: 100%;

        span {
          width: 90px;
          height: 100%;
          line-height: 56px;
          @include truncation;
        }

        &:after {
          content: " ";
          @include leftArrow($width:12px, $bg: #373737,$rotate:rotate(45deg));
          margin-top: -6px;
        }
      }

      dd {
        width: 120px;
        height: 56px;
        background:#fff;
        text-align:center;
        line-height: 56px;
      }
    }

    >p {
      width: 420px;
      height: 100%;
      border:1px solid #d6d7dc;
      border-radius:10px;
      background:#fff;
      text-align:center;
      line-height: 56px;
      box-sizing:border-box;
      @include list(row);
      align-items:center;
      justify-content:center;
    }

    >span {
      padding:0 30px;
      height: 56px;
      line-height: 56px;
      background:#09bb07;
      color:#fff;
      border-radius:10px;
      font-size: 28px;
    }
  }

  label {
    width: 718px;
    height: 56px;
    @include list(row);
    align-items:center;
    justify-content:space-between;

    input {
      width: 600px;
      padding: 15px 20px;
      font-size: 26px;
      border:1px solid #d6d7dc;
      border-radius:10px;
      box-sizing:border-box;
    }

    span {
      width: 100px;
      height: 56px;
      font-size: 30px;
      text-align:center;
      line-height: 56px;
      color:#16a21f;
    }
  }
}
</style>
