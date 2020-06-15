Component({
    properties: {
        background: {
            type: String,
            value: '#fff'
        },
        color: {
            type: String,
            value: '#000'
        },
        titleText: {
            type: String,
            value: '导航标题'
        },
        backIcon: {
            type: String,
            value: ''
        },
        fontSize: {
            type: Number,
            value: 16
        },
        iconHeight: {
            type: Number,
            value: 19
        },
        iconWidth: {
            type: Number,
            value: 58
        }
    },
    attached() {
        this.setNavSize();
        this.setStyle();
    },
    methods: {
        // 通过获取系统信息计算导航栏高度
        setNavSize() {
            var sysinfo = wx.getSystemInfoSync(),
                statusHeight = sysinfo.statusBarHeight,
                isiOS = sysinfo.system.indexOf('iOS') > -1,
                navHeight;
            if (!isiOS) {
                navHeight = 48;
            } else {
                navHeight = 44;
            }
            this.setData({
                status: statusHeight,
                navHeight: navHeight
            })
        },
        setStyle() {
            var containerStyle, textStyle, iconStyle;
            containerStyle = [
                'background:' + this.data.background
            ].join(';');
            textStyle = [
                'color:' + this.data.color,
                'font-size:' + this.data.fontSize + 'px'
            ].join(';');
            iconStyle = [
                'width: ' + this.data.iconWidth + 'px',
                'height: ' + this.data.iconHeight + 'px'
            ].join(';');
            this.setData({
                containerStyle: containerStyle,
                textStyle: textStyle,
                iconStyle: iconStyle
            })
        },
        // 返回事件
        back: function () {
            wx.navigateBack({
                delta: 1
            })
            this.triggerEvent('back', {
                back: 1
            })
        }
    }
})