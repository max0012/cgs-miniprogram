// 导入封装的request请求.js
const app = getApp();
const { get, post } = app.require('utils/network.js');
const util = app.require('utils/util.js');
Page({
    data: {
        mobile: '',
        isFocus: false,
        middleHeight: 0
    },
    onLoad() {
        // 兼容icon居中显示：获取胶囊按钮和状态栏的距离高度+胶囊按钮中间位置高度
        this.setData({
            middleHeight: wx.getMenuButtonBoundingClientRect().top + 4
        })

        console.log("mobile=" + util.isNull(this.data.mobile))
        console.log("middleHeight=" + util.isNull(this.data.middleHeight))
    },
    // 监听input值
    bindKeyInput(e) {
        this.setData({
            mobile: e.detail.value,
            isFocus: e.detail.value ? true : false
        })
    },
    // input失去焦点
    inputBlur() {
        this.setData({
            isFocus: false
        })
    },
    // input聚焦
    inputFocus() {
        this.setData({
            isFocus: this.data.mobile ? true : false
        })
    },
    // 清空input值
    inputMobile() {
        this.setData({
            mobile: ''
        })
    },
    // 发送验证码
    getCode() {
        // 手机号码校验
        if (util.validatePhone(this.data.mobile)) {
			app.navToPage("code", `mobile=${this.data.mobile}`);
        } else {
            util.toast("请输入正确的手机号")
        }
    },
    //返回上一页
    toBack() {
        wx.navigateBack({
           delta: 2
        })
    }
})