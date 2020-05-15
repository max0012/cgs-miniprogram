var rootDocment = 'http://app.imcfp.com/api/app'
var header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': "Bearer " + wx.getStorageSync("token"),
    'os': 'android',
    'version': '1.0.0'
}

function get(url, params, callback) {
    request(url, params, "GET", callback);
}

function post(url, params, callback) {
    request(url, params, "POST", callback);
}

/**
 * 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @callback 回调函数
 */
function request(url, params, method, callback) {
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: rootDocment + url,
        header: header,
        method: method,
        data: params,
        success: (res) => {
            wx.hideLoading();
            return typeof callback == 'function' && callback(res.data)
        },
        fail: (e) => {
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
    getRequest: get,
    postRequest: post
}
