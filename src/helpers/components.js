export default [{
        title: 'WxRequest',
        url: '/pages/request/index',
        remark: '发送请求',
        content: '该插件是基于 Promise 封装 wx.request 请求方法，同时支持自定义请求的配置、拦截请求和响应、转换请求和响应数据、自动转换 JSON 数据等等功能。',
    },
    {
        title: 'WxService',
        url: '/pages/service/index',
        remark: 'Promise API',
        content: '该插件是通过遍历 wx 方法对象，判断是否为异步方法，是则构造 Promise，同步方法不变，同时重写导航 API，包括 navigateTo、redirectTo 等等，使用时直接传参无需拼接路径。',
    },
    {
        title: 'WxValidate',
        url: '/pages/validate/index',
        remark: '表单验证',
        content: '该插件是参考 jQuery Validate 封装的，为小程序表单提供了一套常用的验证规则，包括手机号码、电子邮件验证等等，同时提供了添加自定义校验方法，让表单验证变得更简单。',
    },
    {
        title: 'WxResource',
        url: '/pages/resource/index',
        remark: 'Restful API',
        content: '该插件是参考 angular-resource 封装的，基于 Promise 封装 wx.request 请求方法，提供 Restful API 服务方便进行数据交互。',
    },
]