<template>
	<view class="container">
		<text>点击图片生成海报</text>
		<poster ref="poster" :imageUrl="image" :imageWidth="550" :imageHeight="980" :drawData="drawData" :config="config"
		 :wechatCode="false" :wechatCodeConfig="wechatCodeConfig">
			<template v-slot:header>
				<view>小程序海报</view>
			</template>
			<!-- <template v-slot:save>
				<view @click="saveToAlbum">保存</view>
			</template> -->
		</poster>
	</view>
</template>

<script>
	import poster from "@c/poster";
	export default {
		components: {
			poster
		},
		data() {
			return {
				image: 'http://yongblog.top/image-1607244573571.png',
				config: {
					imageMode: 'aspectFit',
					posterHeight: '80%',
				},
				drawData: [],
				wechatCodeConfig: {
					serverUrl: 'https://xxx.xxx.com/xxx/xxx',
					scene: '123123',
					config: {
						x: 84.5,
						y: 320,
						w: 100,
						h: 100
					}
				}
			}
		},
		created() {
			// 异步请求获得到的数据
			setTimeout(() => {
				this.wechatCodeConfig.scene = '456787';
				this.drawData = [{
						type: 'image',
						config: {
							url: 'http://yongblog.top/image-1607244573571.png',
							x: 0,
							y: 0,
							w: 275,
							h: 490
						},
					},
					{
						type: 'image',
						config: {
							url: 'http://yongblog.top/image-1607244833147.png',
							x: 97.5,
							y: 325,
							w: 80,
							h: 80
						},
					},
					{
						type: 'text',
						config: {
							text: '这个小程序生成海报插件做的太好啦',
							x: 140,
							y: 60,
							color: '#E60012',
							font: 'normal bold 16px 仿宋',
							textAlign: 'center'
						}
					}
				];
			}, 1000)
		},
		methods: {
			// 保存到相册
			saveToAlbum() {
				this.$refs.poster.saveToAlbum()
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
