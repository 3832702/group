<template lang="html">
  <div class="roll">
    <ul v-if="is_roll">
      <transition mode="out-in" duration="{ enter: 100, leave: 2000 }" name="fade">
        <li key="1" v-if="show">
          <img :src="rollData[0].headimgurl" alt="">
          <p>{{ rollData[0].home_name?rollData[0].home_name: '' }}已参团</p>
        </li>
        <li key="2" v-else>
          <img :src="rollData[1].headimgurl" alt="">
          <p>{{ rollData[1].home_name?rollData[1].home_name: '' }}已参团</p>
        </li>
      </transition>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    rollList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      rollData: [],
      show: true,
      is_roll: false
    }
  },
  mounted() {
    let { rollList } = this;
    let allNum = rollList.length;
    let index = 2;
    if (allNum < 2) {
      return;
    }

    this.rollData.splice(0, 2, rollList[0], rollList[1])
    setInterval(() => {
      let { is_roll, show } = this;
      if (!is_roll) this.is_roll = true;

      let num = index % 2;

      this.rollData.splice(num, 1, rollList[index % allNum])

      this.show = !show;
      index++;
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
@import "@/public/css/elements.scss";

.roll {
  width: 100%;
  height: 100px;

  ul {
    width: 100%;
    height: 100%;
    position:relative;
    overflow:hidden;

    li {
      height: 50px;
      position:absolute;
      left: 50px;
      top: 50px;
      padding:0 25px;
      @include list(row);
      align-items:center;
      border-radius:30px;
      background:linear-gradient(to right, #fd2c22, #fc551f);
      color:#fff;

      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        border-radius:50%;
      }

      p {
        height: 40px;
        line-height: 40px;
        font-size: 24px;
      }
    }
  }
}

.fade-leave-active {
  transition: all 1.5s ease-out;
}

.fade-enter-active {
  transition: all .5s linear;
}

.fade-enter {
  opacity: 0;
  transform: translateY(0);
}

.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform:translateY(-100px);
  opacity:0;
}
</style>
