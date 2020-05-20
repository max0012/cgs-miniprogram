var util = require('../../utils/util.js')
import { get,post } from '../../utils/network.js'
Page({
    data: {
        userInfo: {}
    },
    onLoad() {
        
    },
    onShow() {
        let userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            let avatarUrl = 'userInfo.avatarUrl';
            this.setData({
                userInfo: userInfo,
                [avatarUrl]: userInfo.avatarUrl ? userInfo.avatarUrl: '../../assets/mime/default.png'
            })
        }
    }
})