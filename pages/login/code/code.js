import { get,post } from '../../../utils/network.js'
const util = require('../../../utils/util.js')
const CountTime = require('../../../utils/countTime.js')
var codeUri = '/manager/mobileToken'
var logOnUri = '/manager/logOn'
Page({
    data: {
        mobile: '',
        code: '',
        codeTips: '',
        isCheck: false
    },
    onLoad(options) {
        this.setData({
            mobile: options.mobile
        })
        // 初始化倒计时插件
        this.time = new CountTime(this);
        // 页面渲染完成后自动获取验证码
        this.getCode();
    },
    // 监听input值
    bindKeyInput(e) {
        this.setData({
            code: e.detail.value
        })
    },
    // 控制radio选中状态
    onCheck() {
        this.setData({
            isCheck: !this.data.isCheck
        })
    },
    // 查看协议
    toAgreement(e) {
        var type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: '../../agreement/agreement?type=' + type,
        })
    },
    // 验证并登录
    logOn() {
        if (!this.data.code) {
            util.toast("请输入验证码")
        } else if(!this.data.isCheck) {
            util.toast("同意协议才能登录")
        } else {
            post(logOnUri, {
                mobile: this.data.mobile,
                code: this.data.code
            }).then(res => {
                // 存储数据
                wx.setStorageSync("token", res.token)
                wx.setStorageSync("userInfo", res.manager)
                // 默认跳转到“我的”页面
                wx.switchTab({
                    url: '../../mime/mime',
                })
            }).catch(err => {
                util.toast(err.message)
            })
        }
    },
    // 获取验证码
    getCode() {
        // 手机号码校验
        if (!(/^1[34578]\d{9}$/.test(this.data.mobile))) {
            util.toast("请输入正确的手机号")
        } else {
            get(codeUri, {
                mobile: this.data.mobile
            }).then(res => {
                this.time.countTime();
                util.toast("验证码已发送，请注意查收")
            }).catch(err =>{
                util.toast(err.message)
            })
        }
    }
})