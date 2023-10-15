import { reqGoodsInfo } from "@/api";

const state = {
  goodInfo: {}
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  }
};
const actions = {
  //获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  }
};
//简化数据而生
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}; //这种写法的情况下，在初始的时候，goodInfo是一个空对象，会返回undefined，没有categoryView这个属性，网页上会警告。所以给一个||{}空对象的备选方案。
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
