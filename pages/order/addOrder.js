// pages/order/addOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: null,
        num: null,
        minusStatus: null,
        plusStatus: null,
        value: null,   //选择的收货人地址信息
        coupon:null,    //选择的优惠券信息
        addressFlag: true,  //addressFlag=true:未选择地址
        couponFlag: true,  //couponFlag=true:未选择优惠券
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var detail = JSON.parse(options.detail)
        var num = options.num
        var inventory = detail.inventory
        // 减号，只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 加号，只有小于库存的时候，才能normal状态，否则disable状态
        var plusStatus = num >= inventory ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            detail: detail,
            num: num,
            minusStatus: minusStatus,
            plusStatus: plusStatus
        });
    },
    /* 点击减号 */
    bindMinus: function() {
        var num = this.data.num;
        // 如果大于1时，才可以减
        if (num > 1) {
            num--;
        } else {
            wx.showToast({
                title: '数量最少为一',
                icon: 'none',
                duration: 2000
            })
        }
        // 减号，只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 点击加号 */
    bindPlus: function() {
        var num = this.data.num;
        var inventory = this.data.detail.inventory
        // 数量不超过库存
        if (num < inventory) {
            num++;
        } else {
            wx.showToast({
                title: '数量超过范围！',
                icon: 'none',
                duration: 2000
            })
        }
        // 加号，只有小于库存的时候，才能normal状态，否则disable状态
        var plusStatus = num >= inventory ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            plusStatus: plusStatus
        });
    },
    /* 输入框事件 */
    bindManual: function(e) {
        var num = e.detail.value;
        var inventory = this.data.detail.inventory
        if (num > inventory) {
            wx.showToast({
                title: '数量超过范围！',
                icon: 'none',
                duration: 2000
            })
            num = inventory;
        }
        // 减号，只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 加号，只有小于库存的时候，才能normal状态，否则disable状态
        var plusStatus = num >= inventory ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus,
            plusStatus: plusStatus
        });
    },

    /**
     * 跳转到收货地址页面
     */
    receiverList(e) {
        wx.navigateTo({
            url: "../address/index?type=1",
        })
    },

    /**
     * 接收上个页面返回后携带的值 
     * */
    onShow(e) {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];

        //地址选择页面
        var value = currPage.data.value
        console.log(value)
        if (value != null) {
            this.setData({
                addressFlag: false,
                value: value
            })
        }
        //优惠券选择页面
        var coupon = currPage.data.coupon
        console.log(coupon)
        if(coupon != null){
            this.setData({
                couponFlag: false,
                coupon: coupon
            })
        }
    },

    /**
     * 跳转至优惠券页面
     * */
    getCoupon(e) {
        var totalPrice = this.data.num * this.data.detail.upperPrice
        wx.navigateTo({
            url: "../coupon/index?type=1&totalPrice=" + totalPrice,
        })
    }


})