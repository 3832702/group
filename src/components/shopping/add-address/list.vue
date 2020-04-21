<template lang="html">
<div :class="$style.address">
  <ul :class="$style.list">
    <li>
      <label :class="$style.text">收件人</label>
      <input placeholder="请输入名字" v-model="user"/>
    </li>
    <li>
      <label :class="$style.text">手机号</label>
      <input placeholder="请输入手机号" v-model="phone"/>
    </li>
    <li @click="jumpLocation">
      <label :class="$style.text">所在地区</label>
      <p><span>{{ city.address ? city.address : '请选择省、市、区' }}</span></p>
    </li>
    <li>
      <label :class="$style.text">详细地址</label>
      <input placeholder="街道、楼牌号等(可省略)" v-model="details"/>
    </li>
    <!--<li :class="$style.last">
      <label :class="$style.text">
        <span :class="$style.text1">设为默认收获地址</span>
        <span :class="$style.text2">注:每次下单将默认该地址为收获地址</span>
      </label>
      <div :class="$style.checked">
        <div :class="$style.mask">

        </div>
      </div>
    </li>-->
  </ul>
  <div @click="updateData" :class="$style.btn">提交</div>
  <Prompt v-if="isPrompt" @cancel-change="cancelChange" @confirm-change="confirmChange">
    <template v-slot:text><p>{{ addressPrompt }}</p></template>
  </Prompt>
  <Prompt v-if="isSubmit" @cancel-change="submitChange" @confirm-change="submitChange">
    <template v-slot:text><p>已提交收货地址</p></template>
  </Prompt>
</div>
</template>

