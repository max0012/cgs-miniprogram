// 导入封装的request请求.js
import {
    get,
    post
} from 'network.js'

function init(that) {
    var url = "/commonData/provinceCityDistrict"
    var cityData = [];
    get(url).then(res => {
        cityData = res;
    }).catch(err => {
        util.toast(err.message)
    })
    that.setData({
        'cityData': cityData
    });
}

module.exports = {
    init: init
}