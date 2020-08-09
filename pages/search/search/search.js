// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

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
        app.navToPage("search_cutomer", `keyword=${this.data.keyword}`);
    },

    /**
     * 查看更多事务
     */
    moreWork(e) {
        app.navToPage("search_work", `keyword=${this.data.keyword}`);
    },

    /**
     * 查看更多产品
     */
    moreProduct(e) {
        app.navToPage("search_product", `keyword=${this.data.keyword}`);
    },

    /**
     * 查看更多资讯
     */
    moreNews(e) {
        app.navToPage("search_news", `keyword=${this.data.keyword}`);
    }
})