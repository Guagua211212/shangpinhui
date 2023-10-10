//引入路由组件
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";
import Detail from "@/views/Detail";

//路由配置信息
export default [
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
    path: "/Search/:keyword?", //这个？表示这个参数可以传递也可以不传递
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
  {
    path: "/Detail/:skuid?",
    component: Detail,
    meta: {
      show: true
    }
  },
  //重定向，在项目跑起来的时候，访问/，立刻定向到首页
  {
    path: "*",
    redirect: "/Home"
  }
];
