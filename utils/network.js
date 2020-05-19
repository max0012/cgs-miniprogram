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
            method: options.method ,
            header: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + wx.getStorageSync("token")
            },
            success: res => {
                if(res.statusCode == 200) {
                    resolve(res.data)
                } else {
                    reject(res.data.error)
                }
            },
            fail: err => {
                wx.showToast({
                    title: '请求失败，情稍后再试',
                    icon: 'none'
                })
                reject(err)
            }
        })
    })
}