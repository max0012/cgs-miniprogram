// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');
const util = app.require('utils/util.js');

Page({
    data: {
        data_list: [],
    },
    onLoad(options) {
        //设置页面顶部titile
        let data_name = options.data_name
        wx.setNavigationBarTitle({ title: data_name })
        /** 页面一加载就访问服务器接口，加载商品列表 */
        //上个页面传递的id
        get('/product/byCategoryId/' + options.data_id).then(res => {
            //将获取到的数据，存在名字叫data_list的这个数组中
			res
				.filter(item => !util.isNull(item.netWorthTime))
				.forEach(item => item.netWorthTime = util.formatDateTime(item.netWorthTime, 'yyyy-MM-dd'));
            this.setData({
				data_list: res,
			});
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