"use strict";
const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}

const name = "勇哥的app";

module.exports = {
	lintOnSave: process.env.NODE_ENV === "development",
	// 路径别名
	configureWebpack: {
		name: name,
		devServer: {
			disableHostCheck: true
		},
		resolve: {
			alias: {
				"@i": resolve("api"),
				"@c": resolve("components"),
				"@a": resolve("assets"),
				"@s": resolve("styles"),
				"@u": resolve("utils"),
				"@v": resolve("pages"),
				"@st": resolve("static"),
				"@mix": resolve("mixin"),
				"@mock": resolve("mock"),
				"@api": resolve("api"),
			},
		},
	},
}
