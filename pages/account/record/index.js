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
        wx.navigateTo({
            url: 'withdrawDetails?id=' + id,
            success: function (res) {
                console.log('成功跳转至提现详情页面，携带参数id值为' + id);
            },
            fail: function (res) {
                console.log('跳转提现详情页面失败!');
            },
        })
    }
})