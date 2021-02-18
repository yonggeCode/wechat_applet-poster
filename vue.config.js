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
				"@c": resolve("/components"),
				"@u": resolve("/utils"),
			},
		},
	},
}
