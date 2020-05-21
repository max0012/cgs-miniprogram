import {
    get,
    post
} from '../../utils/network.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        /**存放我的意向数据 */
        data_list: [],
        /**存放客户意向数据 */
        cust_list: [],
        //0：我的意向，1：客户意向
        currentIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //加载我的意向列表
        this.getDetails()
    },

    /**
     * 用户点击tab时调用
     */
    titleClick: function (e) {
        var idx = e.currentTarget.dataset.idx
        console.log("当前下标:" + idx);
        this.setData({
            currentIndex: idx,
        })
        console.log("currentIndex下标:" + this.data.currentIndex);
    },

    /**
     * tab页切换后请求列表数据
     */
    pageChange: function (e) {
        console.log("进入tab切换方法：------------id");
        this.getDetails();
    },


    /**
     * 请求列表数据方法
     */
    getDetails() {
        var index = this.data.currentIndex
        if (index == 0) {
            console.log("加载我的意向")
            //设置页面顶部titile
            wx.setNavigationBarTitle({
                title: "我的意向"
            })
            //查询我的意向列表
            get("/productIntend/sent", {
                PageSize: 10,
                PageIndex: 1,
            }).then(res => {
                this.setData({
                    data_list: res.items,
                    //res代表success函数的事件对，data是固定的，list是数组
                }),
                    console.log(res.items)
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log("加载客户意向")
            //设置页面顶部titile
            wx.setNavigationBarTitle({
                title: "客户意向"
            })
            get("/productIntend/received", {
                PageSize: 10,
                PageIndex: 1,
            }).then(res => {
                this.setData({
                    cust_list: res.items,
                    //res代表success函数的事件对，data是固定的，list是数组
                }),
                    console.log(res.items)

            }).catch(err => {
                console.log(err)
            })
        }
    },


    /**
     * 跳转某个意向详情页面
     */
    divClick(e) {
        //封装页面数据
        var item = e.currentTarget.dataset.item
        //(0为我的意向，1为客户意向)
        var flag = this.data.currentIndex
        var detail = {
            id: item.id,
            quantity: item.quantity,
            customerMobile: item.customerMobile,
            customerName: item.customerName,
            productManagerId: item.product.manager.id,
            senderManagerName: item.senderManager.name,
            senderManagerMobile: item.senderManager.mobile,
            senderManagerAvatarUrl: item.senderManager.avatarUrl,
            receiverManagerName: item.receiverManager.name,
            receiverManagerMobile: item.receiverManager.mobile,
            receiverManagerAvatarUrl: item.receiverManager.avatarUrl,
            commissionText: item.product.commissionText,
            coverUrl: item.product.coverUrl,
            name: item.product.name,
            creationTime: item.creationTime,
            status: item.status,
            description: item.description,
            flag: flag,
            lastDialogIsReceiver: item.lastDialogIsReceiver

        }
        wx.navigateTo({
            url: 'intention_details?detail=' + JSON.stringify(detail),
            success: function (res) {
                console.log('成功跳转，携带参数customerName为' + detail.customerName);
            },
            fail: function (res) {
                console.log('imgclick fail() !!!');
            },
        })
    }


})