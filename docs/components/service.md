## WxService - Promise API

## 插件介绍
该插件是通过遍历 wx 方法对象，判断是否为异步方法，是则构造 Promise，同步方法不变，同时重写导航 API，包括 navigateTo、redirectTo 等等，使用时直接传参无需拼接路径。

## 使用说明
```js
// 创建实例对象
this.WxService = new WxService

// 显示模态弹窗
this
    .WxService
    .showModal({
        title: '提示',
        content: '母鸡咯咯咯咯咯',
    })
    .then(data => data.confirm && console.log('用户点击确定'))

// 显示操作菜单
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

// 重写导航 API，url 是页面的路径，params 是参数
// example: navigateTo('pages/user/index', {id: 1})
this.WxService.navigateTo(url, params)
this.WxService.redirectTo(url, params)
this.WxService.switchTab(url)
this.WxService.navigateBack(delta)
this.WxService.reLaunch(url, params)
```