// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        favoriteNews: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //加载我的收藏
        var url = "/managerFavoriteNews/currentManager"
        var params = {
            PageSize: 10,
            PageIndex: 1
        }
        get(url, {
            params: params
        }).then(res => {
            this.setData({
                favoriteNews: res.items,
            })
            console.log("收藏列表: " + res)
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 资讯详情
     */
    newsClick(e) {
        //得到页面数据
        var news_id = e.currentTarget.dataset.id
        app.navToPage("news_detail", `news_id=${news_id}`);
    }
})