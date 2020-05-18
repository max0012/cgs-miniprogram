var util = require('../../utils/util.js')
import { get,post } from '../../utils/network.js'
Page({
    data: {
        userInfo: {}
    },
    onLoad() {
        
    },
    onShow() {
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            this.setData({
                userInfo: userInfo
            })
        }
    }
})