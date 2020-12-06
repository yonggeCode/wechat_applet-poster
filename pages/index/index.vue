<template>
	<view class="container">
		<text>点击图片生成海报</text>
		<!-- 要生成海报的图片 -->
		<image :src="imageUrl" mode="aspectFill" :style="{width:posterWidth,height:posterHeight}" @click="createImage"></image>
		<!-- 这里把canvas移到了屏幕外面，如果需要查看canvas的话把定位去掉 -->
		<canvas :style="{width:posterWidth,height:posterHeight,position:'fixed',left:'9999px',top:'0'}"  canvas-id="myCanvas" id="myCanvas" class="canvas"></canvas>
		<!-- 遮罩层 -->
		<view class="mask" v-if="showMask" @click="showMask=false">
			<!-- 生成的海报图 -->
			<image :style="{width:posterWidth,height:posterHeight}"  :src="lastPoster" mode="aspectFill" @click.stop=""></image>
			<button type="primary" @click="saveToAlbum" >保存至相册</button>
		</view>
	</view>
</template>

<script>
	import { getWechatCode } from "@u/appletCode.js";
	import { loadImage,createPoster,canvasToTempFilePath,saveImageToPhotosAlbum } from "@u/poster.js";
	export default {
		data() {
			return {
				// 海报图和canvas的宽高
				posterWidth:'550rpx',
				posterHeight:'980rpx',
				ready: false,
				showMask:false,
				imageUrl:'http://yongblog.top/image-1607244573571.png',
				// 存本地缓存图片
				bgImage:'',
				// 存本地二维码图片
				code:'',
				// 最后生成的海报缓存图片
				lastPoster:''
			}
		},
		created(){
			this.loadingResources(this.imageUrl).then(state=>{
				// 状态为 true 表示加载完成
				if(state){
					this.ready = true;
					uni.showToast({
						title:'图片加载完毕'
					})
				}
			})
		},
		methods: {
			// 加载图片资源
			async loadingResources(imgurl){
				// 获取小程序二维码，这里需要调用后端的接口，客户端不能直接拿到小程序二维码，需要服务器发请求获取。XXXXXX
				// 服务器地址
				// const url = 'https://xxx.xxxx.com/xxxx/xxxx';
				// this.code = await getWechatCode(url,'123');
				// 这里小程序二维码用网络图片代替
				this.code = await loadImage('http://yongblog.top/image-1607244833147.png')
				// console.log(123,this.code)
				this.bgImage = await loadImage(imgurl);
				// console.log(this.bgImage)
				return true
			},
			// 保存至相册
			saveToAlbum(){
				saveImageToPhotosAlbum(this.lastPoster).then(res=>{
					console.log(res)
					this.showMask = false;
				}).catch(err=>{
					
				})
			},
			// 生成海报
			async createImage(){
				if(!this.ready) return
				// 获取上下文对象
				const ctx = uni.createCanvasContext('myCanvas');
				// 创建海报
				// 图片需设置x,y,width,height
				// 文字需要设置 text, x,y
				await createPoster(ctx,[
					{
						type:'image',
						url:this.bgImage,
						config:{
							x:0,
							y:0,
							w:275,
							h:490
						},
					},
					{
						type:'image',
						url:this.code,
						config:{
							x:84.5,
							y:320,
							w:100,
							h:100
						},
					},
					{
						type:'text',
						text:'这个小程序生成海报插件做的太好啦',
						config:{
							x:140,
							y:60,
							color:'#E60012',
							font:'normal bold 16px 仿宋',
							textAlign:'center'
						}
					},
				])
				const imagePath = await canvasToTempFilePath('myCanvas',this);
				this.lastPoster = imagePath;
				this.showMask = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.canvas{
		
		border: 1px solid;
	}
	.image{
		width: 550rpx;
		height: 980rpx;
	}
	.mask{
		width: 100vw;
		height: 100vh;
		position: fixed;
		background-color: rgba($color: #000000, $alpha: .4);
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
</style>
