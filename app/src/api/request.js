//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
// console.log(nProgress);
//nprogress的方法：start：进度条开始 done：进度条结束
//引入进度条样式
import "nprogress/nprogress.css";
//在当前模块中引入store
import store from "@/store";

//1：利用axios对象的create方法，去创建一个axios实例
//2：request就是axios，但是我们可以配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径中会出现api
  baseURL: "/api",
  //请求超时的时间是5s
  timeout: 5000
});

//请求拦截器，请求拦截器可以检测到，可以在发请求之前处理一些业务
requests.interceptors.request.use(config => {
  //config：配置对象，对象里面有一个属性很重要，headers请求头

  if (store.state.Detail.uuid_token) {
    //请求头添加一个字段（userTemId）：和后台老师商量好了
    config.headers.userTempId = store.state.Detail.uuid_token;
    // console.log(config.headers.userTempId);
  }

  //进度条开始动
  nProgress.start();

  return config;
});

//相应拦截器，当服务器数据返回以后，可以处理一些事情
requests.interceptors.response.use(
  res => {
    //成功的回调函数

    //进度条结束
    nProgress.done();

    return res.data;
  },
  error => {
    //失败的回调函数
    return Promise.reject(new Error("faile"));
  }
);

//对外暴露
export default requests;
