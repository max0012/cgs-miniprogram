// pages/setting/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 跳转至个人资料页面
     */
    userClick() {
        wx.navigateTo({
            url: 'myInformation',
            success: function(res) {
                console.log('成功跳转至个人资料页面！');
            },
            fail: function(res) {
                console.log('跳转个人资料页面失败！');
            },
        })
    },

    /**
     * 跳转至个我的地址页面
     */
    addressClick() {
        wx.navigateTo({
            url: 'myAddress',
            success: function(res) {
                console.log('成功跳转至我的地址页面！');
            },
            fail: function(res) {
                console.log('跳转我的地址页面失败！');
            },
        })
    },

    /**
     * 跳转至意见反馈页面
     */
    feedbackClick() {
        wx.navigateTo({
            url: 'feedback',
            success: function(res) {
                console.log('成功跳转至意见反馈页面！');
            },
            fail: function(res) {
                console.log('跳转意见反馈页面失败！');
            },
        })
    }
})