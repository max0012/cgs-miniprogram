const app = getApp();
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
        app.navToPage("my_info");
    },

    /**
     * 跳转至个我的地址页面
     */
    addressClick() {
        app.navToPage("address");
    },

    /**
     * 跳转至意见反馈页面
     */
    feedbackClick() {
        app.navToPage("feedback");
    }
})