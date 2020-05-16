// login.js
import {
    get,
    post
} from '../../utils/network.js'
var util = require('../../utils/util.js')
var uri = '/manager/logOn'
const app = getApp()

Page({
    onLoad() {
        get('/page/foxIndex', {name: "hhh"}).then(res => {
            console.log("测试GET请求")
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },
    handleGetUserInfo(event) {
        console.log(event)
        wx.showModal({
            title: '用户信息',
            content: event.detail.userInfo.nickName
        })
    }
})