// 错误提示集合
const errMsgMap = {
	'arc':{
		'x':'请指定圆的起始位置 x',
		'y':'请指定圆的起始位置 y',
		'r':'请指定圆的半径 r',
		'sAngle':'请指定圆的起始弧度 sAngle',
		'eAngle':'请指定圆的终止弧度 eAngle',
	},
	'rect':{
		'x':'请指定矩形的起始位置 x',
		'y':'请指定矩形的起始位置 y',
		'w':'请指定矩形的宽度 w',
		'h':'请指定矩形的高度 h',
	},
	'stroke_rect':{
		'x':'请指定矩形边框的起始位置 x',
		'y':'请指定矩形边框的起始位置 y',
		'w':'请指定矩形边框的宽度 w',
		'h':'请指定矩形边框的高度 h',
	},
	'text':{
		'x':'请指定文本的起始位置 x',
		'y':'请指定文本的起始位置 y',
		'text':'请指定文本的内容 text'
	},
	'image':{
		'x':'请指定图片的起始位置 x',
		'y':'请指定图片的起始位置 y',
		'w':'请指定图片的宽度 w',
		'h':'请指定图片的高度 h',
		'url':'请指定图片的路径 url'
	},
	'line':{
		'path':'请指定线的路径 path'
	},
	'points':{
		'points':'请指定点集合 points'
	}
};
// 绘制方法集合
const DrawFuncMap = {
	drawLine(ctx,config,i){
		// 检验必传参数
		checkNecessaryParam(config,'line',i,'path');
		// 每一个path就描述了一组线的开始到结束，这一组线段不一定是连续的，根据配置属性来具体描述这个线
		// 他们的形态是一样的(线的粗细，颜色)，形状不一样且不一定是连续的
		for(let j = 0; j < config.path.length; j++){
			const path = config.path[j];
			checkNecessaryParam(path,'points',`${i}-${j}`,'points');
			const lineWidth = path.lineWidth || 1;
			const lineJoin = path.lineJoin || 'round';
			const lineCap = path.lineCap || 'round';
			ctx.beginPath();
			// 设置颜色
			ctx.setStrokeStyle(path.strokeStyle || '#333333');
			// 设置粗细
			ctx.setLineWidth(lineWidth);
			// 设置线条交点样式
			ctx.setLineJoin(lineJoin);
			// 设置线条的断点样式
			ctx.setLineCap(lineCap);
			// 遍历线的点集合，根据每个点的不同属性来绘制成线
			for(let k = 0; k < path.points.length; k++){
				// 拿到每一个点
				const pointSet = path.points[k];
				// 如果该点是一个数组集合，则点的类型直接当 lineTo 处理
				if(Object.prototype.toString.call(pointSet) === "[object Array]"){
					if(k === 0) ctx.moveTo(...pointSet);
					else ctx.lineTo(...pointSet);
				}else{
					// 默认的第一个点一定是起始点，且点类型为 moveTo 则执行 ctx.moveTo 移动画笔
					if(k === 0 || pointSet.type === 'moveTo'){
						ctx.moveTo(...pointSet.point);
					// 点的类型为 lineTo 或 没有 type 属性也默认为 lineTo 至执行 ctx.lineTo 连线
					}else if(pointSet.type === 'lineTo' || pointSet.type === undefined){
						ctx.lineTo(...pointSet.point);
					}else if(pointSet.type === 'bezierCurveTo'){
						const P2 = pointSet.P2 ? pointSet.P2 : pointSet.P1;
						ctx.bezierCurveTo(...pointSet.P1,...P2,...pointSet.point);
					}
				}
			}
			// 每一组点集合(path)结束 stroke
			ctx.stroke();
		}
	},
	// 绘制图片
	drawImage(ctx,config,i){
		checkNecessaryParam(config,'image',i,'x','y','w','h','url');
		ctx.drawImage(config.url, config.x, config.y, config.w, config.h);
	},
	// 绘制圆
	drawArc(ctx,config,i){
		checkNecessaryParam(config,'arc',i,'x','y','r','sAngle','eAngle');
		ctx.beginPath();
		ctx.arc(config.x, config.y, config.r, config.sAngle, config.eAngle);
		ctx.setFillStyle(config.fillStyle || '#333333');
		ctx.fill();
		ctx.setLineWidth(config.lineWidth || 1);
		ctx.setStrokeStyle(config.strokeStyle || '#333333');
		ctx.stroke();
	},
	// 绘制文字
	drawText(ctx,config,i){
		checkNecessaryParam(config,'text',i,'x','y','text');
		ctx.font = config.font || '10px sans-serif';
		ctx.setFillStyle(config.color || '#333333');
		ctx.setTextAlign(config.textAlign || 'center');
		ctx.fillText(config.text, config.x, config.y);
		ctx.stroke();
	},
	// 绘制矩形
	drawRect(ctx,config,i){
		checkNecessaryParam(config,'rect',i,'x','y','w','h');
		ctx.beginPath();
		ctx.rect(config.x, config.y, config.w, config.h);
		ctx.setFillStyle(config.fillStyle || '#333333');
		ctx.fill();
		ctx.setLineWidth(config.lineWidth || 1);
		ctx.setStrokeStyle(config.strokeStyle || '#333333');
		ctx.stroke();
	},
	// 绘制非填充矩形
	drawStrokeRect(ctx,config,i){
		checkNecessaryParam(config,'stroke_rect',i,'x','y','w','h');
		ctx.beginPath();
		ctx.setStrokeStyle(config.strokeStyle || '#333333');
		ctx.setLineWidth(config.lineWidth || 1);
		ctx.strokeRect(config.x, config.y, config.w, config.h);
		ctx.stroke();
	},
}

/**
 * 检测绘制的必要属性
 * @param {Object} configObj 配置对象
 * @param {String} type 对应校验的类型
 * @param {String|Number} index 当前的错误位置 从0开始对应绘画(drawData)配置中的索引，
 * 当为 String 类型时会以'-'间隔出第几层的第几个，如1-2 表示是绘画(drawData)配置中第一个配置里的第二个子配置对象有问题，依次类推
 * @param {Array} keyArr 搜集到的所以需要进行检验的键名
 **/
function checkNecessaryParam (configObj,type,index,...keyArr){
	// 这里要注意由于，绘画配置有些参数可能会漏写，所以 errMsgMap[type] 作为遍历对象进行比较
	for(let prop in errMsgMap[type]){
		if(configObj[prop] === undefined){
			throw new Error(`第${index}顺位:${errMsgMap[type][prop]}` )
		}
	}
}
// 获取图片信息，这里主要要获取图片缓存地址
export function loadImage(url) {
	return new Promise((resolve, reject) => {
		wx.getImageInfo({
			src: url,
			success(res) {
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
					DrawFuncMap.drawImage(ctx,temp.config,i);
				} else if (temp.type === 'text') {
					DrawFuncMap.drawText(ctx,temp.config,i);
				} else if ( temp.type === 'arc' ){
					DrawFuncMap.drawArc(ctx,temp.config,i);
				} else if (temp.type === 'rect'){
					DrawFuncMap.drawRect(ctx,temp.config,i);
				} else if (temp.type === 'stroke_rect'){
					DrawFuncMap.drawStrokeRect(ctx,temp.config,i);
				} else if (temp.type === 'line'){
					DrawFuncMap.drawLine(ctx,temp.config,i)
				}
			}
			ctx.draw();
			resolve({result:'ok',msg:'绘制成功'})
		}catch(e){
			console.error(e)
			reject({result:'fail',msg:e})
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
