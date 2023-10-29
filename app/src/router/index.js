//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);

import routes from "./routes";
import store from "@/store";

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
let router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savePosition) {
    //返回的y=0代表滚动条在最上方
    return { y: 0 };
  }
});

//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  //to：可以获取到你要跳转到哪一个路由的信息
  //from：可以获取到你从哪个路由而来的信息
  //next：放行函数
  // next();//直接放行
  // next("/login"); //放行到指定的路由,这样写会报错，一般是要判断的
  // next(false);
  //用户登录了才会有token，没登录的时候一定没有token
  let token = store.state.user.token;
  //用户信息
  let name = store.state.user.userInfo.name;
  //用户已经登录了
  if (token) {
    //用户已经登录了，还想去login，休想【不能去，停留在首页】
    if (to.path == "/Login" || to.path == "/Register") {
      next("/Home");
    } else {
      //登陆了，但是去的不是login【home|search|detail|shopcart】
      //如果用户名已有
      if (name) {
        next();
      } else {
        //没有用户信息，派发action让仓库存储用户信息再跳转
        //获取用户信息，在首页展示
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效了，获取不到用户信息，重新登录
          //清除token
          await store.dispatch("userLogout");
        }
      }
    }
  } else {
    //未登录--交易相关（trade）、支付相关（pay、paysucess）、用户中心相关（center），跳转到登录页面
    //去的不是上面这些路由----放行
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
