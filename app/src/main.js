import Vue from "vue";
import App from "./App.vue";

//三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
//引入全局组件Carousel
import Carousel from "@/components/Carousel";
//引入全局组件Pagination
import Pagination from "@/components/Pagination";
//第一个参数：全局组件的名字    第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//引入elementUI
import { Button, MessageBox } from "element-ui";
//全局注册方式
Vue.component(Button.name, Button);
//ElementUI注册组件的时候还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入MockServer.js-----mock数据
import "@/mock/mockServer";

//引入swiper样式
import "swiper/css/swiper.css";

//引入路由
import router from "@/router";

//引入仓库
import store from "./store";

//测试
// import { reqCategoryList } from "@/api";
// reqCategoryList();
// import { reqGetSearchInfo } from "@/api";
// console.log(reqGetSearchInfo({}));

//统一接口api文件夹里的全部请求函数
//统一引入
import * as API from "@/api";

//引入懒加载用的图片
import atm from "@/assets/atm.gif";
//引入图片懒加载插件
import VueLazyload from "vue-lazyload";
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm
});

//引入校验插件
import "@/plugins/validate";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由：底下的写法是    KV一致省略V【router小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route、$router属性
  router,
  //注册仓库：组件实例身上会多一个属性，$store属性
  store
}).$mount("#app");
