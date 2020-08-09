// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //上个页面传递的值
        detail: null,
        //将状态字段值提出来，方便修改
        status: null,
        //某个意向的消息列表
        dialogs: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "意向详情"
        })

        //上个页面传递的数据 
        this.setData({
            detail: JSON.parse(options.detail)
        })
        this.setData({
            status: this.data.detail.status
        })
        console.log("上个页面传递的数据：" + JSON.parse(options.detail))
        //加载意向的消息列表
        var id = this.data.detail.id
        get("/productIntend/dialogs/" + id, {
            PageSize: 10,
            PageIndex: 1
        }).then(res => {
            console.log("意向消息列表:" + res.items)
            this.setData({
                dialogs: res.items
            })
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 是否关闭意向
     */
    closeIntention(e) {
        var id = e.currentTarget.dataset.id
        console.log("delete:" + id)
        wx.showModal({
            title: '确认关闭意向吗',
            success: res => {
                //确认关闭
                if (res.confirm) {
                    console.log('用户点击确定')
                    post("/productIntend/" + id + "/close").then(res => {
                        //将status改为Closed（已关闭）
                        this.setData({
                            status: 'Closed'
                        })
                        console.log("已经关闭此意向！")
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    /**
     * 提交一条回复消息
     */
    commitDialog(e) {
        //当前产品经理id
        var productManagerId = this.data.detail.productManagerId
        //当前登录用户Id
        var user = wx.getStorageSync("UserInfo")
        var userId = user.id
        var lastDialogIsReceiver = this.data.detail.lastDialogIsReceiver
        var flag = this.data.detail.flag
        //我的意向
        if (flag === 0) {
            //如果当前登录用户就是此产品的顾问或产品顾问已回复
            if(productManagerId === userId || lastDialogIsReceiver){
                console.log("我的意向中提交我的回复。。。。")
            }else{
                console.log("你已经发言过了，需要等对方回复")
            }

        //客户意向
        } else {
            //当前登录用户（即此产品顾问没回复时）
            if (!lastDialogIsReceiver){
                console.log("客户意向中提交顾问回复.......")
            }else{
                console.log("你已经发言过了，需要等对方回复")
            }
        }

    }
})