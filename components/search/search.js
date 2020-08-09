// components/search/search.js
const app = getApp();
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
			app.navToPage("search", `k=${e.detail.value}`);
        }
    }
})
