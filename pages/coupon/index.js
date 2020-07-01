// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: null,
        type: null, //type=1:表示从下单页面跳转过来，需要收集返回信息
        totalPrice: null, //下单页面传递的价格，满足条件的优惠券才能选用
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var type = options.type
        var totalPrice = options.totalPrice
        if (type != null && type == 1) {
            this.setData({
                type: type,
                totalPrice: totalPrice
            })
        }
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
    },

    /**
     * 点击某张优惠券，返回下单页面
     */
    clickCoupon(e) {
        let pages = getCurrentPages(); // 当前页的数据，可以输出来看看有什么东西
        let prevPage = pages[pages.length - 2]; // 上一页的数据，也可以输出来看看有什么东西
        /** 设置数据 这里面的 coupon 是上一页你想被携带过去的数据，
    后面是本方法里你得到的数据，我这里是detail.value，根据自己实际情况设置 */
        var item = e.currentTarget.dataset.item
        var overPriceCanUse = item.overPriceCanUse
        var totalPrice = this.data.totalPrice
        var timestamp = Date.parse(new Date());  //当前时间
        var startTime = item.startTime  //优惠券开始时间
        var endTime = item.endTime   //优惠券结束时间
        //满足条件的优惠券才能选用
        if (totalPrice >= overPriceCanUse && startTime <= timestamp <= endTime) {
            var coupon = {
                id: item.id,
                faceValue: item.faceValue
            }
            prevPage.setData({
                coupon: coupon,
            })
            /** 返回上一页 这个时候数据就传回去了 可以在上一页的onShow方法里把 value 输出来查看是否已经携带完成 */
            wx.navigateBack(1)
        } else {
            util.toast("此优惠券不满足条件！")
        }

    }
})