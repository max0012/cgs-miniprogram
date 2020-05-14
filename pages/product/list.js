
/** 产品列表页面  */
var http = require('../../utils/https.js') 

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_list: [],
        data_type:null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //设置页面顶部titile
        var data_name = options.data_name
        wx.setNavigationBarTitle({
            title: data_name
        })
        /** 页面一加载就访问服务器接口，加载商品列表 */
        var that = this;
        //上个页面传递的id
        var data_id = options.data_id
        //类型
        var type = options.data_type
        var url = '/product/byCategoryId/' + data_id

        http.getReq(url, null, function (res) {
            //将获取到的数据，存在名字叫data_list的这个数组中
            that.setData({
                data_list: res,
                //给data_type赋值，页面通过data_type判断显示样式
                data_type: type,
            }),
                console.log(res);
        })
    },

    //点击进入商品详情页
    divClick: function (e) {
        //得到页面数据
        var data_id = e.currentTarget.dataset.id
        var that = this
        wx.navigateTo({
            url: 'details?data_id=' + data_id + '&data_type=' + that.data.data_type,
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