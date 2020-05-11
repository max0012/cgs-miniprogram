
var http = require('../../../utils/https.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var data_name = options.data_name
        wx.setNavigationBarTitle({ title: data_name })
        /** 页面一加载就访问服务器接口，加载商品列表 */
        var that = this;
        //上个页面传递的id
        var data_id = options.data_id
        var url = '/product/byCategoryId/' + data_id

        http.getReq(url, null, function (res) {
            //将获取到的数据，存在名字叫list的这个数组中
            that.setData({
                list: res,
                //res代表success函数的事件对，data是固定的，list是数组
            }),
                console.log(res);
        })
    },

    //点击进入私募产品详情页
    divClick: function (e) {
        //得到页面数据
        var data_id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: 'details?data_id=' + data_id,
            success: function (res) {
                console.log('成功跳转，携带参数id值为' + data_id);
            },
            fail: function (res) {
                console.log('imgclick fail() !!!');
            },
        })
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})