var http = require('../../utils/https.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //选项卡集合
        data_list: [],
        //某一个选项卡详情
        detail: null,
        //默认选择下标为0的tab项
        currentIndex: 0,
        data_id : null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /** 页面一加载就访问服务器接口，加载初始页面 */
        var that = this;
        var url = '/page/foxIndex'
        http.getReq(url, null, function(res) {
            //将获取到的数据，存在名字叫list的这个数组中
            that.setData({
                    data_list: res,
                }),
                console.log("选项卡信息：" + res);
            //加载第一个选项卡列表内容
            var id = res[0].id;
            that.setData({
                data_id: id, 
            })
            that.getDetails();
            console.log("第一个选项:卡id:" + id);

        })
    },

    //用户点击tab时调用
    titleClick: function(e) {
        var that = this
        var idx = e.currentTarget.dataset.idx
        var id = e.currentTarget.dataset.id
        console.log("当前下标:" + idx);
        that.setData({
            currentIndex: idx,
            data_id : id
        })
        console.log("currentIndex下标:" + that.data.currentIndex);
    },

    //tab页切换后请求列表数据
    pageChange: function(e) {
        console.log("进入tab切换方法：------------id");
        var that = this 
        that.getDetails();
    },

    //请求列表数据方法
    getDetails() {
        var that = this
        var id = that.data.data_id 
        console.log("getDetails()方法中拿到的id:" + id)
        var details_url = "/page/" + id + "/withDetails";
        http.getReq(details_url, null, function(e) {
            that.setData({
                detail: e,
            })
        })
    },

    //进入产品详情页面
    detailClick(e) {
        var that = this
        var id = e.currentTarget.dataset.id
        var type = e.currentTarget.dataset.type
        wx.navigateTo({
            url: '../product/details?data_id=' + id ,
            success: function (res) {
                console.log('成功跳转，携带参数id值为' + id);
            },
            fail: function (res) {
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