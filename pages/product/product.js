// pages/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /** 页面一加载就访问服务器接口，加载初始页面 */
    wx.request({
      url: 'http://www.hengyishun.cn/login/login', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          list: res.data,
          //res代表success函数的事件对，data是固定的，list是数组
        }),
        console.log('调用接口测试。。。'),
        wx.showToast({
          title: '成功！',
          icon:'success'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})