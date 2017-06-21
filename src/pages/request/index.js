import WxRequest from '../../assets/plugins/wx-request/lib/index'

const App = getApp()

Page({
    data: {
        component: App.components[0],
    },
    onLoad() {
        this.WxRequest = new WxRequest({
            baseURL: 'https://api.github.com/',
        })
        console.log(this.WxRequest)
        this.interceptors()
        this.getRepos()
    },
    interceptors() {
        this
            .WxRequest
            .interceptors.use({
                request(request) {
                    wx.showLoading({
                        title: '加载中...',
                    })
                    return request
                },
                requestError(requestError) {
                    wx.hideLoading()
                    return requestError
                },
                response(response) {
                    wx.hideLoading()
                    return response
                },
                responseError(responseError) {
                    wx.hideLoading()
                    return responseError
                },
            })
    },
    getRepos() {
        this
            .WxRequest
            .getRequest('/users/skyvow/repos')
            .then(data => {
                console.log(data)
                this.setData({
                    items: data.sort((a, b) => b.stargazers_count - a.stargazers_count),
                })
            })
    },
})