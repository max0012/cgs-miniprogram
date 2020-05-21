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
        orderDetail :null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "订单详情"
        })
        var order_id = options.order_id
        console.log("order_id:" + order_id)
        var url = "/order/" + order_id
        get(url).then(res => {
            this.setData({
                orderDetail: res,
            })
            console.log("订单详情orderDetail: " + res)
        }).catch(err => {
            console.log(err)
        })
    },

})