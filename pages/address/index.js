// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'
const util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(options) {
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
            if(res.items.length == 0){
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
    addAddress(e){
        wx.navigateTo({
            url: "updateAddress?type=1",
        })
    },

    /**
     * 修改地址
     */
    updateAddress(e) {
        var item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: "updateAddress?type=2&address=" + JSON.stringify(item),
        })
    }
})