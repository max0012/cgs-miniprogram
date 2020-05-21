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
        product: null,
        customerName: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "联系产品顾问"
        })
        //上个页面传递的数据 
        this.setData({
            product: JSON.parse(options.product)
        })
    },

    /**
     * 选择客户
     */
    searchCustomer(e) {
        wx.navigateTo({
            url: "../search/searchCustomer",
        })
    },

    /**
     * 模糊查询客户后从缓存中取出值
     */
    onShow(e) {
        var customerName = wx.getStorageSync('customerName')
        wx.removeStorageSync("customerName")
        this.setData({
            customerName: customerName
        })
    },

    /**
     * 点击提交按钮
     */
    commitIntention(e) {
        var customerName = e.detail.value.customerName
        var customerMobile = e.detail.value.customerMobile
        var quantity = e.detail.value.quantity
        var description = e.detail.value.description
        var productId = this.data.product.productId
        var receiverManagerId = this.data.product.receiverManagerId
        var user = wx.getStorageSync("UserInfo")
        var senderManagerId = user.id
        var jsonParams = {
            productId: productId,
            customerName: customerName,
            customerMobile: customerMobile,
            quantity: quantity,
            description: description,
            receiverManagerId: receiverManagerId,
            status: "Submitted",
            senderManagerId: senderManagerId

        }
        var url = "/productIntend"
        post(url, jsonParams).then(res => {
            console.log(res)
            
        }).catch(err => {
            console.log(err)
        })
    }

})