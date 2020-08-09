// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        withdrawDetail: null,
        id: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var id = options.id
        this.setData({
            id: id
        })
        var url = "/managerWithdraw/" + id + "/withDetails"
        get(url).then(res => {
            this.setData({
                withdrawDetail: res
            })
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 取消一个提现
     */
    cancelWithdraw(e) {
        //确定框
        wx.showModal({
            title: '确定取消提现？',
            success: res => {
                if (res.confirm) {
                    console.log('用户点击确定')
                    //取消提现
                    var id = this.data.id
                    var url = "/managerWithdraw/" + id + "/cancel"
                    post(url).then(res => {
                        wx.showToast({
                            title: '取消提现成功!',
                            icon: 'none',
                            duration: 1000
                        })
                        //返回列表页面
                        wx.navigateBack({
                            delta: 1
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})