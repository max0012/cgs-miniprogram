// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

// 引入wxParse解析html
const WxParse = app.require('wxParse/wxParse.js')
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
        //用于存储窗口信息，高度、宽度等
        systemInfo: {},
        //定位跳转的view的id
        toView: '',
        //上个页面传递的id
        news_id: null,
        //某条资讯及评论
        newsDetail: null,
        //评论列表
        newsComments: null,
        userInfo: null,
        //资讯评论输入框内容
        newsComment: null,
        //0:第一次加载
        flag: 0,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //设置页面
        wx.getSystemInfo({ //获取屏幕高度宽度等信息
            success: res => {
                this.setData({
                    systemInfo: res
                })
            },
        })
        var userInfo = wx.getStorageSync("UserInfo")
        this.setData({
            userInfo: userInfo
        })
        var news_id = options.news_id
        this.setData({
            news_id: news_id
        })
        console.log("资讯详情页面得到的id为: " + news_id)
        this.newsDetails()
    },

    /**
     * 获取一条资讯及评论
     */
    newsDetails() {
        var news_id = this.data.news_id
        var url = "/news/" + news_id + "/withDetails"
        var flag = this.data.flag
        get(url).then(res => {
            //第一次加载
            if (flag == 0) {
                this.setData({
                    newsDetail: res,
                    newsComments: res.newsComments
                })
                console.log("资讯详情: " + res)
                //资讯详情中的正文content（为html,需要在这里转换）
                var content = res.content;
                WxParse.wxParse('content', 'html', content, this, 5);
                //只加载评论
            } else {
                this.setData({
                    newsComments: res.newsComments
                })
            }
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 评论输入框
     */
    newsCommentClick(e) {
        this.setData({
            newsComment: e.detail.value
        })
    },

    /**
     * 提交一条评论
     */
    commitComment(e) {
        var newsComment = this.data.newsComment
        //评论框没有内容
        if (!newsComment) {
            wx.showToast({
                title: "请输入评论内容",
                icon: 'none',
                duration: 1000,
                mask: true
            })
        //评论框有内容
        } else {
            //提交一条评论
            var newsId = this.data.newsDetail.id
            var userInfo = wx.getStorageSync("UserInfo")
            var managerId = userInfo.id
            var url = "/comment/" + newsId + "/byNewsId/" + managerId + "?content=" + newsComment
            post(url).then(res => {
                console.log("评论成功！")
                wx.showToast({
                    title: "评论发表成功",
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                })
                //评论发表成功后重新加载评论列表并清空input框的值
                this.setData({
                    flag: 1,
                    newsComment: null
                })
                this.newsDetails()
                //定位到最后一条评论位置
                this.setData({
                    toView: "hash1"
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }
})