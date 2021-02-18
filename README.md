## 介绍：
这是一个基于uni极简的生成微信小程序海报的组件，可以快速绘制海报图。使用便捷功能可拆分，支持生成小程序二维码。提供Poster.js文件，在满足海报开发之余，对 canvas Api 进行了封装，只需要配置参数就可以完成绘制。

**[uniapp插件市场](https://ext.dcloud.net.cn/plugin?id=3604)**

**[gitee地址](https://gitee.com/yonggecode/yong_we-chat-poster-of-uniapp)**

国内推荐使用gitee,两个项目会同步更新
****

## 功能：
1. 组件化开发，无需处理图片和二维码下载等异步事件，只需关注配置参数
2. 展示图只用于展示，生成海报的图片归类于绘制内容，需要在绘制内容中配置
3. 可以直接生成小程序二维码并绘制入海报。可能需要根据后端接口修改 appletCode.js 中的请求二维码函数
4. 提供了两个插槽 header 和 save。自定义标题和保存（保存按钮或者别的什么都行）
5. 默认点击图片生成海报图，你也可以换别的触发条件，手动调用内部 createImage 函数
6. Poster.js 功能独立上手简单易配置。无需引入其他组件，只需要canvas标签即可。
7. Poster.js 功能上支持: 图片、文字、矩形、非填充矩形（中间是透的）、圆、直线、曲线。
8. 直线与曲线，直线与曲线，曲线与曲线 之间连接顺畅，配置便利。


## 属性：
imageUrl ：目前是必传。只用来展示
imageWidth：展示图片的宽 单位 rpx
imageHeight：展示图片的高 单位 rpx
imageUrl：展示图片的url
drawData：绘制海报的数据参数
config：海报的配置参数
wechatCode：是否需要小程序二维码
wechatCodeConfig：小程序二维码的配置参数


## 配置属性介绍：

drawData:数组内每一个对象都是海报的一个基础绘制单元。目前可绘制（图片、文字、矩形、圆、直线、曲线）

- 属性类型：Array

- 可配置对象：Object

```js
[
  {
	// 图片类型
    type: 'image', 
    config: {
	  // 图片地址
	  url: 'http://yongblog.top/image-1607244573571.png',
      // 以画布左上角为顶点，图片的水平位置x,垂直位置y(必填)
      // 图片的宽（px）,高（px）(必填)
      x: 0,
      y: 0,
      w: 275,
      h: 490
    },
  },
  {
	// 文本类型
    type: 'text',
    config: {
	  text: '这个小程序生成海报插件做的太好啦',
      // 以画布左上角为顶点，文本的水平位置x, 垂直位置y (必填)
      x: 140,
      y: 60,
      // 文本属性 颜色（选填，默认black）字体（选填，默认根节点字体）对齐方式（选填，默认center）
      color: '#E60012',
      font: 'normal bold 16px 仿宋', //同 canvas 对象的 font 属性
      textAlign: 'center'// 可选 left right center
    }
  },
  {
	// 圆类型
  	type:'arc',
  	config:{
		// 圆的 水平位置x, 垂直位置y, 半径r, 起始角度sAngle, 结束角度eAngle (必填) 
  		x:200,
  		y:400,
  		r:50,
  		sAngle:0,
  		eAngle:2 * Math.PI,
		// 填充颜色 fillStyle, 边线的粗细lineWidth, 边线的颜色strokeStyle (选填)
  		fillStyle:'#b8e994',
  		lineWidth:2,
  		strokeStyle:'#f6b93b'
  	}
  },
  {
	// 矩形类型
  	type:'rect',
  	config:{
		// 矩形的 水平位置x, 垂直位置y, 宽w ,高h (必填) 
  		x:130,
  		y:500,
  		w:150,
  		h:75,
		// 填充颜色 fillStyle, 边线的粗细lineWidth, 边线的颜色strokeStyle (选填)
  		fillStyle:'#b8e994',
  		lineWidth:2,
  		strokeStyle:'#f6b93b'
  	}
  },
  {
	// 非填充矩形类型
  	type:'stroke_rect',
  	config:{
		// 矩形的 水平位置x, 垂直位置y, 宽w ,高h (必填) 
  		x:130,
  		y:640,
  		w:150,
  		h:75,
		// 边线的粗细lineWidth, 边线的颜色strokeStyle (选填)
  		lineWidth:4,
  		strokeStyle:'#f6b93b'
  	}
  },
  {
	// 线类型
  	type:'line',
  	config:{
		// path 用来描述一段线的路径和类型
  		path:[{
			// points 内的每个对象都是对一段线或多段线的描述
  			points:[{
				// 点的类型 起始点 (必填)
  				type:'moveTo',
  				point:[130,780]
  			},{
				// 点的类型 连接点 (必填)
  				type:'lineTo',
  				point:[280,780]
  			}],
			// 线头的连接方式 (选填)
  			lineJoin:'round',
			// 线帽的类型 (选填)
  			lineCap:'round',
			// 显得粗细 (选填)
  			lineWidth:3,
			// 线的颜色 (选填)
  			strokeStyle:'red'
  		}],
  	}
  },
  {
	// 线(曲线) 曲线与线相同,都在线这一类中,只不过点与点的连接方式不同而已
  	type:'line',
  	config:{
  		path:[{
  			points:[{
				// 起始点 (必填)
  				type:'moveTo',
  				point:[130,1040]
  			},{
				// 连接点 (曲线连接) 这里曲线使用 二次贝塞尔曲线实现的 (必填)
  				type:'bezierCurveTo',
				// 连接点坐标
  				point:[260,1040],
				// 二次贝塞尔曲线的控制点,如果两个点一样可以只穿 P1 (必填)
  				P1:[195,1100],
				//P2:[195,1100],
  			}],
			// 选填
  			lineWidth:3,
  			strokeStyle:'red'
  		}]
  	}
  },
  {
	// 多段线的配置
  	type:'line',
  	config:{
  		path:[{
  			// 可以简写成一个二位数组
  			points:[[130,840],[280,840],[280,890],[260,870]],
  			lineJoin:'round',
  			lineCap:'round',
  			lineWidth:3,
  			strokeStyle:'red'
  		},{
  			//每个 points 就是一个线的开的和结束，每个 point 代表直线的点时也可以不写 type,曲线同理
  			points:[{
  				point:[130,920]
  			},{
  				point:[160,890]
  			},{
  				point:[190,980]
  			},{
  				point:[220,920]
  			}],
  			lineJoin:'round',
  			lineCap:'round',
  			lineWidth:3,
  			strokeStyle:'red'
  		}],
  	}
  }
];
```

config:配置最后生成的海报图片

- 属性类型：Object

```js
  {
    // 图片模式同 uni image组件
    imageMode: 'aspectFit',
    // 最后海报图片的高度，posterHeight/posterWdith 两者可填一个或两个都填。考虑到图片可能变形建议使用，imageMode：'aspectFit',配置posterHeight即可
    posterHeight: '80%',
    // 最后海报图片的高度
    posterWdith:'auto'
  },
```

wechatCodeConfig：生成小程序二维码的配置。这里是服务端调用 https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN 接口的方式请求的二维码。我这里调用的是Java同学写好的接口。返回给我的小程序二维码的 buffer 文件。所有在使用的过程中可能需要根据后台同学接口书写的不同需要修改appletCode.js文件。理论上传参和返值应该都差不多。

- 属性类型：Object

```js
{
  serverUrl: 'https://xxx.xxx.com/xxx/xxx',
  // 请求的服务地址
  scene: '123123',
  // 所携二维码所携带的数据
  config: {
    x: 84.5,
    y: 320,
    w: 100,
    h: 100
  }
}
```
**如果你的二维码不需要携带用户数据，可以在微信平台上生成一个永久有效的二维码，将图片存至服务器。将二维码当图片以配置drawData的方式处理**
