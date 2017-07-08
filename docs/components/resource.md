## WxResource - Restful API

## 插件介绍
该插件是参考 angular-resource 封装的，基于 Promise 封装 wx.request 请求方法，提供 Restful API 服务方便进行数据交互。

## 参数说明
| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | <code>string</code> | 设置一个含有参数的 URL 模板 |
| paramDefaults | <code>object</code> | 设置 URL 参数的默认值 |
| actions | <code>object</code> | 设置资源方法 |
| options | <code>object</code> | 设置默认参数 |

## 使用说明
```js
// 例如以下为后台提供的接口文档
// GET /api/users：获取所有用户资源
// GET /api/users/ID：获取某个指定用户的信息
// POST /api/users：新建一个用户
// PUT /api/users/ID：更新某个指定用户的信息
// DELETE /api/users/ID：删除某个指定用户
 
// 创建资源实例对象，接收四个参数url, paramDefaults, actions, options
const user = new WxResource('/api/users/:id', {id:'@id'}, {
    list: {
        method: 'GET',
        header: {
            Authorization: 'Authorization',
        },
    },
}, {
    stripTrailingSlashes: true,
    suffix: 'Async',
})

// 获取所有用户资源
user.listAsync()
.then(res => console.log(res))
.catch(err => console.log(err))
 
// 获取ID=123用户的信息
user.getAsync({ id: 123 })
.then(res => console.log(res))
.catch(err => console.log(err))
 
// 新建一个用户
user.saveAsync({ name: '微信小程序' })
.then(res => console.log(res))
.catch(err => console.log(err))
 
// 更新ID=123用户的信息
user.updateAsync({ id: 123 },{ name: 'skyvow' })
.then(res => console.log(res))
.catch(err => console.log(err))
 
// 删除ID=123用户的信息
user.deleteAsync({ id: 123 })
.then(res => console.log(res))
.catch(err => console.log(err))
 
// 返回的实例对象包含六个默认方法，getAsync、saveAsync、queryAsync、removeAsync、deleteAsync与一个自定义方法listAsync
//
// user.getAsync({id: 123}) 向/api/users/123发起一个GET请求，params作为填充url中变量，一般用来请求某个指定资源
// user.queryAsync(params) 同getAsync()方法使用类似，一般用来请求多个资源
// user.saveAsync(params, payload) 发起一个POST请，payload作为请求体，一般用来新建一个资源
// user.updateAsync(params, payload) 发起一个PUT请，payload作为请求体，一般用来更新某个指定资源
// user.deleteAsync(params, payload) 发起一个DELETE请求，payload作为请求体，一般用来移除某个指定资源
// user.removeAsync(params, payload) 同deleteAsync()方法使用类似，一般用来移除多个资源
//
// user.listAsync({}) 向/api/users发送一个GET请求

// 注入拦截器
// interceptors.use(obj) 添加一个拦截器，返回 id
// interceptors.eject(id) 移除一个拦截器
// 如下实现调用接口时显示 Loading 效果
user
    .interceptors.use({
        // 请求数据
        request(request) {
            wx.showLoading({
                title: '加载中...',
            })
            return request
        },
        // 请求失败
        requestError(requestError) {
            wx.hideLoading()
            return Promise.reject(requestError)
        },
        // 响应数据
        response(response) {
            wx.hideLoading()
            return response
        },
        // 响应失败
        responseError(responseError) {
            wx.hideLoading()
            return Promise.reject(responseError)
        },
    })

// 如果你想在稍后移除拦截器
const interceptors = user.interceptors.use(obj)
user.interceptors.eject(interceptors)
```