import { reqGetSearchInfo } from "@/api";

//Search模块的仓库
const state = {
  //仓库初始状态
  searchList: {}
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  }
};
const actions = {
  //获取Search模块的数据
  async getSearchList({ commit }, params = {}) {
    //当这个函数reqGetSearchInfo在调用获取服务器数据的时候，至少传递一个参数（空对象）
    //params形参：是当用户派发action的时候，第二个传递过来的参数，至少是一个空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  }
};
//计算属性，在项目当中，为了简化仓库当中的数据而生
//在项目当中，getters的主要作用是：简化仓库中的数据【为简化数据而生】
//可以把将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
  //这个state是当前仓库中的形参state，并非大仓库中的那个state
  goodsList(state) {
    //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
    //假如网络不给力|没有网，state.searchList.goodsList返回的是undefined
    //计算新的属性的属性值至少给人家一个数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  }
  //这里是使用mapState行不通，所以用了getter的方法，但是解决了，行不通的原因是Search没有大写
  // total(state) {
  //   return state.searchList.total;
  // }
};
export default {
  state,
  mutations,
  actions,
  getters
};
