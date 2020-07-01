const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 手机格式校验
 */
const validatePhone = s => {
    return (/^1[34578]\d{9}$/.test(s)) ? true : false
}

/**
 * 格式化Content-Type的请求参数
 * Content-Type: application/x-www-form-urlencoded
 */
const json2Form = params => {
    var str = [];
    for (var p in params) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    }
    return str.join("&")
}

/**
 * 封装微信的消息提示框
 */
const toast = msg => {
    wx.showToast({
        title: msg,
        icon: 'none'
    })
}

/**
 * 获取当前页面路由
 */
const getRouter = () => {
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 1]
    var router = currentPage.route
    wx.setStorageSync('Router', `/${router}`)
}

/**
 * 获取当前页带参数的url
 */
const getUrl = () => {
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 1]
    var url = currentPage.route
    wx.setStorageSync('Router', `/${url}`)
    var options = currentPage.options

    //参数多时通过&拼接url的参数
    var urlWithArgs = url + '?'
    for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
    wx.setStorageSync('Url', `/${urlWithArgs}`)
}

/**
 * 用于判断空 Undefined String Array Object Number
 */
function isNull(str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') {
        return true
    } else if (
        Object.prototype.toString.call(str) === '[object String]' ||
        Object.prototype.toString.call(str) === '[object Array]') {
        return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
        return JSON.stringify(str) == '{}' ? true : false
    } else if (typeof (str) == 'number') {
        if (str) {
            return false
        } else {
            if (str == 0) {
                return false
            }
            return true
        }
    }
}

module.exports = {
    formatTime: formatTime,
    json2Form: json2Form,
    toast: toast,
    getRouter: getRouter,
    getUrl: getUrl,
    isNull: isNull,
    validatePhone: validatePhone
}