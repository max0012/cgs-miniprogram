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
        type: null, //1：添加，2：修改
        address: null, //列表页面传递的当前收货地址信息
        provinces: [],
        province: "", //省
        province2: "",
        provinceId: null,
        provinceId2: null,
        citys: [],
        city: "", //市
        city2: "",
        cityId: null,
        cityId2: null,
        countys: [],
        county: '', //区
        county2: '',
        countyId: null,
        countyId2: null,
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
                provinceId: address.provinceId,
                city: address.city,
                cityId: address.cityId,
                county: address.district,
                countyId: address.districtId,
            })
        }
        this.setData({
            type: type
        })

        //省市区三级联动   
        var cityData = [];
        const provinces = [];
        const citys = [];
        const countys = [];
        tcity.cityData().then(cityData => {
            console.log(cityData);
            cityData = cityData;
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
                cityData: cityData,
                provinces: provinces,
                citys: citys,
                countys: countys
                // 'province': cityData[0].name,
                // 'city': cityData[0].children[0].name,
                // 'county': cityData[0].children[0].children[0].name
            })
            console.log('初始化完成');
        })
    },

    /**
     * 删除当前地址
     */
    deleteAddress(e) {
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

    /**
     * 切换城市
     */
    bindChange: function(e) {
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
                province2: this.data.provinces[val[0]],
                provinceId2: cityData[val[0]].code,
                city2: cityData[val[0]].children[0].name,
                cityId2: cityData[val[0]].children[0].code,
                citys: citys,
                county2: cityData[val[0]].children[0].children[0].name,
                countyId2: cityData[val[0]].children[0].children[0].code,
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
                city2: this.data.citys[val[1]],
                cityId2: cityData[val[0]].children[val[1]].code,
                county2: cityData[val[0]].children[val[1]].children[0].name,
                countyId2: cityData[val[0]].children[val[1]].children[0].code,
                countys: countys,
                values: val,
                value: [val[0], val[1], 0]
            })
            return;
        }
        if (val[2] != t[2]) {
            console.log('county no');
            console.log(cityData[val[0]].children[val[1]]);
            this.setData({
                county2: this.data.countys[val[2]],
                countyId2: cityData[val[0]].children[val[1]].children[val[2]].code,
                values: val
            })
            return;
        }
    },

    /**
     * 切换城市
     */
    open(e) {
        var type = e.currentTarget.dataset.type
        if (type == "open") {
            this.setData({
                province: this.data.province2,
                provinceId: this.data.provinceId2,
                city: this.data.city2,
                cityId: this.data.cityId2,
                county: this.data.county2,
                countyId: this.data.countyId2,
            })
        }
        this.setData({
            condition: !this.data.condition
        })

    },

    /**
     * 提交表单（新增，修改）
     */
    formSubmit(e) {
        var type = this.data.type
        var name = e.detail.value.name
        var mobile = e.detail.value.mobile
        var address = e.detail.value.address
        var province = this.data.province
        var city = this.data.city
        var county = this.data.county
        var provinceId = this.data.provinceId
        var cityId = this.data.cityId
        var countyId = this.data.countyId
        if (name == null || name.length == 0) {
            util.toast("收货人不能为空！")
            return;
        } else if (mobile == null || mobile.length == 0) {
            util.toast("手机号码不能为空！")
            return;
        } else if(mobile.length != 11){
            util.toast("请输入正确的手机号码！")
            console.log(mobile)
            return;
        } else if (province == null || province.length == 0) {
            util.toast("请选择区域！")
            return;
        } else if (address == null || address.length == 0) {
            util.toast("请输入详细地址！")
            return;
        } else {
            //新增
            if (type == 1) {
                var url = "/orderReceiver"
                post(url, {
                    name: name,
                    mobile: mobile,
                    address: address,
                    province: province,
                    provinceId: provinceId,
                    city: city,
                    cityId: cityId,
                    district: county,
                    districtId: countyId
                }).then(res => {
                    console.log(res);
                    //新增成功返回列表页面
                    wx.navigateBack(1)
                }).catch(err => {
                    console.log(err)
                })
            } else if (type == 2) { //修改
                var id = this.data.address.id
                var url = "/orderReceiver/" + id + "/update"
                post(url, {
                    name: name,
                    mobile: mobile,
                    address: address,
                    province: province,
                    provinceId: provinceId,
                    city: city,
                    cityId: cityId,
                    district: county,
                    districtId: countyId
                }).then(res => {
                    console.log(res);
                    //修改成功返回列表页面
                    wx.navigateBack(1)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }


})