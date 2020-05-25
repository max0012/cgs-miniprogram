// 导入封装的request请求.js
import {
    get,
    post
} from '../../../utils/network.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        performanceSummary: null,
        year: null,
        month: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var date = new Date()
        //获取年份  
        var year = date.getFullYear()
        //获取月份  
        var month = (date.getMonth() + 1)
        this.setData({
            year: year,
            month: month
        })
        this.getAchievementByYearAndMonth()
    },

    /**
     * 获得某年某月业绩统计方法
     */
    getAchievementByYearAndMonth() {
        var url = "/my/performanceSummary"
        get(url, {
            year: this.data.year,
            month: this.data.month
        }).then(res => {
            this.setData({
                performanceSummary: res
            })
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 加载上一个月业绩
     */
    lastMonth() {
        var year = this.data.year
        var month = this.data.month
        //月份为1月时，则年份减1，月份直接为12
        if(month == 1){
            year = year - 1
            month = 12
        }else{
            month = month - 1
        }
        this.setData({
            year: year,
            month: month
        })
        //设置好年份月份后，加载数据
        this.getAchievementByYearAndMonth()
    },

    /**
     * 加载下一个月业绩
     */
    nextMonth() {
        var year = this.data.year
        var month = this.data.month
        //月份为12月时，则年份加1，月份直接为1
        if (month == 12) {
            year = year + 1
            month = 1
        } else {
            month = month + 1
        }
        this.setData({
            year: year,
            month: month
        })
        //设置好年份月份后，加载数据
        this.getAchievementByYearAndMonth()
    }
})