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
		if (params.hasOwnProperty(p)) {
			if (typeof params[p] == 'object') {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(params[p])));
			} else {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
			}
		}
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
function isNull(val) {
	// null or undefined
	if (val == null) return true;

	if (typeof val === 'boolean') return false;

	if (typeof val === 'number') return !val;

	if (val instanceof Error) return val.message === '';

	switch (Object.prototype.toString.call(val)) {
		// String or Array
		case '[object String]':
		case '[object Array]':
			return !val.length;

			// Map or Set or File
		case '[object File]':
		case '[object Map]':
		case '[object Set]':
			{
				return !val.size;
			}
			// Plain Object
		case '[object Object]':
			{
				return !Object.keys(val).length;
			}
	}
	return false;
}

/**
 * 对象深克隆
 * @param {Object} obj
 */
function deepClone(obj) {
	let newObj = Array.isArray(obj) ? [] : {}
	if (obj && typeof obj === "object") {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
			}
		}
	}
	return newObj
}

module.exports = {
    formatTime: formatTime,
    json2Form: json2Form,
    toast: toast,
    getRouter: getRouter,
    getUrl: getUrl,
    isNull: isNull,
    validatePhone: validatePhone,
    deepClone: deepClone,
}