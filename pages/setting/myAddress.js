// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var url = "/orderReceiver"
        get(url,{
            PageSize: 10,
            PageIndex: 1
        }).then(res => {
            //将获取到的数据，存在名字叫detail的这个对象中 
            this.setData({
                address: res.items,
            }),
            console.log("地址列表： " + res);
            
        }).catch(err => {
            console.log(err)
        })
    },

   
})