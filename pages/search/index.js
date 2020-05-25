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
        detail: null,
        keyword: null,
    },

    /**
     * 搜索框事件
     */
    bindKeyInput(e) {
        var url = "/manager/search"
        var keyword = e.detail.value
        console.log("搜索关键字keyword=" + keyword)
        this.setData({
            keyword: keyword
        })
        get(url, {
            keyword: keyword
        }).then(res => {
            console.log(res);
            this.setData({
                detail: res
            })
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 查看更多客户
     */
    moreCustomer(e){
        wx.navigateTo({
            url: 'customer/searchCutomer?keyword=' + this.data.keyword,
            success: function (res) {
                console.log('成功跳转至搜索客户页面，携带参数keyword值为：' + this.data.keyword);
            },
            fail: function (res) {
                console.log('跳转搜索客户页面失败！');
            },
        })
    },

    /**
     * 查看更多事务
     */
    moreWork(e) {
        wx.navigateTo({
            url: 'work/searchWork?keyword=' + this.data.keyword,
            success: function (res) {
                console.log('成功跳转至搜索事务页面，携带参数keyword值为：' + this.data.keyword);
            },
            fail: function (res) {
                console.log('跳转搜索事务页面失败!');
            },
        })
    },

    /**
     * 查看更多产品
     */
    moreProduct(e) {
        wx.navigateTo({
            url: 'product/searchProduct?keyword=' + this.data.keyword,
            success: function (res) {
                console.log('成功跳转至搜索产品页面，携带参数keyword值为：' + this.data.keyword);
            },
            fail: function (res) {
                console.log('跳转搜索产品页面失败!');
            },
        })
    },

    /**
     * 查看更多资讯
     */
    moreNews(e) {
        wx.navigateTo({
            url: 'news/searchNews?keyword=' + this.data.keyword,
            success: function (res) {
                console.log('成功跳转至搜索资讯页面，携带参数keyword值为：' + this.data.keyword);
            },
            fail: function (res) {
                console.log('跳转搜索资讯页面失败！');
            },
        })
    }
})