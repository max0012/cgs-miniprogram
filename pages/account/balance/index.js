// 导入封装的request请求.js
import {
    get,
    post
} from '../../../utils/network.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        //需提现的金额
        money: null,
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow(options) {
        var userInfo = wx.getStorageSync("UserInfo")
        this.setData({
            userInfo: userInfo
        })
    },

    /**
     * 更新银行卡
     */
    bankCardClick(e) {
        console.log("")
        wx.navigateTo({
            url: 'updateBankCard',
            success: function(res) {
                console.log('成功跳转至更新银行卡页面');
            },
            fail: function(res) {
                console.log('跳转更新银行卡页面失败！');
            },
        })
    },
    /**
     * 输入提现金额输入框
     */
    withdrawInput(e) {
        this.setData({
            money: e.detail.value
        })
    },

    /**
     * 申请提现
     */
    commitWithdraw(e) {
        //申请的提现金额
        var money = this.data.money
        //可提现的金额
        var balance = this.data.userInfo.balanceWithdrawAvailable
        if (!money) {
            wx.showToast({
                title: '请输入提现金额',
                icon: 'none',
                duration: 1000
            })
        } else if (balance < money) {
            wx.showToast({
                title: '提现金额超出范围',
                icon: 'none',
                duration: 1000
            })
        } else {
            var url = "/managerWithdraw/submit?money=" + parseInt(money)
            post(url).then(res => {
                wx.showToast({
                    title: '提交申请成功',
                    icon: 'none',
                    duration: 1000
                })
                this.toRecord()
            }).catch(err => {
                console.log(err)
            })
        }
    },

    /**
     * 跳转到提现记录页面
     */
    toRecord() {
        wx.navigateTo({
            url: '../record/index',
            success: function(res) {
                console.log('成功跳转至提现记录页面');
            },
            fail: function(res) {
                console.log('跳转提现记录页面失败！');
            },
        })
    }

})