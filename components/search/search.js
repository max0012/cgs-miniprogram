// components/search/search.js
Component({
    properties: {
        placeholderText: {
            type: String,
            value: '搜索'
        }
    },
    data: {

    },
    methods: {
        //进入搜索页面
        toSearch(e) {
            wx.navigateTo({
                url: '../search/index?k=' + e.detail.value
            })
        }
    }
})
