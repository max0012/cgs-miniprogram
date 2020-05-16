// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'
// 引入wxParse解析html
var WxParse = require('../../wxParse/wxParse.js');

/**
 * WxParse.wxParse(bindName , type, data, target,imagePadding)
 * 1.bindName绑定的数据名(必填)
 * 2.type可以为html或者md(必填)
 * 3.data为传入的具体数据(必填)
 * 4.target为Page对象,一般为this(必填)
 * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
 */

Page({
    /** 
     * 页面的初始数据 
     */
    data: {
        //商品详情
        detail: null,
        //营销小技巧
        productTips: null,
        //是否显示指示点 
        indicatordots: true,
        //指示点颜色 
        indicatorcolor: "white",
    },

    /** 
     * 生命周期函数--监听页面加载 
     */
    onLoad(e) {
        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "产品详情"
        })
        /** 页面一加载就加载商品详情 */
        //营销小提示分页数据，当前页面只需要两条
        var tipsParams = {
            PageSize: 2,
            PageIndex: 1,
        }
        //上个页面传递的id 
        var data_id = e.data_id
        var detailUrl = '/product/' + data_id + '/withDetails'
        var tipsUrl = '/productTips/byProductId/' + data_id

        //获取产品详情方法
        get(detailUrl).then(res => {
                //将获取到的数据，存在名字叫detail的这个对象中 
                this.setData({
                        detail: res,
                    }),
                    console.log(res);
                //产品详情中的图片路径（为html,需要在这里转换）
                var description = res.description;
                WxParse.wxParse('description', 'html', description, this, 5);
        }).catch(err => {
            console.log(err)
        }),

            //加载营销小提示方法
            get(detailUrl, tipsParams).then(res => {
                this.setData({
                        productTips: res.items,
                    }),
                    console.log("productTips====" + res.items);
        }).catch(err => {
            console.log(err)
        })
    },

    //查看营销小技巧事件
    tipsClick(e) {
        //得到页面数据
        var data_id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: 'productTips?data_id=' + data_id,
            success: function(res) {
                console.log('成功跳转，携带参数data_id值为' + data_id);
            },
            fail: function(res) {
                console.log('tipsClick fail() !!!');
            },
        })
    },

    /** 
     * 用户点击右上角分享 
     */
    onShareAppMessage() {

    }
})