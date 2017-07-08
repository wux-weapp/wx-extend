import WxResource from '../../assets/plugins/wx-resource/lib/index'

const App = getApp()

Page({
    data: {
        component: App.components[3],
    },
    onLoad() {
        this.WxResource = new WxResource('https://api.github.com/users/:id/repos', {
            id: '@id',
        })
        console.log(this.WxResource)
        this.interceptors()
        this.getRepos('skyvow')
    },
    interceptors() {
        this
            .WxResource
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
    getRepos(id) {
        const params = {
            id,
        }

        this
            .WxResource
            .getAsync(params)
            .then(res => {
                console.log(res)
                this.setData({
                    items: res.data.sort((a, b) => b.stargazers_count - a.stargazers_count),
                })
            })
    },
})