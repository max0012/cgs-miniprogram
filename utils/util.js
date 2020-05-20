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

module.exports = {
    formatTime: formatTime,
    json2Form: json2Form,
    toast: toast
}