复习：
1：完成了登录与注册的静态组件【assets文件夹：组件共用静态资源（css中可以书写@符号，但是切记，要在前面加上~）】
2：表单验证，暂时没有处理，在最后一天统一处理
3：vuex存储数据非持久化

1）登录过后首页用户信息的展示
http://182.92.128.115/api/user/passport/auth/getUserInfo
1.1当用户注册完成，用户登录【用户名+密码】向服务器发请求（组件派发action:userLogin），登录成功获取到token，仓储与仓库中（非持久化），路由跳转到home首页。
1.2因此在首页当中（mounted）当中派发action（getUserInfo）获取用户信息，一级动态展示header组件内容。
1.3一刷新home首页，获取不到用户信息（token：vuex非持久化存储
1.4持久化存储
1.5存在的问题1.多个组件展示用户信息需要在每一个组件的mounted中发出this.$store.dispatch("getUserInfo"); 不行
1.6存在的问题2.用户已经登录了，就不应该在回到登录页

2）退出登录

3）导航守卫
导航：表示路由正在发生变化，进行路由跳转
守卫：你把他当作“紫禁城的护卫”

全局守卫：你的项目当中，只要路由发生变化，就能监听到

举例子：紫禁城【皇帝、太后、妃子】，紫禁城大门守卫全要排查
路由独享守卫：
举例子：紫禁城【皇帝、太后、妃子】，是相应的【皇帝、太后、妃子】路上守卫
组件内守卫：
举例子：我要去皇帝物资
举例子：老师已经到皇帝物资外面了（进入了）守卫

比如：用户已经登录，用户就不应该再能回到login页面

4）整个项目，游客（uuid）与用户（token），后台老师以token为大

5）统一登录的账号？
13700000000    111111

6）获取交易页面用户信息？
用户登录了才可以获取地址信息，不登陆没法获取到