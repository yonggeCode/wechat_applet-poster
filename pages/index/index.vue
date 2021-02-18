<template>
	<view class="container">
		<view style="width: 100%; margin-bottom: 20rpx;">
			<view class="title">通过poster组件生成海报</view>
			<view class="tips">示例中用的是点击图片生成海报，也可通过外部主动触发poster组件的createImage函数来生成海报</view>
			<navigator style="margin-top: 20rpx;" url="/pages/poster/poster">生成海报示例</navigator>
		</view>
		
		<view style="width: 100%; margin-bottom: 20rpx;">
			<view class="title">通过poster.js进行canvas的绘制</view>
			<view class="tips">poster.js简化了canvas的操作，以简单的配置参数就能轻松绘制一个canvas。</view>
			<navigator style="margin-top: 20rpx;" url="/pages/draw/draw">canvas绘制示例</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
	.container{
		padding: 20rpx;
		box-sizing: border-box;
	}
	.title {
		width: 100%;
		font-size: 36rpx;
	}
	.tips{
		width: 100%;
		font-size: 28rpx;
		color: red;
	}
</style>


