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

export const put = (url, data) => request({
    url: domain + url,
    data: data,
    method: "PUT"
})

export const deleted = (url, data) => request({
    url: domain + url,
    data: data,
    method: "DELETE"
})

export default function request(options) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
          title: '加载中...',
        })
        wx.request({
            url: options.url,
            data: options.data || {},
            method: options.method ,
            header: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + wx.getStorageSync("Token")
            },
            success: res => {
                if(res.statusCode == 200) {
                    resolve(res.data)
                } else {
                    reject(res.data.error)
                }
                wx.hideLoading()
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                    title: '请求失败，请稍后再试',
                    icon: 'none'
                })
                reject(err)
            }
        })
    })
}