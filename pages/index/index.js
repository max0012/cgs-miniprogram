import { get,post } from '../../utils/network.js'

Page({
    data: {
        dataList: [],
        detail: null,
        dataId: null,
        currentIndex: 0
    },
    onLoad(options) {
        this.getIndexInfo()
    },
    // 获取tab栏的列表信息
    getIndexInfo() {
         get('/page/foxIndex').then(res => {
             this.setData({
                 dataId: res[0].id,
                 dataList: res
             })
             //加载第一个选项卡列表内容
             this.getDetails();
         }).catch(err => {
             console.log(err)
         })
    },
    //用户点击tab时调用
    titleClick(e) {
        var idx = e.currentTarget.dataset.idx
        var id = e.currentTarget.dataset.id
        this.setData({
            currentIndex: idx,
            dataId: id
        })
    },
    //tab页切换后请求列表数据
    pageChange(e) {
        this.getDetails();
        this.setData({
            currentIndex: e.detail.current,
        })
    },
    //请求列表数据方法
    getDetails() {
        var id = this.data.dataId
        var detailsUrl = "/page/" + id + "/withDetails"
        get(detailsUrl).then(res => {
            this.setData({
                detail: res
            })
        }).catch(err => {
            console.log(err)
        })
    },
    //进入产品详情页面
    detailClick(e) {
        var id = e.currentTarget.dataset.id
        var type = e.currentTarget.dataset.type
        wx.navigateTo({url: '../product/details?data_id=' + id})
    },
    swichNav(e) {
        if (this.data.currentIndex === e.target.dataset.current) {
            return false;
        } else {
            this.setData({
                currentIndex: e.target.dataset.current,
            })
        }
    }
})