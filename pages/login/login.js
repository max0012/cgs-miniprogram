// login.js
import {
    get,
    post
} from '../../utils/network.js'
var util = require('../../utils/util.js')
var uri = '/manager/logOn'
const app = getApp()

Page({
    data: {
        mobile: ''
    },
    bindKeyInput(e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    getCode() {
        get('/manager/mobileToken', {
            mobile: this.data.mobile
        }).then(res => {
            console.log(res)
            wx.navigateTo({
                url: 'code/code?mobile=' + this.data.mobile
            })
        })
    }
})