## 使用说明
这是一个极简的生成微信小程序海报的模板，可以快速绘制海报图。

## 基本案例
pages/index 是一个小的使用案例。本插件主要的三个函数都在utils下可以随引随用。

## 工具函数
appletCode.js：是获取微信小程序二维码的工具函数。由于小程序的二维码只能服务端才能获取所有需要后端人员配合。案例中使用的是网络图片。由于我的服务器只有1M，网速较慢，加载图片需要等待一定的时间。

base64src.js: 获取到的微信二维码是base64格式，需要将base64转本地路径。

poster.js: 核心函数，目前的功能有：缓存图片，绘制海报，canvas转本地图片，保存图片到相册。