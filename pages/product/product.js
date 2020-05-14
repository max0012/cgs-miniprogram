
var http = require('../../utils/https.js')

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
    onLoad: function(options) {

        /** 页面一加载就访问服务器接口，加载初始页面 */
        var that = this;
        var url = '/productCategory'
        var params = {
            PageSize: 99,
            PageIndex: 1,
            SkipCount: 2,
            MaxResultCount: 99
        }
        http.getReq(url, params, function(res) {
            //将获取到的数据，存在名字叫list的这个数组中
            that.setData({
                    list: res.items,
                    //res代表success函数的事件对，data是固定的，list是数组
                }),
                console.log(res);
        })
    },

    imgclick: function(e) {
        //得到页面数据
        var data_id = e.currentTarget.dataset.id
        var data_type = e.currentTarget.dataset.type
        var data_name = e.currentTarget.dataset.name
        //跳转到列表页面  
        wx.navigateTo({
            url: 'list' + '?data_id=' + data_id + '&data_name=' + data_name + '&data_type=' + data_type,
            success: function(res) {
                console.log('进入产品列表页面,data_id为:' + data_id);
            },
            fail: function(res) {
                console.log('imgclick fail() !!!');
            },
        })
    },







    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})