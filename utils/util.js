const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//日期格式化-------------------------------------------------------------
/**
 * @param {Object || Date || Number} dateTime
 * @param {String} format
 */
const formatDateTime = function() {
	let dateTime = arguments[0];
	let format = arguments[1];
	if (!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	let realDate = null;
	if (dateTime instanceof Date) {
		realDate = dateTime;
	}
	if (typeof dateTime == 'number') {
		dateTime = parseInt(dateTime);
		realDate = new Date(dateTime);
	}

	function timeFormat(num) {
		return num < 10 ? '0' + num : num;
	}
	let date = [
		["M+", timeFormat(realDate.getMonth() + 1)],
		["d+", timeFormat(realDate.getDate())],
		["h+", timeFormat(realDate.getHours())],
		["m+", timeFormat(realDate.getMinutes())],
		["s+", timeFormat(realDate.getSeconds())],
		["q+", Math.floor((realDate.getMonth() + 3) / 3)],
		["S+", realDate.getMilliseconds()],
	];
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (realDate.getFullYear() + '').substring(4 - RegExp.$1.length));
	}
	for (let i = 0; i < date.length; i++) {
		let k = date[i][0];
		let v = date[i][1];
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? v : ("00" + v).substring(("" + v).length));
		}
	}
	return format;
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
	let str = [];
	for (let p in params) {
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
	let pages = getCurrentPages()
	let currentPage = pages[pages.length - 1]
	let router = currentPage.route
	wx.setStorageSync('Router', `/${router}`)
}

/**
 * 获取当前页带参数的url
 */
const getUrl = () => {
	let pages = getCurrentPages()
	let currentPage = pages[pages.length - 1]
	let url = currentPage.route
	wx.setStorageSync('Router', `/${url}`)
	let options = currentPage.options

	//参数多时通过&拼接url的参数
	let urlWithArgs = url + '?'
	for (let key in options) {
		let value = options[key]
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
	formatDateTime: formatDateTime,
	json2Form: json2Form,
	toast: toast,
	getRouter: getRouter,
	getUrl: getUrl,
	isNull: isNull,
	validatePhone: validatePhone,
	deepClone: deepClone,
}
