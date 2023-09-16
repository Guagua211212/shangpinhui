复习：
1：商品分类的静态列表由静态变为动态形式【获取服务器数据，解决跨域问题】
2：函数的防抖与节流【面试的频率很高】
3：路由跳转：声明式导航（router-link）、编程式导航（push|replace）
router-link 是组件，是 vue-componnent 的实例
编程式导航解决这问题采用的是：自定义属性

1：开发 Search 模块中 typeNav 商品分类菜单（过渡动画效果）

过渡动画：前提是组件|元素务必要有 v-if | v-show 这样的指令才可以进行过渡动画

2:现在咱们的商品分类三级列表可以进行优化？
在app根组件当中，发请求【根组件mounted】执行一次

3：合并params与query参数？

4：开发Home首页当中的ListContainer组件与Floor组件？
但是这里需要知道一件事情：服务器返回的数据（接口）只有商品分类菜单分类数据。对于ListContainer组件与Floor组件的数据服务器没有提供。
mock数据（模拟数据）：如果你想mock数据，需要用插件mockjs

使用步骤：
1）在项目src文件夹下创建一个mock文件夹
2）准备JSON数据（mock文件夹中创建相应的JSON文件）----一定要格式化，留有空格是跑不起来的
3）把mock数据需要的图片放置到public文件夹中，【public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中】
4）开始mock（虚拟的数据），通过mockjs模块实现。创建mockServe.js文件通过mockjs插件实现模拟数据。
5）mockServer.js文件在入口文件中引入（至少需要执行一次，才能模拟数据）

5：ListContainer组件开发终点？
安装Swiper插件：最新版本6，安装的是swiper@5
cnpm install --save swiper@5