<script>
import { homeAddressUpdate, cityList } from "@/server/index.js"
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  props: {
    city: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      user: "", // 用户名
      phone: "", // 手机号
      details: "", // 详细地址
      type: 0, // 用户身份
      isPrompt: false, // 是否显示弹窗
      isSubmit: false, // 是否提交
      addressPrompt: ''
    }
  },
  computed: {
    ...mapState({ consignee: "consignee", userDetails: "details"})
  },
  async created() {
    await this.initDetails()
    this.findUserHandler();

    if (this.city.title) {
      this.details = this.city.title;
    }
  },
  methods: {
    ...mapMutations(['CHANGECONSIGNEE', 'CHANGECITY']),
    ...mapActions(['initDetails']),

    /**
     * [findUserHandler 查找用户地址]
     * @return {[type]} [description]
     */
    findUserHandler() {
      const { consignee, userDetails } = this;

      if (consignee.home_name) {
        this.setUserHandler(consignee)
      } else {
        this.setUserHandler(userDetails)
      }

    },

    /**
     * [jumpLocation 跳转页面]
     * @return {[type]} [description]
     */
    jumpLocation() {
      this.$router.push({ name: "Location" })
    },

    /**
     * [setUserHandler 设置用户数据]
     * @param {[Object]} data [用户信息对象]
     */
    setUserHandler(data) {
      const { home_phone, home_address, nickname, phone, home_name, latitude, longitude, area_id } = data

      this.user = home_name ? home_name : nickname
      this.phone = home_phone ? home_phone : phone
      this.details = home_address ? (home_address.split(' ')[1] || '' ) : ''

      if (nickname && home_address) {
        this.city = {
          address: home_address.split(' ')[0],
          area_id,
          ad_info: {
            location: { lat: latitude, lng: longitude }
          }
        }
        this.CHANGECITY(this.city)
      }
      this.CHANGECONSIGNEE({ home_phone, home_address, home_name, latitude, longitude })
    },

    /**
     * [updateData 更新地址]
     * @return {Promise} [description]
     */
    async updateData() {

      const {
          user: home_name,
          phone: home_phone,
          details,
          city: {
            address: home_address,
            area_id,
            ad_info: {
              location: { lat: latitude, lng: longitude }
            }
          }
        } = this;

      if (!this.judgeHandler({ home_name, home_phone, home_address })) {
        this.isPrompt = true;
        return;
      }
      this.isSubmit = true;

      try {
         await homeAddressUpdate({ latitude, longitude,  home_address:`${home_address} ${details}`, area_id, home_phone, home_name })
         this.CHANGECONSIGNEE({})
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [judgeHandler 判断输入]
     * @param  {[String]} home_name    [收货人姓名]
     * @param  {[String]} home_phone   [收货人手机号]
     * @param  {[String]} home_address [收货人地址]
     * @return {[type]}              [description]
     */
    judgeHandler({ home_name, home_phone, home_address }) {


      const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;

      if (!myreg.test(home_phone)) {
        this.addressPrompt = "请输入正确的手机号"
        return;
      }

      if (!home_name) {
        this.addressPrompt = "请输入收货人姓名"
        return;
      }

      if(!home_address) {
        this.addressPrompt = "请输入收货地址"
        return;
      }

      return true
    },

    /**
     * [getRuleCityList 获取已开通城市列表]
     * @return {Promise} [description]
     */
    async getRuleCityList() {
      try {
        this.ruleCityList = await cityList();
      }catch(err) {
        console.log(err)
      }
    },

    /**
     * [cancelChange 点击取消]
     * @return {[type]} [description]
     */
    cancelChange() {
      this.isPrompt = false
    },

    /**
     * [cancelChange 点击确定]
     * @return {[type]} [description]
     */
    confirmChange() {
      this.cancelChange();
    },

    /**
     * [submitChange 已提交]
     * @return {[type]} [description]
     */
    submitChange() {
      this.isSubmit = false;
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" module>
@import "@/public/css/elements.scss";

.address {
  .list {
      width: 100%;
      padding-top: 20px;
      li {
        background:#fff;
        height: 100px;
        width: 100%;
        @include list(row);
        align-items:center;
        box-sizing:border-box;
        padding:0 30px;
        position:relative;

        &:after {
          height: 2px;
          background:#efefef;
          content: " ";
          position:absolute;
          left: 30px;
          bottom:0;
          right: 0;
        }

        .text {
          font-size:26px;
          width: 120px;
          vertical-align:middle;
        }

        input {
          width: 400px;
          height: 60px;
          border:none;
          background:#fff;
          border-radius:6px;
          padding:0 20px;
          @include list(row);
          align-items:center;
          justify-content:center;
          font-size: 28px;
          color:#757575;
          vertical-align:middle;

          &::-webkit-input-placeholder{
            line-height:1.5rem;
            vertical-align:middle;
            font-size: 26px;
            transform: translateY(3px);
          }
        }

        >p {
          font-size: 26px;
          width: 520px;
          padding:0 20px;
          color:#757575;
          @include list(row);
          align-items:center;
          justify-content:space-between;

          span {
            line-height: 35px;
            width: 480px;
            padding: 15px 0;
          }

          &:after {
            content: " ";
            @include leftArrow($width:14px, $bg: #989898,$rotate:rotate(-45deg))
          }
        }
      }

      .last {
        width: 100%;
        height: 140px;
        justify-content:space-between;

        .text {
          @include list;
          width: 540px;
          justify-content:center;

          .text1 {
            height: 48px;
            line-height: 48px;
            font-size: 28px;
          }

          .text2 {
            height: 48px;
            line-height: 48px;
            font-size: 26px;
            color:#919191;
          }
        }

        .checked {
          width: 110px;
          height: 62px;
          @include border($bg: #bdbdbd, $width: 2px)
          box-sizing:border-box;
          border-radius: 31px;
          position:relative;
          background:#fcfcfc;

          .mask {
            width: 54px;
            height: 54px;
            background:#ffffff;
            border-radius:50%;
            position:absolute;
            top:0px;
            left: 4px;
            box-shadow: 2px 2px 2px #e1e1e1;
          }
        }
      }
  }

  .btn {
    width: 700px;
    height: 80px;
    background: -webkit-linear-gradient(left, #ff5d8d, #ff68c1); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to right, #ff5d8d, #ff68c1); /* 标准的语法 */
    font-size: 30px;
    line-height: 80px;
    text-align:center;
    border-radius:10px;
    color:#fff;
    margin: 40px auto 0;
  }
}
</style>
