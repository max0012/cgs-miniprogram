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
        list: [],
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        /** 页面一加载就访问服务器接口，加载初始页面 */
        var url = '/productCategory'
        var params = {
            PageSize: 99,
            PageIndex: 1,
        }
        get(url, params).then(res => {
            //将获取到的数据，存在名字叫list的这个数组中
            this.setData({
                    list: res.items,
                    //res代表success函数的事件对，data是固定的，list是数组
                }),
                console.log(res);
        }).catch(err => {
            console.log(err)
        })
    },

    imgclick(e) {
        //得到页面数据
        var data_id = e.currentTarget.dataset.id
        var data_name = e.currentTarget.dataset.name
        //跳转到列表页面  
        wx.navigateTo({
            url: 'list' + '?data_id=' + data_id + '&data_name=' + data_name,
            success: function(res) {
                console.log('进入产品列表页面,data_id为:' + data_id);
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