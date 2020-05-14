//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function(cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == 'function' && cb(this.globalData)
        } else {
            // 调用微信登录接口
            wx.login({
                success: function(res) {
                    console.log("code=" + res.code)
                }
            })
        }
    },
    globalData: {
        userInfo: null
    }
})