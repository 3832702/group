<template>

	<!--排名-->
	<div class="rankings_list">
		<!--<p class="title">数据统计为本区域排名</p>-->
		<div class="rankings">
			<span class="rank">近期收益</span>
			<div class="seller_fir">
				<div class="name_time">
					<p class="name">{{info.name}}</p>
					<p class="time">{{info.time}}</p>
				</div>
				<img :src="info.head_url" />
			</div>
		</div>

		<van-steps :active="active">
			<van-step v-for="(i,k) in rank_list" :key="k">
				<h3>{{i.num}}</h3>
				<p>{{i.name}}</p>
			</van-step>
		</van-steps>
	</div>

</template>

<script>

export default {
	components: {},
	data() {
		return {
			active: 3,
			info: {
				head_url: '/static/img/headurl.png',
				rank: '15',
				name: '金牌掌柜',
				time: '2019-03-27',
			},
			rank_list: [{
					num: '32',
					name: '今日',
				},
				{
					num: '16',
					name: '本周',
				},
				{
					num: '8',
					name: '本月',
				}
			]
		}
	}
}

</script>
<style scoped lang="scss">
/*排行榜*/
@import "@/scss/main.scss";

.rankings_list {
	margin: 20px auto 0;
	padding: 20px;
	@include rect(94%, auto);
	@include border($bg: rgba(251, 100, 100, .5), $width: 2px)
	border-radius: 12px;
	.title {
		margin-bottom: 8px;
		font-size: 24px;
		color: #999;
		.top {
			font-size: 24px;
		}
	}
	.rankings {
		margin-bottom: 12px;
		@include rect(100%, 92px);
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		.rank {
			color: #777;
			font-size: 24px;
			i {
				padding: 0 8px;
				font-size: 36px;
				@include color;
			}
		}
		.seller_fir {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			.name_time {
				padding-right: 10px;
				.name {
					color: #777;
					font-size: 26px;
					height: 35px;
					line-height: 35px;
				}
				.time {
					font-size: 24px;
					color: #c9c9c9;
					height: 35px;
					line-height: 35px;
				}
			}
			img {
				@include rect(92px, 92px);
				border-radius: 50%;
			}
		}
	}
}
</style>
<style lang="scss">
//滚动通知
.rankings_list .van-notice-bar {
	height: 60px;
}

.rankings_list .van-notice-bar__left-icon {
	min-width: 60px;
}

//步骤条
.rankings_list .van-step--finish .van-step__circle,
.rankings_list .van-step--finish .van-step__line {
	background-color: #FB6464;
}

.rankings_list .van-step--horizontal .van-step__circle-container {
	top: -4px;
}

.rankings_list .van-step--horizontal .van-step__line {
	top: 0;
}

.rankings_list .van-steps--horizontal .van-steps__items {
		padding-bottom: 0;
		font-size: 24px;
}

.rankings_list .van-step--horizontal .van-step__title {
		margin-top:20px;
		h3 {
			font-size: 32px;
			color: #FB6464;
		}
}

.rankings_list .van-step--horizontal:nth-child(2) .van-step__title {
		text-align: center;
}

.rankings_list .van-step--horizontal:last-child .van-step__title {
	text-align: right;
}
</style>
