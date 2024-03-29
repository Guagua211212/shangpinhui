import Vue from "vue";
import Vuex from "vuex";
//需要使用插件一次
Vue.use(Vuex);

//引入小仓库
import Home from "./Home";
import Search from "./Search";
import Detail from "./Detail";
import shopcart from "./ShopCart";
import user from "./user";
import trade from "./Trade";

// // state: {},       仓库，存储数据的地方
// const state = {};
// // mutations: {},       修改state的唯一手段
// const mutations = {};
// // actions: {},     处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {};
// // getters: {}      理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
// const getters = {};

//对外暴露store类的一个实例
export default new Vuex.Store({
  // state,
  // mutations,
  // actions,
  // getters
  //实现vuex仓库模块式开发存储数据
  modules: {
    Home,
    Search,
    Detail,
    shopcart,
    user,
    trade
  }
});
