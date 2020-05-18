// login.js
import { get,post } from '../../utils/network.js'
const util = require('../../utils/util.js')

Page({
    data: {
        mobile: '',
        isFocus: false
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
        if (!(/^1[34578]\d{9}$/.test(this.data.mobile))) {
            util.toast("请输入正确的手机号")
        } else {
            wx.navigateTo({
                url: 'code/code?mobile=' + this.data.mobile
            })
        }
    }
})