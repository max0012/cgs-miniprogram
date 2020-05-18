Page({
    data: {
        showTitle: ''
    },
    onLoad (options) {
        if(options.type == 1) {
            this.setData({ showTitle: '用户协议'})
        } else {
            this.setData({ showTitle: '隐私协议' })
        }
    }
})