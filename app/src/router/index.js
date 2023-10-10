//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);

import routes from "./routes";

//复制保留一份
let originalPush = VueRouter.prototype.push;
let originalReplace = VueRouter.prototype.replace;

//重写Push
//第一个参数：告诉原来的push方法，你应该往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call||apply的区别
//相同点：都可以调用函数一次，都可以篡改函数上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递参数
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originalPush.call(this, location, resolve, reject);
  } else {
    originalPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originalReplace.call(this, location, resolve, reject);
  } else {
    originalReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//配置路由
export default new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savePosition) {
    //返回的y=0代表滚动条在最上方
    return { y: 0 };
  }
});
