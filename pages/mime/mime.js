var util = require('../../utils/util.js')
import {
    get,
    post
} from '../../utils/network.js'
var app = getApp()
Page({
    data: {
        userInfo: {}
    },
    onLoad() {
        get("/productIntend/sent", {
            PageSize: 20,
            PageIndex: 1
        }).then(res => {
            console.log("测试我的意向接口")
            console.log(res)
        })
    },
    onShow() {
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            this.setData({
                userInfo: userInfo
            })
        } else {
            // 未登录
        }
    }
})