// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        yearlyReputation: null,
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
        var url = "/my/yearlyReputation"
        //获取年份  
        var timestamp = Date.parse(new Date());
        var date = new Date(timestamp);
        var year = date.getFullYear()
        //查询我的年度信誉值
        get(url, {
            year: year
        }).then(res => {
            this.setData({
                yearlyReputation: res,
            })
            console.log("我的年度信誉值：" + res)
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 查看什么是信誉值
     */
    reputationClick(e){
        wx.navigateTo({
            url: 'reputation',
            success: function (res) {
                console.log('成功跳转');
            },
            fail: function (res) {
                console.log('跳转失败');
            },
        })
    }
})