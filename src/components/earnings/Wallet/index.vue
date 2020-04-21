<template>
<div>
	<div class="content">
		<!--总收益-->
		<div class="wallect_wrap">
			<section>
				<p class="name">账户余额(元)</p>
				<p class="wallet_sum">{{ details.money_now ? details.money_now.toFixed(2) : 0 }}</p>
			</section>
		</div>

		<!--提现-->
		<ul class="expressive">
			<li>
				<p class="label">可提现(元)</p>
				<p class="price">{{ details.money_now ? details.money_now.toFixed(2) : 0 }}</p>
			</li>
			<!-- <li>
				<p class="label">提现中(元)</p>
				<p class="price">{{ details.wallet ? details.wallet.toFixed(2) : 0 }}</p>
			</li> -->
			<li>
				<p class="label">已提现(元)</p>
				<p class="price">{{ details.money_out ? details.money_out.toFixed(2) : 0 }}</p>
			</li>
		</ul>
	</div>
	<ul class="record">
		<router-link :to="{name: 'DrawMoney'}" tag="li">申请提现</router-link>
		<router-link :to="{name: 'MoneyList'}" tag="li">零钱记录</router-link>
		<router-link :to="{name: 'Help'}" tag="li">联系客服</router-link>
	</ul>
</div>
</template>

<script>
import { mapMutations } from "vuex"
import { billCount } from "@/server/index.js"

export default {
	data() {
		return {
			details: {}, // 用户信息
		}
	},
	created() {
		this.getDetails();
	},
	methods: {
		...mapMutations(['CHANGEBALANCE']),
		/**
		 * [getDetails 获取个人信息]
		 * @return {[type]} [description]
		 */
		async getDetails() {
			try {
				this.details = await billCount()
				this.CHANGEBALANCE(this.details.money_now)
			}catch(err) {
				console.log(err)
			}
		}
	},
}
</script>
<style scoped lang="scss">
@import "@/scss/main.scss";
@import "@/public/css/elements.scss";

/*@include ellipsis(80%, 1);*/

.content {
	background: #fff;
	/*头部总收益*/
	.wallect_wrap {
		@include rect(100%, 220px);
		@include background;
		padding-top:80px;
		/*background: #ffd05e;*/
		text-align: center;
		font-size: 32px;
		color: #fff;
		section {
			@include rect(100%, 100%);
			.name {
				margin-bottom: 20px;
			}
			.wallet_sum {
				font-size: 40px;
				color: #fff;
			}
		}
		.wallet_list {
			padding: 20px 0;
			display: flex;
			align-items: center;
			justify-content: space-around;
			li {
				flex: 1;
				@include border($bg: #fff, $direction: right)
			}
			li:nth-child(3) {
				border: 0;
			}
		}
	}
	/*提现*/
	.expressive {
		@include border($bg: #f2f2f2, $direction: top)
		@include border($bg: #f2f2f2, $direction: bottom)
		padding: 20px 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #fff;
		li {
			.label {
				padding: 6px 0;
				font-size: 24px;
				color: #777;
				text-align:center;
			}
			.price {
				@include color;
				font-size: 32px;
				height: 44px;
				line-height: 44px;
				text-align:center;
			}
		}
	}
	/*收益排行榜*/
	.income_wrap {
		margin-top: 20px;
		background: #fff;
		/*标题*/
		.title_wrap {
			padding: 8px 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24px;
			color: #666;
			.title {
				font-size: 24px;
			}
			i {
				font-size: 36px;
			}
		}
	}
	/*折线图*/
	.echarts {
		@include rect(94%, auto);
		margin: 20px auto;
		padding: 20px;
		border-radius: 12px;
		@include border($bg: rgba(251, 100, 100, .5), $width: 2px)
		.title {
			margin-bottom: 20px;
			padding: 12px 0;
			color: #666;
			font-size: 24px;
			@include border($bg: rgba(251, 100, 100, .5), $direction: bottom)
			.label {
				font-size: 32px;
			}
			.top {
				float: right;
				.num {
					padding: 0 6px;
					font-size: 36px;
					@include color;
				}
			}
		}
	}
}

.record {
	width: 100%;
	background:#fff;
	margin-top: 20px;
	>li {
		width: 100%;
		height: 100px;
		font-size: 28px;
		line-height: 100px;
		box-sizing:border-box;
		padding:0 20px;
		position:relative;
		@include list(row);
		align-items:center;
		justify-content:space-between;
		&:before {
			content: " ";
			position:absolute;
			left: 20px;
			right:0;
			bottom:0;
			height: 2px;
			background:#f5f5f5;
		}

		&:after {
			content: " ";
			@include leftArrow($width:14px, $bg: #ccc,$rotate:rotate(-45deg))
		}
	}
}
</style>
