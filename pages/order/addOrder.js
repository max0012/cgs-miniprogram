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
    receiverList(e){
        wx.navigateTo({
            url: "../address/index",
        })
    }
})