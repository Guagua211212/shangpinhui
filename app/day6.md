复习：
1）search模块需要的服务器数据，我们已经请求到了，而且存储于vuex仓库当中，而且有一些数组数据【我们已经通过getters】进行简化
切记：getters简化数据而生
2）商品列表，平台售卖属性已经动态数据【来自于服务器】

1）动态开发面包屑中的分类名
编程是导航路由跳转【自己跳转到自己】

2）动态开发面包屑中的关键字
2.1当面包屑中的关键字清除以后，需要让兄弟组件Header组件中的关键字清楚
设计组件通信
props：父子
自定义事件：子父
vuex：万能
插槽：父子
pubsub-js：万能
$bus：全局事件总线，万能