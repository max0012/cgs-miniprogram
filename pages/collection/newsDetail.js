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
        newsDetail: null,
        userInfo: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var userInfo = wx.getStorageSync("UserInfo")
        this.setData({
            userInfo: userInfo
        })
        var news_id = options.news_id
        console.log("资讯详情页面得到的id为: " + news_id)
        //获取一条资讯及评论
        var url = "/news/"+ news_id +"/withDetails" 
        get(url).then(res => {
            this.setData({
                newsDetail: res,
            })
            console.log("资讯详情: " + res)
            //资讯详情中的正文content（为html,需要在这里转换）
            var content = res.content;
            WxParse.wxParse('content', 'html', content, this, 5);
        }).catch(err => {
            console.log(err)
        })

    }
})