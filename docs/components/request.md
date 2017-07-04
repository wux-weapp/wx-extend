## WxRequest - 发送请求

## 插件介绍
该插件是基于 Promise 封装 wx.request 请求方法，同时支持自定义请求的配置、拦截请求和响应、转换请求和响应数据、自动转换 JSON 数据等等功能。

## 参数说明
| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| options.suffix | <code>string</code> | 方法名后缀字符串，默认值 Request |
| options.baseURL | <code>string</code> | 基础请求路径 |
| options.header | <code>object</code> | 请求头 |
| options.transformRequest | <code>array</code> | 转换请求数据 |
| options.transformResponse | <code>array</code> | 转换响应数据 |
| options.validateStatus | <code>function</code> | 基于响应状态返回成功或失败 |

## 使用说明
```js
// 使用自定义配置创建一个实例对象
this.WxRequest = new WxRequest({
    baseURL: 'https://example.com/api/',
})

// 实例方法
this.WxRequest.getRequest(url, config)
this.WxRequest.postRequest(url, config)
this.WxRequest.putRequest(url, config)
this.WxRequest.deleteRequest(url, config)
this.WxRequest.headRequest(url, config)
this.WxRequest.optionsRequest(url, config)
this.WxRequest.traceRequest(url, config)
this.WxRequest.connectRequest(url, config)

// 基础请求方法
this.WxRequest.request(config)

// 合并处理请求
this.WxRequest.all(promises)

// 请求配置
// 创建请求时的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 GET 方法
{
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为实例的方法传递相对 URL
    // 如 https://example.com/api/user
    baseURL: 'https://example.com/api/',

    // `url` 是用于请求的服务器 URL
    url: '/user',

    // `method` 是创建请求时使用的方法，默认是 GET
    method: 'GET',
    
    // `dataType` 表示服务器响应的数据类型
    dataType: 'JSON',

    // `data` 是作为请求主体被发送的数据
    data: {
        username: 'skyvow',
    },
    
    // `headers` 是即将被发送的自定义请求头
    header: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
    },

    // `transformRequest` 允许在向服务器发送前，转换请求数据
    transformRequest: [
        (data, header) => {
            return data
        },
    ],

    // `transformResponse` 转换响应数据
    transformResponse: [
        (data, header) => {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                } catch (e) { /* Ignore */ }
            }
            return data
        },
    ],

    // 基于响应状态返回成功或失败
    validateStatus: status => status >= 200 && status < 300,
}

// 配置的优先顺序
// 配置会以一个优先顺序进行合并，插件内部的默认值、实例的 defaults 参数、请求的 config 参数，后者将优先于前者。
// 创建实例对象时设置配置的默认值
this.WxRequest = new WxRequest({
    baseURL: 'https://example.com/api/',
})

// 请求时的配置
// 最终请求路径为 https://api.example.com/user
this.WxRequest.getRequest('/user', {
    baseURL: 'https://api.example.com/',
})

// 注入拦截器
// interceptors.use(obj) 添加一个拦截器，返回 id
// interceptors.eject(id) 移除一个拦截器
// 如下实现调用接口时显示 Loading 效果
this
    .WxRequest
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
this.interceptors = this.WxRequest.interceptors.use(obj)
this.WxRequest.interceptors.eject(this.interceptors)
```

```js
// 可以使用 es6 class 形式，方便统一管理 API，对外暴露方法，实例对象也可以挂载至全局 App 上，方便调用
// 如下实现一个用户 CURD 功能例子
class Service extends WxRequest {
	constructor(options) {
		super(options)
        // `$$prefix` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
		this.$$prefix = '/user'
		this.$$path = {
			create: '/create',
			update: '/update',
			retrieve: '/retrieve',
			delete: '/delete',
        }
        // 在此也可注入拦截器
        // this.interceptors.use()
	}

	create(params) {
		return this.postRequest(this.$$path.create, params)
	}

    update(params) {
		return this.putRequest(this.$$path.update, params)
	}

    retrieve(params) {
		return this.getRequest(this.$$path.retrieve, params)
	}

    delete(params) {
		return this.deleteRequest(this.$$path.delete, params)
	}
}

// 创建实例对象
this.WxRequest = new Service({
    baseURL: 'https://example.com/api/',
})

// 对象上的方法
this.WxRequest.create(parmas)
this.WxRequest.update(parmas)
this.WxRequest.retrieve(parmas)
this.WxRequest.delete(parmas)
```