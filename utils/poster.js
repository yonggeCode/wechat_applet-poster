// 获取图片信息，这里主要要获取图片缓存地址
export function loadImage(url) {
	return new Promise((resolve, reject) => {
		wx.getImageInfo({
			src: url,
			success(res) {
				console.log('执行', res)
				resolve(res.path)
			},
			fail(err) {
				reject('海报图资源加载失败')
			}
		})
	})
}
// 解析海报对象，绘制canvas海报
export function createPoster(ctx, posterItemList) {
	return new Promise((resolve,reject)=>{
		try{
			for (let i = 0; i < posterItemList.length; i++) {
				const temp = posterItemList[i];
				if (temp.type === 'image') {
					ctx.drawImage(temp.url, temp.config.x, temp.config.y, temp.config.w, temp.config.h);
				} else if (temp.type === 'text') {
					temp.config.font &&	(ctx.font = temp.config.font);
					temp.config.color && ctx.setFillStyle(temp.config.color);
					temp.config.textAlign && ctx.setTextAlign(temp.config.textAlign);
					ctx.fillText(temp.text, temp.config.x, temp.config.y);
					ctx.stroke();
				}
			}
			ctx.draw();
			resolve()
		}catch(e){
			reject(e)
		}
	})
}
// canvas转image图片
export function canvasToTempFilePath(canvasId, vm,delay=50) {
	return new Promise((resolve, reject) => {
		// 这里canvas绘制完成之后想要存缓存需要一定时间，这里设置了50毫秒
		setTimeout(()=>{
			uni.canvasToTempFilePath({
				canvasId: canvasId,
				success(res) {
					if (res.errMsg && res.errMsg.indexOf('ok') != -1) resolve(res.tempFilePath);
					else reject(res)
				},
				fail(err) {
					reject(err)
				}
			}, vm);
		},delay)
	})
}
// 保存图片到相册
export function saveImageToPhotosAlbum(imagePath) {
	return new Promise((resolve, reject) => {
		uni.saveImageToPhotosAlbum({
			filePath: imagePath,
			success(res) {
				resolve(res)
			},
			fail(err){
				reject(err)
			}
		})
	})
}
