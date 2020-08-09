// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //提现列表
        withdraws: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(options) {
        var url = "/managerWithdraw/currentManager"
        get(url, {
            PageSize: 10,
            PageIndex: 1
        }).then(res => {
            this.setData({
                withdraws: res.items
            })
        }).catch(err => {
            console.log(err)
        })
    },

   /**
     * 生命周期函数--监听页面加载
     */
    withdrawDetail(e){
        var id = e.currentTarget.dataset.id
		app.navToPage("withdraw_details", `id=${id}`);
    }
})