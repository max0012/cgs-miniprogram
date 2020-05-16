import {
    get,
    post
} from '../../../utils/network.js'
Page({
    data: {
        mobile: '',
        code: ''
    },
    onLoad: function(options) {
        this.setData({
            mobile: options.mobile
        })
    },
    bindKeyInput(e) {
        this.setData({
            code: e.detail.value
        })
    },
    logOn() {
        post("/manager/logOn", {
            mobile: this.data.mobile,
            code: this.data.code
        }).then(res => {
            // 存储数据
            wx.setStorageSync("token", res.token)
            wx.setStorageSync("userInfo", res.manager)
            // 默认跳转到“我的”页面
            wx.switchTab({
                url: '../../mime/mime',
            })
        }).catch(err => {
            console.log(err)
        })
    }
})