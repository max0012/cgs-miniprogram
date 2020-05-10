var http = require('../../../utils/https.js')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        detail: null,
        //是否显示指示点
        indicatordots: true,
        //指示点颜色
        indicatorcolor:"white"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /** 页面一加载就访问服务器接口，加载商品列表 */
        var that = this;
        //上个页面传递的id
        var data_id = options.data_id
        var url = '/product/' + data_id + '/withDetails'

        http.getReq(url, null, function(res) {
            //将获取到的数据，存在名字叫detail的这个对象中
            that.setData({
                    hidden: true,
                    detail: res,
                }),
                console.log(res);
        })
    },


    onSlideChange: function (event) {
        var postId = event.detail.current;
        console.log(postId);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})