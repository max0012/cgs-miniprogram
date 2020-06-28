// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'
const util = require('../../utils/util.js')
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
        //产品id
        data_id: null,
        //商品详情
        detail: null,
        //营销小技巧
        productTips: null,
        //是否显示指示点 
        indicatordots: true,
        //指示点颜色 
        indicatorcolor: "white",
        data: null,
        //保障额度数组下标
        coverageIdIndex: null,
        yearIdIndex: null,
        birthday: null,
        radioValue: null,
        //保障额度下拉框默认显示（请选择 >）,flase则不显示
        coverageIdFlag: true,
        yearIdFlag: true,
        birthdayFlag: true,
        //保费及佣金
        premium: null,
        //性别
        radios: [{
                value: true,
                name: '男'
            },
            {
                value: false,
                name: '女'
            },
        ],
        //保障额度
        coverageId: [{
                label: '3万',
                value: '3'
            },
            {
                label: '5万',
                value: '5'
            },
            {
                label: '10万',
                value: '10'
            },
            {
                label: '20万',
                value: '20'
            }
        ],
        //保障年期
        yearId: [{
                label: '5年',
                value: '5'
            },
            {
                label: '10年',
                value: '10'
            },
            {
                label: '15年',
                value: '15'
            },
            {
                label: '20年',
                value: '20'
            },
            {
                label: '30年',
                value: '30'
            }
        ],
        hideModal: false, //模态框的状态  true-隐藏  false-显示
        animationData: {},
        num: 1, //弹框选择的数量
        minusStatus: 'disabled', //减号状态
        plusStatus: 'normal' //加号状态
    },

    /** 
     * 生命周期函数--监听页面加载 
     */
    onLoad(e) {
        //日期选择器设置默认值

        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "产品详情"
        })
        /** 页面一加载就加载商品详情 */
        //营销小提示分页数据，当前页面只需要两条
        var tipsParams = {
            PageSize: 2,
            PageIndex: 1,
        }
        //上个页面传递的id 
        var data_id = e.data_id
        this.setData({
            data_id: data_id
        })
        var detailUrl = '/product/' + data_id + '/withDetails'
        var tipsUrl = '/productTips/byProductId/' + data_id

        //获取产品详情方法
        get(detailUrl).then(res => {
                //将获取到的数据，存在名字叫detail的这个对象中 
                this.setData({
                        detail: res,
                    }),
                    console.log(res);
                //产品详情中的图片路径（为html,需要在这里转换）
                var description = res.description;
                WxParse.wxParse('description', 'html', description, this, 5);
            }).catch(err => {
                console.log(err)
            }),

            //加载营销小提示方法
            get(detailUrl, tipsParams).then(res => {
                this.setData({
                        productTips: res.items,
                    }),
                    console.log("productTips====" + res.items);
            }).catch(err => {
                console.log(err)
            })
    },

    //查看营销小技巧事件
    tipsClick(e) {
        //得到页面数据
        var data_id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: 'productTips?data_id=' + data_id,
            success: function(res) {
                console.log('成功跳转，携带参数data_id值为' + data_id);
            },
            fail: function(res) {
                console.log('tipsClick fail() !!!');
            },
        })
    },

    /** 
     * 切换保障额度下拉框
     */
    bindCoverageIdChange(e) {
        console.log('保障额度选择改变，携带值为', e.detail.value)
        this.setData({
            coverageIdIndex: e.detail.value,
            coverageIdFlag: false
        })
        //判断是否四个下拉框都有值
        this.isAllSelect()
    },

    /** 
     * 切换保障年限下拉框
     */
    bindYearIdChange(e) {
        console.log('保障年限选择改变，携带值为', e.detail.value)
        this.setData({
            yearIdIndex: e.detail.value,
            yearIdFlag: false,
        })
        //判断是否四个下拉框都有值
        this.isAllSelect()
    },

    /** 
     * 切换性别按钮
     */
    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.setData({
            radioValue: e.detail.value
        })
        //判断是否四个下拉框都有值
        this.isAllSelect()
    },

    /** 
     * 切换出生日期下拉框
     */
    bindBirthdayChange(e) {
        console.log('出生日期选择改变，携带值为', e.detail.value)
        this.setData({
            birthday: e.detail.value,
            birthdayFlag: false,
        })
        //判断是否四个下拉框都有值
        this.isAllSelect()
    },

    /** 
     * 判断是否四个下拉框都有值
     */
    isAllSelect() {
        console.log("进入allSelect方法")
        var radioValue = this.data.radioValue
        var coverageIdIndex = this.data.coverageIdIndex
        var yearIdIndex = this.data.yearIdIndex
        var birthday = this.data.birthday
        if (radioValue && coverageIdIndex && yearIdIndex && birthday) {
            var coverageId = this.data.coverageId[coverageIdIndex].value
            var yearId = this.data.yearId[yearIdIndex].value

            console.log("四个下拉框都有值")
            console.log("radioValue:" + radioValue + "   birthday:" + birthday + "   coverageId:" + coverageId + "    yearId:" + yearId)
            //调用接口计算保费和推广佣金
            var url = "/product/calculateInsurance"
            var jsonParams = {
                productId: this.data.data_id,
                coverageId: coverageId,
                yearId: yearId,
                gender: radioValue,
                birthday: birthday
            }
            post(url, jsonParams).then(res => {
                console.log(res)
                this.setData({
                    premium: res
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },

    /** 
     * 点击联系产品顾问按钮
     */
    btnContactClick(e) {
        //页面数据
        var commissionText = e.currentTarget.dataset.commissiontext
        var name = e.currentTarget.dataset.name
        var coverUrl = e.currentTarget.dataset.coverurl
        var receiverManagerId = e.currentTarget.dataset.receiverManagerId
        var product = {
            productId: this.data.data_id,
            commissionText: commissionText,
            name: name,
            coverUrl: coverUrl,
            receiverManagerId: receiverManagerId,
        }
        wx.navigateTo({
            url: "addProductIntention?product=" + JSON.stringify(product),
        })
    },

    /** 
     * 点击联系立即下单按钮，弹框选择数量
     */
    clickme: function() {
        this.showModal();
    },
    //显示对话框
    showModal: function() {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 200)
    },
    //隐藏对话框
    hideModal: function() {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    },

    /* 点击减号 */
    bindMinus: function() {
        var num = this.data.num;
        // 如果大于1时，才可以减
        if (num > 1) {
            num--;
        } else {
            wx.showToast({
                title: '数量最少为一',
                icon: 'none',
                duration: 2000
            })
        }
        // 减号，只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 点击加号 */
    bindPlus: function() {
        var num = this.data.num;
        var inventory = this.data.detail.inventory
        // 数量不超过库存
        if (num < inventory) {
            num++;
        } else {
            wx.showToast({
                title: '数量超过范围！',
                icon: 'none',
                duration: 2000
            })
        }
        // 加号，只有小于库存的时候，才能normal状态，否则disable状态
        var plusStatus = num >= inventory ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            plusStatus: plusStatus
        });
    },
    /* 输入框事件 */
    bindManual: function(e) {
        var num = e.detail.value;
        var inventory = this.data.detail.inventory
        if (num > inventory) {
            wx.showToast({
                title: '数量超过范围！',
                icon: 'none',
                duration: 2000
            })
            num = inventory;
        }
        // 减号，只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 加号，只有小于库存的时候，才能normal状态，否则disable状态
        var plusStatus = num >= inventory ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus,
            plusStatus: plusStatus
        });
    },

    /** 
     * 进入下单页面
     */
    clickOrder(e){
        var detail = {
            productId: this.data.data_id,  //产品id
            coverUrl: this.data.detail.coverUrl, //封面图
            name: this.data.detail.name,  //产品名称
            upperPrice: this.data.detail.upperPrice, //真实价格（购物类产品才有）
            expressPrice: this.data.detail.expressPrice,  //(运费)
            inventory: this.data.detail.inventory,  //库存
        }
        wx.navigateTo({
            url: "../order/addOrder?detail=" + JSON.stringify(detail) + "&num=" + this.data.num,
        })
    }
})