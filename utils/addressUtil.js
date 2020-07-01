// 导入封装的request请求.js
import {
    get,
    post
} from 'network.js'

function cityData() {
    var url = "/commonData/provinceCityDistrict"
    return new Promise(resolve => {
        get(url).then(res => {
            resolve(res);
        }).catch(err => {
            util.toast(err.message)
        }) 
    })
}

module.exports = {
    cityData: cityData
}