// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data_list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //设置页面顶部titile
        let data_name = options.data_name
        wx.setNavigationBarTitle({ title: data_name })
        /** 页面一加载就访问服务器接口，加载商品列表 */
        //上个页面传递的id
        get('/product/byCategoryId/' + options.data_id).then(res => {
            //将获取到的数据，存在名字叫data_list的这个数组中
            this.setData({
				data_list: res,
			}),
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    },

    //点击进入商品详情页
    divClick(e) {
        //得到页面数据
        let data_id = e.currentTarget.dataset.id
        app.navToPage("product_detail", `data_id=${data_id}`);
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})