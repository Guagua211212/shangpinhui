//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";

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
  routes: [
    {
      path: "/Home",
      component: Home,
      meta: {
        show: true
      }
    },
    {
      path: "/Login",
      component: Login,
      meta: {
        show: false
      }
    },
    {
      path: "/Register",
      component: Register,
      meta: {
        show: false
      }
    },
    {
      name: "Search",
      path: "/Search/:keyword?",
      component: Search,
      meta: {
        show: true
      },
      //路由组件能不能传递 props 数据？
      //布尔值写法：只能传递params参数，需要在Search中用props接收，不接收的话会出现在attrs中。
      // props: true
      //对象写法：额外给路由传递一些props
      // props: { a: 1, b: 2 }
      //函数写法：可以params参数、query参数，通过props传递给路由组件。
      props: $route => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    //重定向，在项目跑起来的时候，访问/，立刻定向到首页
    {
      path: "*",
      redirect: "/Home"
    }
  ]
});
