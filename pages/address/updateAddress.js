// 导入封装的request请求.js
import {
    get,
    post
} from '../../utils/network.js'

const util = require('../../utils/util.js')
var tcity = require("../../utils/addressUtil.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: null,  //1：添加，2：修改
        address: null, //列表页面传递的当前收货地址信息
        provinces: [],
        province: "",
        citys: [],
        city: "",
        countys: [],
        county: '',
        value: [0, 0, 0],
        values: [0, 0, 0],
        condition: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var type = options.type
        if (type == 1) {
            wx.setNavigationBarTitle({
                title: '添加地址'
            })
        } else {
            wx.setNavigationBarTitle({
                title: '修改地址'
            })
            var address = JSON.parse(options.address) 
            this.setData({
                address: address,
                province: address.province,
                city: address.city,
                county: address.county
            })
        }
        this.setData({
            type: type
        })

        //省市区三级联动
        tcity.init(this);
        var cityData = this.data.cityData;
        const provinces = [];
        const citys = [];
        const countys = [];
        for (let i = 0; i < cityData.length; i++) {
            provinces.push(cityData[i].name);
        }
        console.log('省份完成');
        for (let i = 0; i < cityData[0].children.length; i++) {
            citys.push(cityData[0].children[i].name)
        }
        console.log('city完成');
        for (let i = 0; i < cityData[0].children[0].children.length; i++) {
            countys.push(cityData[0].children[0].children[i].name)
        }
        this.setData({
            'provinces': provinces,
            'citys': citys,
            'countys': countys
            // 'province': cityData[0].name,
            // 'city': cityData[0].children[0].name,
            // 'county': cityData[0].children[0].children[0].name
        })
        console.log('初始化完成');
    },

/**
     * 删除当前地址
     */
    deleteAddress(e){
        var id = e.currentTarget.dataset.id
        var url = "/orderReceiver/" + id + "/delete"
        post(url).then(res => {
            console.log("删除收货地址成功，id为：" + id);
            util.toast("删除成功！")
            //返回列表页面
            wx.navigateBack(1)
        }).catch(err => {
            console.log(err)
        })
    },


    bindChange: function (e) {
        //console.log(e);
        var val = e.detail.value
        var t = this.data.values;
        var cityData = this.data.cityData;

        if (val[0] != t[0]) {
            console.log('province no ');
            const citys = [];
            const countys = [];

            for (let i = 0; i < cityData[val[0]].children.length; i++) {
                citys.push(cityData[val[0]].children[i].name)
            }
            for (let i = 0; i < cityData[val[0]].children[0].children.length; i++) {
                countys.push(cityData[val[0]].children[0].children[i].name)
            }

            this.setData({
                province: this.data.provinces[val[0]],
                city: cityData[val[0]].children[0].name,
                citys: citys,
                county: cityData[val[0]].children[0].children[0].name,
                countys: countys,
                values: val,
                value: [val[0], 0, 0]
            })

            return;
        }
        if (val[1] != t[1]) {
            console.log('city no');
            const countys = [];

            for (let i = 0; i < cityData[val[0]].children[val[1]].children.length; i++) {
                countys.push(cityData[val[0]].children[val[1]].children[i].name)
            }

            this.setData({
                city: this.data.citys[val[1]],
                county: cityData[val[0]].children[val[1]].children[0].name,
                countys: countys,
                values: val,
                value: [val[0], val[1], 0]
            })
            return;
        }
        if (val[2] != t[2]) {
            console.log('county no');
            this.setData({
                county: this.data.countys[val[2]],
                values: val
            })
            return;
        }


    },
    open(e) {
        this.setData({
            condition: !this.data.condition
        })
    }

})