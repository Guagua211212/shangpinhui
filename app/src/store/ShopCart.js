import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: []
};

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};

const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    //测试是否能获取个人购物车数据
    // console.log(result);
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },

  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  //修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  //删除选中的所有的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context：小仓库   commit【提交mutation修改state】  getters【计算属性】  dispatch【派发action】  state【当前仓库中的数据】
    //获取购物车中全部勾选产品的信息
    PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let result =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      console.log(result); //这里返回的result是一个Promise
      PromiseAll.push(result);
    });
    //只要全部的result【promise】都是成功，则返回成功，有一个不成功，则返回失败
    return Promise.all(PromiseAll);
  }
};

const getters = {
  cartList(state) {
    return state.cartList[0] || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
