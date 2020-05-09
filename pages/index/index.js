//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var url = app.apiUrl + '/advertisement'
    var params = {
      PageSize: 20,
      PageIndex: 1,
      SkipCount: 2,
      MaxResultCount: 20
    }
      wx.request({
          url: url,
          method: 'GET',
          data: params,
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
              console.log(res.data);
          },
          fail: function (res) {
              console.log(res.data);
          },
          complete: function (res) {
              console.log(res.data);
          }
      })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    /**
    * 接口调用成功处理
    */
    successFun: function (res, selfObj) {
        console.log('failFun', res)
    },
    /**
     * 接口调用失败处理
     */
    failFun: function (res, selfObj) {
        console.log('failFun', res)
    },
})
