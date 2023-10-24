//登录与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo } from "@/api";
import { setToken, getToken } from "@/utils/token";

const state = {
  code: "",
  token: getToken(),
  userInfo: {}
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  }
};
const actions = {
  //获取验证码的这个接口：把验证码返回，但是正常情况，后台会把验证码发到用户手机上【省钱】
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //登录业务
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    //服务器下发的token，用户的唯一标识符（uuid）
    //将来经常通过带token找服务器要用户的信息进行展示
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      // localStorage.setItem("TOKEN", result.data.token);
      setToken(result.data.token);
      return "ok ";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //用户信息展示
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      //提交用户信息
      commit("GETUSERINFO", result.data);
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
