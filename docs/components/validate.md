## WxValidate - 表单验证

## 插件介绍
该插件是参考 jQuery Validate 封装的，为小程序表单提供了一套常用的验证规则，包括手机号码、电子邮件验证等等，同时提供了添加自定义校验方法，让表单验证变得更简单。

## 参数说明
| 参数 | 类型 | 描述 |
| --- | --- | --- |
| rules | <code>object</code> | 验证字段的规则 |
| messages | <code>object</code> | 验证字段的提示信息 |

## 内置校验规则
| 序号 | 规则 | 描述 |
| --- | --- | --- |
| 1 | <code>required: true</code> | 这是必填字段。 |
| 2 | <code>email: true</code> | 请输入有效的电子邮件地址。 |
| 3 | <code>tel: true</code> | 请输入11位的手机号码。 |
| 4 | <code>url: true</code> | 请输入有效的网址。 |
| 5 | <code>date: true</code> | 请输入有效的日期。 |
| 6 | <code>dateISO: true</code> | 请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。 |
| 7 | <code>number: true</code> | 请输入有效的数字。 |
| 8 | <code>digits: true</code> | 只能输入数字。 |
| 9 | <code>idcard: true</code> | 请输入18位的有效身份证。 |
| 10 | <code>equalTo: 'field'</code> | 输入值必须和 field 相同。 |
| 11 | <code>contains: 'ABC'</code> | 输入值必须包含 ABC。 |
| 12 | <code>minlength: 5</code> | 最少要输入 5 个字符。 |
| 13 | <code>maxlength: 10</code> | 最多可以输入 10 个字符。 |
| 14 | <code>rangelength: [5, 10]</code> | 请输入长度在 5 到 10 之间的字符。 |
| 15 | <code>min: 5</code> | 请输入不小于 5 的数值。 |
| 16 | <code>max: 10</code> | 请输入不大于 10 的数值。 |
| 17 | <code>range: [5, 10]</code> | 请输入范围在 5 到 10 之间的数值。 |

## 常用实例方法
| 名称 | 返回类型 | 描述 |
| --- | --- | --- |
| checkForm(e) | <code>boolean</code> | 验证所有字段的规则，返回验证是否通过。 |
| valid() | <code>boolean</code> | 返回验证是否通过。 |
| size() | <code>number</code> | 返回错误信息的个数。 |
| validationErrors() | <code>array</code> | 返回所有错误信息。 |
| addMethod(name, method, message) | <code>boolean</code> | 添加自定义验证方法。 |

## addMethod(name, method, message) - 添加自定义校验
第一个参数 name 是添加的方法的名字。
第二个参数 method 是一个函数，接收三个参数 (value, param) ，value 是元素的值，param 是参数。
第三个参数 message 是自定义的错误提示。

## 使用说明
```js
// 验证字段的规则
const rules = {
    email: {
        required: true,
        email: true,
    },
    tel: {
        required: true,
        tel: true,
    },
    idcard: {
        required: true,
        idcard: true,
    },
}

// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
    email: {
        required: '请输入邮箱',
        email: '请输入正确的邮箱',
    },
    tel: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
    },
    idcard: {
        required: '请输入身份证号码',
        idcard: '请输入正确的身份证号码',
    },
}

// 创建实例对象
this.WxValidate = new WxValidate(rules, messages)

// 自定义验证规则
this.WxValidate.addMethod('assistance', (value, param) => {
    return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
}, '请勾选1-2个敲码助手')

// 如果有个表单字段的 assistance，则在 rules 中写
assistance: {
    required: true,
    assistance: true,
},

// 调用验证方法，传入参数 e 是 form 表单组件中的数据
submitForm(e) {
    const params = e.detail.value

    console.log(params)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0]
        return false
    }
},
```