<template>

	<div class="content">

		<div v-if="success" class="notice_wrap van-hairline--bottom">
			<img src="@/assets/success.png"/>
			<p class="notice">提现申请已提交</p>
		</div>

		<div class="scard">
			<img src="@/assets/no_res.png"/>
			<span>请扫描左侧二维码，添加客服微信进行提现操作</span>
		</div>

	</div>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			success() {
				return this.$route.query.success
			}
		}
	}
</script>


<style lang="scss" scoped>
@import "@/scss/main.scss";
@import "@/public/css/elements.scss";
.content {
	padding: 120px 40px;
  box-sizing:border-box;
  width:100vw;
  height:100vh;
	background: #fff!important;

	.notice_wrap{
		@include rect(100%, 240px);
		text-align: center;
		img{
			@include rect(100px,100px);
		}
		.notice{
			margin: 30px 0;
      font-size: 30px;
			color: #666;
		}
	}

	.scard {
		margin: 80px 3%;
		padding: 20px;
		@include rect(94%, auto);
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #F2F2F2;
		@include border($bg: #D9D9D9, $direction: all)
		img{
			@include rect(240px,240px);
		}
		span {
			flex:1;
			padding-left:20px;
			line-height: 1.7;
			letter-spacing: 2px;
			text-align: left;
			font-size: 32px;
			color: #666;
		}
	}
}
</style>
