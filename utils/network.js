/**
 * 服务器请求地址
 */
const domain = "http://app.imcfp.com/api/app"

export const get = (url, data) => request({
    url: domain + url,
    data: data,
    method: "GET"
})

export const post = (url, data) => request({
    url: domain + url,
    data: data,
    method: "POST"
})

export default function request(options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: options.url,
            data: options.data || {},
            method: options.method || 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': "Bearer " + wx.getStorageSync("token")
            },
            success: function(res) {
                if(res.statusCode == 200) {
                    resolve(res.data)
                } else {
                    reject(res.errMsg)
                }
            },
            fail: function(err) {
                wx.showToast({
                    title: '数据请求失败，情稍后再试',
                    icon: 'none'
                })
                reject(err)
            }
        })
    })
}