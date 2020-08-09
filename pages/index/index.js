import {
    get,
    post
} from '../../utils/network.js'
const utils = require('../../utils/util.js')

Page({
    data: {
        dataList: [],
        pageDetails: [],
        dataId: null,
        currentIndex: 0,
        windowHeight: 0
    },
    onLoad(options) {
        this.getIndexInfo()
        this.setData({
            windowHeight: wx.getSystemInfoSync()['windowHeight'] - 89
        })
    },
    // 获取tab栏的列表信息
    getIndexInfo() {
        get('/page/foxIndex').then(res => {
            this.setData({
                dataId: res[0].id,
                dataList: res
            })
            //加载第一个选项卡列表内容
            this.getDetails()
        }).catch(err => {
            utils.toast(err + ' ')
        })
    },
    //根据页面详情
    getDetails() {
        // page详情
		if(utils.isNull(this.data.pageDetails[this.data.currentIndex])){
			get('/page/' + this.data.dataId + '/withDetails').then(res => {
				let originalArr = utils.deepClone(this.data.pageDetails);
				originalArr[this.data.currentIndex] = res
			    this.setData({
			        pageDetails: originalArr
			    })
			}).catch(err => {
			    utils.toast(err + ' ')
			})
		}
    },
    //进入搜索页面
    toSearch(e) {
        wx.navigateTo({
            url: '../search/index?k=' + e.detail.value
        })
    },
    //进入产品详情页面
    detailClick(e) {
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../product/details?data_id=' + id
        })
    },
    //用户点击tab时调用
    titleClick(e) {
        var idx = e.currentTarget.dataset.idx
        this.setData({
            currentIndex: idx
        })
    },
    //tab页切换后请求列表数据
    pageChange(e) {
        this.setData({
            currentIndex: e.detail.current,
            dataId: this.data.dataList[e.detail.current].id
        })
        this.getDetails()
    }
})