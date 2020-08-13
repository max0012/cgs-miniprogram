//app.js
const pageMap = require("utils/page.js").initPageMap();
const util = require('utils/util.js');
App({
    onLaunch() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
	require : $uri => require($uri),
	
	// (key, queryString) : key 为文件名，如：pages/mine/mine，则key为最后的pages/mine/{"mine"}
	navToPage: function() { 
		let key = arguments[0];
		if(util.isNull(pageMap.get(key))){
			throw "Can Not Navigate To Target Page, Please Check Config Of page.js";
		}
		if(arguments.length == 1){
			wx.navigateTo({
				url: "/" + pageMap.get(key)
			});
		}
		if(arguments.length == 2){
			let queryString = arguments[1];
			wx.navigateTo({
				url: `/${pageMap.get(key)}?${queryString}`
			});
		}
	},
    globalData: {
        
    }
})