1：vue-cli 脚手架初始化项目
node + webpack + 淘宝镜像

node_modules 文件夹:项目依赖
public 文件夹:一般放置一些静态资源（图片），需要注意，放在 public 文件夹中的静态资源，webpack 进行打包的时候会原封不动地打包到 dist 文件夹中。

src 文件夹（程序员源代码文件夹）：

    assets文件夹：一般也是放置静态资源（一般放置多个组件共用地静态资源），需要注意，放置在 assets 文件夹里的静态资源，再 webpack 打包时，webpack 会把静态资源当作一个模块，打包到 JS 文件里面。

    components文件夹：一般放置的是非路由组件（全局组件）。

    App.vue：唯一的根组件，vue中的组件都是.vue组件。
    main.js：程序唯一的入口文件。

babel.config.js：配置文件（babel 相关）

package.json 文件：认为是项目的“身份证”，记录了项目叫什么，有哪些依赖，项目怎么运行。。。

package-lock.json 文件：缓存性文件

README.md：说明性文件。

2：项目的其他配置

    2.1：项目运行起来的时候，让浏览器自动打开

    ---package.json

        "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
        },

    2.2：eslint校验功能关闭。

    ---在根目录下，创建一个 vue.config.js
    比如配置变量，但是没有使用，eslint工具会报错。

    2.3：src文件简写方法，配置别名。 @
    jsconfig.json配置别名@提示 【@代表的是src文件夹，这样将来文件过多，找的时候会方便很多】
    {
        "compilerOptions": {
            "baseUrl": "./",
            "paths": {
                "@/*": ["src/*"]
            },
        }
        // "exclude": ["node_modules", "dist"]
    }

3：项目的路由分析

    vue-router
    前端所谓路由：KV 值对。
    key：URL（地址栏中的路径）
    value：相应的路由组件
    注意：项目的上中下结构。

    路由组件：
    Home 首页路由组件、Search 路由组件、Login 路由组件、Register 路由组件。
    非路由组件：
    Header
    Footer【在首页、搜索页】，但是在登录页是没有的。

4：完成非路由组件 Header 与 Footer 业务

    在咱们项目当中，不再以 HTML + CSS 为主，主要搞业务、逻辑。

    在开发的时候：
        1：书写静态页面（HTML，CSS）
        2：拆分组件
        3：获取服务器的动态数据展示
        4：完成相应的动态业务逻辑
    注意1：创建组件的时候，组件结构 + 组件的样式 + 图片资源。
    注意2：咱们项目采用less样式，浏览器不识别less样式，需要通过less、less-loader【安装5版本】进行处理less，把less样式变成css样式，浏览器才可以识别。
    注意3：如果想让组件识别less样式，需要在style标签上添加lang=less。

    4.1：使用组件的步骤（非路由组件）
    -创建或者定义
    -引入
    -注册
    -使用

5：路由组件的搭建
vue-router
在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register
-components 文件夹：经常放置的非路由组件（公用全局组件）
-pages|views 文件夹：经常放置路由组件

5.1 配置路由
项目当中配置的路由一般放置在 router 文件夹中

5.2 总结
路由组件和非路由组件的区别？
1：路由组件一般放置在 pages|views 文件夹中，非路由组件一般放置在 components 文件夹中
2：路由组件一般需要在 router 文件夹中进行注册（使用的即为组建的名字），非路由组件在使用的时候，一般以标签的形式使用
3：注册完路由，不管是路由组件还是非路由组件，身上都有$route、$router 属性

$route：一般获取路由信息【路径、query、params等等】
$router：一般进行编程式导航进行路由跳转【push|replace】

5.3 路由的跳转？
路由的跳转有两种形式：
声明式导航 router-link，可以进行路由的跳转
编程式导航 push、replace，可以进行路由的跳转

编程式导航：声明式导航能做的，编程式导航也能做，但是编程式导航除了可以进行路由的跳转，还可以进行一些其他的业务逻辑。

6 Footer 组件显示与隐藏
显示或者隐藏组件：v-if、v-show
v-if 会频繁地操作 dom
Footer 组件：在 Home、Search 显示 Footer 组件
Footer 组件：在登录、注册的时候隐藏的

6.1 我们可以根据组件身上的$route 获取当前路由的信息，通过路由路径判断 Footer 显示与隐藏
6.2 配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，他的 key 不能瞎写，胡写，乱写。

8 路由传参

8.1：路由跳转有几种方式？
比如 A -> B
声明式导航：router-link（务必要有 to 属性），可以实现路由的跳转。
编程式导航： 利用的是组件实例的$router.push|replace 方法，可以实现路由的跳转。声明式导航能做的编程式导航都能做。

8.2：路由传参，参数有几种写法？
params 参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位。
query 参数：不属于路径当中的一部分，类似于 ajax 中的 queryString /home?k=v&k=v，不需要占位。

9：路由传参相关面试题
9.1：路由传递参数（对象写法）path 是否可以结合 params 参数一起使用？
9.2：如何指定 params 参数可传不可传？
比如：配置路由的时候已经占位了（params 参数），但是路由跳转的时候就不传递。
路径会出现问题
9.3：params 参数可以传递也可以不传递，但是如果传递是空串，如何解决？
9.4：路由组件能不能传递 props 数据？
