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
        coupons: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var url = "/coupon"
        var params = {
            PageSize: 10,
            PageIndex: 1
        }
        get(url, {
            params: params
        }).then(res => {
            this.setData({
                coupons: res.items,
            })
            console.log("优惠券列表: " + res.items)
        }).catch(err => {
            console.log(err)
        })

    }
})