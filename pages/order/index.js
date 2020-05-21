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
        //选项卡
        data_list: [{
            name: '全部',
            paramData: '',
        }, {
            name: '待付款',
                paramData: 'BeforePayment',
        }, {
            name: '代发货',
                paramData: 'BeforeShipping',
        }, {
            name: '待收货',
                paramData: 'BeforeReceive',
        }, {
            name: '已签收',
                paramData: 'Confirm',
        }],
        //某一个选项卡详情
        orders: null,
        //默认选择下标为0的tab项
        currentIndex: 0,
        //当前请求的tab项状态
        status: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //默认加载全部
        this.getDetails();
    },

    //用户点击tab时调用
    titleClick(e) {
        var idx = e.currentTarget.dataset.idx
        var status = e.currentTarget.dataset.status
        console.log("当前下标:" + idx);
        this.setData({
            currentIndex: idx,
            status: status
        })
        console.log("当前订单选项卡currentIndex下标:" + this.data.currentIndex);
    },

    //tab页切换后请求列表数据
    pageChange(e) {
        console.log("进入tab切换方法：------------id");
        this.getDetails();
    },

    //请求订单列表数据方法
    getDetails() {
        var url = "/my/orders";
        var params = {
            PageSize: 10,
            PageIndex: 1,
        }
        var status = this.data.status
        get(url,{
            params: params,
            status: status
        }).then(res => {
            this.setData({
                orders: res.items,
            })
        }).catch(err => {
            console.log(err)
        })
    },

    //进入订单详情页面
    orderClick(e) {
        var id = e.currentTarget.dataset.id
        var type = e.currentTarget.dataset.type
        wx.navigateTo({
            url: 'orderDetail?order_id=' + id,
            success: function(res) {
                console.log('成功跳转，携带参数order_id值为' + id);
            },
            fail: function(res) {
                console.log('imgclick fail() !!!');
            },
        })
    },


    
})