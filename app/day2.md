1：编程式路由跳转到当前路由（参数不变，），多次执行会抛出 NavigationDuplicated 的警告错误？
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这类问题，因为 vue-router 底层已经处理好了
1.1：为什么编程式导航进行路由跳转的时候，就有这种警告错误呐？
"vue-router": "^3.5.3"：最新的 vue-router 引入了 promise
1.2：通过给 push 方法传递相应的成功与失败的回调函数，可以捕获到当前的错误，可以解决。
1.3：通过下部代码，可以实现解决错误。
this.$router.push({ name: "Search", params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() }， () => {}, () => {} });
这种写法，治标不治本。
将来在其他组件中，push 或者 replace，还是会有这样的错误。

1.4
this：当前组件实例（Search）
this.$router 属性：当前的这个属性，属性值 VueRouter 类的一个实例，当在入口文件中注册路由的时候，给组件实例添加$router|$route 属性。

2：Home 模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

3：三级联动组件业务
---由于三级联动组件，出现在 Home、Search、Detail 中，所以将其注册为全局组件
好处：只需要注册一次就可以在项目的任何地方使用

4：完成其余静态组件
html + css + 图片资源 ----细心【结构、样式、图片资源】

5：用 postman 测试接口是否正常
--刚刚经过 postman 测试，接口没有问题（其实我直接粘贴到浏览器，就成功了，下面的是 postman 的成功状态）
--如果服务器返回的 code 字段 200，代表服务器返回数据成功
--整个项目接口前缀都有 /api 字样

6：axios 二次封装
XMLHttpRquest、fetch、JQ、axios
6.1：为什么需要二次封装 axios？
请求拦截器、相应拦截器：请求拦截器，可以在发请求之前处理一些业务；相应拦截器，当服务器数据返回以后，可以处理一些事情。

6.2：项目当中经常出现的 API 文件夹【axios】
接口当中：路径都带有 api
baseURL: "/api"

6.3：有的同学 axios 基础不好，可以参考 git|NPM 的 axios 相关文档

7：接口统一管理

项目很小：完全可以在组件的生命周期函数中发请求

项目很大：axios.get("xxx")

7.1：跨域问题
什么是跨域：协议、域名、端口号不同的请求，称之为跨域。

http://localhost:8080/#/Home --前台项目本地服务器
http://gmall-h5-api.atguigu.cn --后台服务器

协议相同，但域名、端口号不同
JSONP、CROS、代理

8：nprogress 进度条的使用

start：进度条开始
done：进度条结束
样式可以修改

9：vuex 状态管理库

9.1：vuex 是什么？
vuex 是官方提供的一个插件，状态管理库，集中式管理项目中的组件公用的数据
切记：不是所有项目都需要 vuex。如果项目很小，完全不需要 vuex。如果项目很大，组件很多，数据很多，数据维护很费劲，使用 vuex。

state
mutations
actions
getters
modules

9.2：vuex 的基本使用

9.3：vuex 实现模块式开发
如果项目过大，组件过多，接口过多，接口过多，可以让 vuex 实现模块式开发
模拟 state 存储数据
{
home:{},
search:{}
}

10：完成 TypeNav 三级联动展示数据业务
