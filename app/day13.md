复习：
昨天 支付（elementUI + qrcode） + 个人中心（二级路由）

1、个人中心完成
面试的时候：是否封装过组件？分页器、日历
个人中心的分页器

2、全局守卫
未登录访问，交易相关（trade）、支付相关（pay、paysucess）、用户中心相关（center）， 跳转到登录页面

3、路由独享守卫
只有从购物车界面才能跳转到交易页面（创建订单）
只有从交易页面（创建订单）才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

4、图片懒加载
自定义插件

5、vee-validate基本使用

第一步：插件安装与引入
cnpm -i vee-validate@2 --save 安装的插件安装2版本的

import VeeValidate from "vee-validate"
import zh_CN from "vee-validate/dist/locale/zh_CN"
Vue.use(VeeValidate)

第二步：提示信息
VeeValidate.Validator.localize("zh_CN", {
    messages:{
        ...zh_CN.message,
        is:(field)=>`${field}必须与密码相同` // 修改内置规则的message，让确定密码与密码相同
    },
    attributes:{
        //给校验的field属性名映射中文名称
        phone:"手机号",
        code:"验证码",
        password:"密码",
        password1:"确认密码",
        isCheck:"协议"
    }
})

第三步：基本使用
<input
    placeholder="请输入你的手机号"
    v-model="phone"
    name="phone"
    v-validate="{required: true, regex: /^1\d{10}$/ }"
    :class="{invalid: errors.has('phone')}"
/>
<span class="error-msg"> {{ errors.first("phone") }}</span>

const success = await this.\$validate.validateAll();//全部表单验证

VeeValidate.Validator.extend("agree", {
    validate: value => {
        return value
    },
    getMessage: field => field +"必须同意"
})