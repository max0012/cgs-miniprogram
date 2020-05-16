// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'

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
        data_id: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /** 页面一加载就访问服务器接口，加载初始页面 */
        var url = '/page/foxIndex'
        get(url).then(res => {
            //将获取到的数据，存在名字叫list的这个数组中
            this.setData({
                    data_list: res,
                }),
                console.log("选项卡信息：" + res);
            //加载第一个选项卡列表内容
            var id = res[0].id;
            this.setData({
                data_id: id,
            })
            this.getDetails();
            console.log("第一个选项:卡id:" + id);
        }).catch(err => {
            console.log(err)
        })
    },

    //用户点击tab时调用
    titleClick: function(e) {
        var idx = e.currentTarget.dataset.idx
        var id = e.currentTarget.dataset.id
        console.log("当前下标:" + idx);
        this.setData({
            currentIndex: idx,
            data_id: id
        })
        console.log("currentIndex下标:" + this.data.currentIndex);
    },

    //tab页切换后请求列表数据
    pageChange: function(e) {
        console.log("进入tab切换方法：------------id");
        this.getDetails();
    },

    //请求列表数据方法
    getDetails() {
        var id = this.data.data_id
        console.log("getDetails()方法中拿到的id:" + id)
        var details_url = "/page/" + id + "/withDetails";
        get(details_url).then(res => {
            this.setData({
                detail: res,
            })
        }).catch(err => {
            console.log(err)
        })
    },

    //进入产品详情页面
    detailClick(e) {
        var id = e.currentTarget.dataset.id
        var type = e.currentTarget.dataset.type
        wx.navigateTo({
            url: '../product/details?data_id=' + id,
            success: function(res) {
                console.log('成功跳转，携带参数id值为' + id);
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