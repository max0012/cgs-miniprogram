let rootUrl = "http://app.imcfp.com";//具体接口域名根据你的实际情况填写
//get请求
function getData(url, data, cb) {
    wx.request({
        url: rootUrl + url,
        data: data,
        method: 'get',
        header: {
            "Content-Type": "json"
        },
        success: function (res) {
            return typeof cb == "function" && cb(res.data)
        },
        fail: function () {
            return typeof cb == "function" && cb(false)
        }
    })
}
//post请求
function postData(url, data, cb) {
    wx.request({
        url: rootUrl + url,
        data: data,
        method: 'post',
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
            return typeof cb == "function" && cb(res.data)
        },
        fail: function () {
            return typeof cb == "function" && cb(false)
        }
    })
}
module.exports = {
    req: getData, //暴露一个方法
    req: postData
}