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
                    return Promise.reject(requestError)
                },
                response(response) {
                    wx.hideLoading()
                    return response
                },
                responseError(responseError) {
                    wx.hideLoading()
                    return Promise.reject(responseError)
                },
            })
    },
    getRepos() {
        this
            .WxRequest
            .getRequest('/users/skyvow/repos')
            .then(res => {
                console.log(res)
                this.setData({
                    items: res.data.sort((a, b) => b.stargazers_count - a.stargazers_count),
                })
            })
    },
})