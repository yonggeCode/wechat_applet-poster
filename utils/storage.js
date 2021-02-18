export function setStorage (key,value,cb=()=>{}) {
	uni.setStorage({
	    key: key,
	    data: value,
	    success: function () {
	        console.log('set success');
			cb();
	    }
	});
}
export function setStorageSync (key,value) {
	try {
	    uni.setStorageSync(key, value);
	} catch (e) {
	    // error
		uni.showToast({
		    title: '本地缓存储存出错',
		    duration: 2000,
			icon:"none"
		});
		console.log('本地缓存储存出错')
	}
}

export function getStorage (key,cb=()=>{}) {
	uni.getStorage({
	    key: key,
	    success: function (res) {
			console.log('get success');
	        cb(res)
	    }
	});
}

export function getStorageSync (key) {
	try {
	    const data = uni.getStorageSync(key);
	    if (data) {
	        return data
	    }else {
			// 本地还没有缓存的情况
			return false
		}
	} catch (e) {
		uni.showToast({
		    title: '本地缓存出错',
		    duration: 2000,
			icon:"none"
		});
		console.log('本地缓存出错')
		return {}
	}
}

export function removeStorage (key,cb=()=>{}) {
	uni.removeStorage({
	    key: key,
	    success: function (res) {
			console.log('remove success');
	        cb(res)
	    }
	});
}

export function clearStorage () {
	uni.clearStorage();
}