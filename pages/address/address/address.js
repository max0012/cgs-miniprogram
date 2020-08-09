// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');
const util = app.require('utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: null,
        type: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(options) {
        // 获取当前小程序的页面栈
        let pages = getCurrentPages();
        // 数组中索引最大的页面--当前页面
        let currentPage = pages[pages.length - 1];
        // 打印出当前页面中的 options
        console.log(currentPage.options)
        var type = currentPage.options.type
        //从订单页面过来拉取收货地址
        if (type != null && type == 1) {
            this.setData({
                type: type
            })
        }

        //获取收货列表
        var url = "/orderReceiver"
        var params = {
            PageSize: 2,
            PageIndex: 1,
        }
        get(url, {
            params: params,
            keyword: ''
        }).then(res => {
            this.setData({
                addressList: res.items,
            })
            if (res.items.length == 0) {
                util.toast("没有数据！")
            }
            console.log("addressList====" + res.items);
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 添加地址
     */
    addAddress(e) {
		app.navToPage("update_address", "type=1");
    },

    /**
     * 修改地址
     */
    updateAddress(e) {
        var item = e.currentTarget.dataset.item;
        app.navToPage("update_address", `type=2&address=${JSON.stringify(item)}`);
    },

    /**
     * 将收货人信息返回给下单页面
     */
    clickView(e) {
        let pages = getCurrentPages(); // 当前页的数据，可以输出来看看有什么东西
        let prevPage = pages[pages.length - 2]; // 上一页的数据，也可以输出来看看有什么东西
        /** 设置数据 这里面的 value 是上一页你想被携带过去的数据，
    后面是本方法里你得到的数据，我这里是detail.value，根据自己实际情况设置 */
        var item = e.currentTarget.dataset.item
        var value = {
            name: item.name,
            mobile: item.mobile,
            address: item.address,
            provinceId: item.provinceId,
            cityId: item.cityId,
            districtId: item.districtId,
            province: item.province,
            city: item.city,
            district: item.district,
            orderReceiverId: item.id
        }
        prevPage.setData({
            value: value,
        })
        /** 返回上一页 这个时候数据就传回去了 可以在上一页的onShow方法里把 value 输出来查看是否已经携带完成 */
        wx.navigateBack(1)
    }
})