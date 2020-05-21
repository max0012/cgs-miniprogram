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
        customer_list: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 根据名称模糊查询客户
     */
    likeQuery(e) {
        var keyword = e.detail.value
        var url = "/manager/searchCustomer"
        get(url, {
            PageSize: 10,
            PageIndex: 1,
            keyword: keyword
        }).then(res => {
            console.log(res);
            this.setData({
                customer_list: res.items
            })
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 选择客户
     */
    choiceCustomer(e) {
        var name = e.currentTarget.dataset.name
        console.log("name:" + name)
        wx.setStorageSync('customerName', name)
        wx.navigateBack({
            // 返回的页面数
            data: 1
        })
    }

})