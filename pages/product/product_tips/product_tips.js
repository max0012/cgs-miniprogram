// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        dataList: [], //放置返回数据的数组
        loadMore: false, //"上拉加载"的变量，默认false，隐藏  
        loadAll: false, //“没有数据”的变量，默认false，隐藏 
        pageSize: 1,
        pageIndex: 1,
        tipsUrl: '/productTips/byProductId/',
        data_id: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad(e) {
        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "营销小技巧"
        })
        //保存上个页面传递的id 
        this.setData({
            data_id: e.data_id,
        });
        //加载营销小提示方法
        this.getData();
    },
    //滚动到底部触发事件
    searchScrollLower: function() {
        console.log("上拉触底事件")
        if (!this.data.loadMore) {
            this.setData({
                loadMore: true, //加载中  
                loadAll: false //是否加载完所有数据
            });
            //加载更多
            console.log("加载更多中.............")
            this.getData();
        }

    },

    //加载数据的方法
    getData() {
        //第一次加载数据 
        if (this.data.pageIndex == 1) {
            this.setData({
                loadMore: true, //把"上拉加载"的变量设为true，显示  
                loadAll: false //把“没有数据”设为false，隐藏  
            })
        }
        //请求数据
        var url = this.data.tipsUrl + this.data.data_id
        var params = {
            PageSize: this.data.pageSize,
            PageIndex: this.data.pageIndex
        }
        get(url, params).then(res => {
            if (res.items && res.items.length > 0) {
                console.log("请求成功", res.items)
                //把新请求到的数据添加到dataList里  
                let list = this.data.dataList.concat(res.items)
                this.setData({
                    dataList: list, //获取数据数组  
                    pageIndex: this.data.pageIndex + 1,
                    loadMore: false //把"上拉加载"的变量设为false，显示  
                });
                if (res.items.length < this.data.pageSize) {
                    this.setData({
                        loadMore: false, //隐藏加载中。。
                        loadAll: true //所有数据都加载完了
                    });
                }
            } else {
                this.setData({
                    loadAll: true, //把“没有数据”设为true，显示  
                    loadMore: false //把"上拉加载"的变量设为false，隐藏  
                });
            }
        }).catch(err => {
            console.log(err)
        })

    }

})