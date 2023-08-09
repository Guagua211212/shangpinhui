import { reqCategoryList } from "@/api";

//Home模块的小仓库
const state = {
  //state中数据吗，默认初始值别瞎写，服务器返回对象就写对象，服务器返回数组就写数组。【根据接口的返回值做初始化】
  categoryList: []
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  }
};
const actions = {
  //通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    console.log(result);
    if (result.code == 200) {
      commit("CATEGORYLIST", result.data);
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
};
