import WxService from '../../assets/plugins/wx-service/WxService'

const App = getApp()

Page({
    data: {
        component: App.components[1],
    },
    onLoad() {
        this.WxService = new WxService
        console.log(this.WxService)
    },
    showToast() {
        this
            .WxService
            .showToast({
                title: '小鸡哔哔-bi-哟',
                duration: 10000,
            })
            .then(data => console.log(data))
    },
    hideToast() {
        this.WxService.hideToast()
    },
    showLoading() {
        this
            .WxService
            .showLoading({
                title: '小鸡哔哔'
            })
            .then(data => console.log(data))
    },
    hideLoading() {
        this.WxService.hideLoading()
    },
    showModal() {
        this
            .WxService
            .showModal({
                title: '公鸡喔喔喔喔喔',
                content: '母鸡咯咯咯咯咯',
            })
            .then(data => console.log(data))
    },
    showActionSheet() {
        this
            .WxService
            .showActionSheet({
                itemList: [
                    '小狗旺旺旺旺旺',
                    '猫咪喵喵喵喵喵',
                    '鸽子图噜噜噜噜',
                    '火鸡嘟嘟嘟嘟嘟',
                    '公鸡喔喔喔喔喔',
                    '母鸡咯咯咯咯咯',
                ],
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
    },
})