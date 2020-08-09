// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        feedbackInput: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "意见反馈"
        })
    },

    /**
     * 意见输入框
     */
    feedbackInput(e){
        this.setData({
            feedbackInput: e.detail.value
        })
    },

    /**
     * 提交反馈
     */
    feedbackCommit(e) {
        var feedbackInput = this.data.feedbackInput
        var userInfo = wx.getStorageSync("UserInfo")
        var id = userInfo.id
        //输入框没值则不提交
        if(!feedbackInput) {
            wx.showToast({
                title: '请输入内容',
                icon: 'none',
                duration: 1000
            })
        }else {
            var url = "/my/feedback"
            post(url,{
                content: feedbackInput,
                creatorId: id,
                creationTime: new Date(),
                id: ""
            }).then(res => {
                wx.showToast({
                    title: '提交成功！',
                    icon: 'success',
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