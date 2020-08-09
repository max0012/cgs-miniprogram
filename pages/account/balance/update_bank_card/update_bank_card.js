// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var userInfo = wx.getStorageSync("UserInfo")
        this.setData({
            userInfo: userInfo
        })
    },

    /**
     * 更新银行卡信息
     */
    updateBankCard(e) {
        var name = e.detail.value.name
        var branch = e.detail.value.branch
        var number = e.detail.value.number
        if (!name) {
            wx.showToast({
                title: '请输入持卡人姓名!',
                icon: 'none',
                duration: 1000
            })
        } else if (!branch) {
            wx.showToast({
                title: '请输入银行支行名称!',
                icon: 'none',
                duration: 1000
            })
        } else if (!number) {
            wx.showToast({
                title: '请输入银行卡号！',
                icon: 'none',
                duration: 1000
            })
        }else {
            //更新银行卡
            var url = "/my/bankCard"
            post(url, {
                name: name,
                branch: branch,
                number: number
            }).then(res => {
                wx.showToast({
                    title: '提交成功！',
                    icon: 'none',
                    duration: 1000
                })
                //返回上个页面
                wx.navigateBack({
                    delta: 1
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
})