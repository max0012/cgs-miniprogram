var util = require('../../utils/util.js')
import {
    get,
    post
} from '../../utils/network.js'
var app = getApp()
Page({
    data: {
        userInfo: {},
        isLogOn: false,
        myAccount: [],
        myServices: [{
            title: '我的订单',
            iconUrl: 'my-order',
            paramData: 'order',
            serviceFun: 'toManagerPage'
        }, {
            title: '我的权益',
            iconUrl: 'my-interests',
            paramData: 'equity',
            serviceFun: 'toManagerPage'
        }, {
            title: '我的收藏',
            iconUrl: 'my-collection',
            paramData: 'collection',
            serviceFun: 'toManagerPage'
        }, {
            title: '优惠券',
            iconUrl: 'my-coupon',
            paramData: 'coupon',
            serviceFun: 'toManagerPage'
        }, {
            title: '专属客服',
            iconUrl: 'my-services',
            paramData: '13148973789',
            serviceFun: 'makePhoneCall'
        }, {
            title: '我的设置',
            iconUrl: 'setting',
            paramData: 'setting',
            serviceFun: 'toManagerPage'
        }, {
            title: '',
            iconUrl: ''
        }, {
            title: '',
            iconUrl: ''
        }]
    },
    onShow() {
        let userInfo = wx.getStorageSync("UserInfo");
        if (userInfo) {
            this.setData({
                isLogOn: true,
                userInfo: userInfo
            })
        }
    },
    // 跳转我的服务/我的账户
    toManagerPage(e) {
        // 检查用户是否登录
        if (this.data.isLogOn) {
            let pageName = e.currentTarget.dataset.paramData;
            wx.navigateTo({
                url: '../' + pageName + '/index'
            })
        } else {
            // 缓存当前页面请求连接
            util.getRouter()
            util.getUrl()
            // 跳转登录页
            wx.navigateTo({
                url: '../login/login'
            })
        }
    },
    // 联系专属客服
    makePhoneCall(e) {
        let phoneNumber = e.currentTarget.dataset.paramData;
        wx.makePhoneCall({
          phoneNumber: phoneNumber,
          success: () => {
              console.log("拨打电话成功")
          }
        })
    }
})