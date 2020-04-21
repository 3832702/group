<template>
	<div id="echart_line"></div>
</template>

<script>
export default {
	components: {},
	mounted() {
		let echarts = window.echarts;

		var moneysitu = echarts.init(document.getElementById('echart_line'));
		var optionmoneysitu = {
			grid: {
				x: 16,
				y: 18,
				x2: 12,
				y2: 8,
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisTick: {
					show: false //取消刻度线
				},
				axisLabel: {
					color: '#c9c9c9' // x轴字体颜色
				},
				axisLine: {
					lineStyle: {
						color: '#FB6464' // x轴坐标轴颜色
					}
				},
				data: ['3月21', '22', '23', '24', '25', '26', '27']
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					color: '#999', // y轴字体颜色
					show: false //隐藏坐标值
				},
				axisTick: {
					show: false //取消刻度线
				},
				axisLine: {
					lineStyle: {
						color: '#FB6464' // x轴坐标轴颜色
					},
					show: false //隐藏坐标轴
				},
				splitLine: {
					show: false //隐藏网格
				}
			},
			series: [{
				data: [19, 18, 32, 26, 28, 24, 39],
				type: 'line',
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				itemStyle: {
					normal: {
						color: 'rgb(255,100,100,.5)'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#FB6464'
						}, {
							offset: 1,
							color: '#f6f6f6'
						}])
					}

				}
			}],

		};
		moneysitu.setOption(optionmoneysitu);
	}
}
</script>
<style scoped lang="scss">
 @import "~@/scss/main.scss";
 //@include ellipsis(80%, 1);

#echart_line {
	width: 100%;
	height: 280px;
	background: #fff;
	color: rgb(0, 138, 205);
}

</style>
