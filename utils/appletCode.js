import {base64src} from "@u/base64src.js";
/**
 * 微信获取小程序二维码，具体请求格式可能会有差异需要和后端接口统一
 * @param {String} url 获取小程序码的接口 
 * @param {String} scene 二维码所携带的信息 最多可携带32位字符
 * @return {Object} 返回的二维码对象
 **/
export function getWechatCode (url,scene) {
	return new Promise((resolve,reject)=>{
		uni.request({
			url: url,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			// 二维码携带的信息
			data: {
				scene: scene
			},
			success(res) {
				//将base64图片转换成本地路径
				base64src("data:image/PNG;base64," + res.data.qcode, res => { 
					// 获取图片信息
					uni.getImageInfo({
						src: res,
						success(res) {
							resolve(res.path);
						},
						fail(err) {
							reject(err);
						}
					})
				})
			},
			fail(err){
				reject(err);
			}
		})
	})
}



