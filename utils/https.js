var rootDocment = 'http://app.imcfp.com/api/app'

function getReq(url, data, callback) {
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: rootDocment + url,
        'Content-Type': 'application/json',
        data: data,
        method: 'GET',
        success: function(res) {
            wx.hideLoading();
            return typeof callback == 'function' && callback(res.data)
        },
        fail: function(e) {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络出错，请刷新重试',
                showCancel: false
            })
            return typeof callback == 'function' && callback(e)
        }
    })
}

function postReq(url, data, callback) {
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: rootDocment + url,
        'Content-Type': 'application/x-www-form-urlencoded',
        data: data,
        method: 'POST',
        success: function(res) {
            wx.hideLoading();
            return typeof callback == 'function' && callback(res.data)
        },
        fail: function(e) {
            wx.hideLoading();
            wx.showModal({
                title: '网络错误',
                content: '网络错误，请刷新重试',
                showCancel: false
            })
            return typeof callback == 'function' && callback(false)
        }
    })
}

module.exports = {
    getReq: getReq,
    postReq: postReq
}
