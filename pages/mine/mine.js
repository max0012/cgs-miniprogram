// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');
const util = app.require('utils/util.js');
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
			app.navToPage(pageName);
        } else {
            // 缓存当前页面请求连接
            util.getRouter()
            util.getUrl()
            // 跳转登录页
			app.navToPage("login");
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