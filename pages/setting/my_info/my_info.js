// pages/setting/myIn.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        //性别
        gender: [{
                label: '男',
                value: true
            },
            {
                label: '女',
                value: false
            }
        ],
        genderDefault: "请选择",
        //生日
        birthday: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //设置页面顶部titile
        wx.setNavigationBarTitle({
            title: "个人资料"
        })
        var userInfo = wx.getStorageSync("UserInfo")
        this.setData({
            userInfo: userInfo,
            birthday: userInfo.birthday
        })
        //修改性别下拉框默认值
        if (userInfo.gender) { //男
            this.setData({
                genderDefault: this.data.gender[0].label
            })
        } else { //女
            this.setData({
                genderDefault: this.data.gender[1].label
            })
        }
    },

    /**
     * 出生日期下拉框选择改变
     */
    bindBirthdayChange(e) {
        console.log('出生日期选择改变，携带值为', e.detail.value)
        this.setData({
            birthday: e.detail.value,
        })
    }
})