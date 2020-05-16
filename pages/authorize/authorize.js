import {
    get,
    post
} from '../../utils/network.js'

Page({
    data: {

    },
    onLoad(options) {
        const accountInfo = wx.getAccountInfoSync();

        // 获取用户授权code
        wx.login({
            success: res => {
                console.log("code=" + res.code)
            }
        })
    },
    handleGetUserInfo(event) {
        console.log(event)
    }
})