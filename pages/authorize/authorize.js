// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

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