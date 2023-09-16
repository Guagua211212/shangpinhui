//当前这个模块：api进行统一管理
import requests from "./request";

import mockRequests from "./mockAjax";

//三级联动的接口
///api/product/getBaseCategoryList      get     无参数

// export const reqCategoryList = () => {
//   //发请求：axios发请求，发挥的值是axios对象
//   return requests({ url: "/product/getBaseCategoryList" });
// };

export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner");
// export const reqGetBannerList = () =>
//   requests({ url: "/product/banner", method: "get" });

//获取floor组件数据
export const reqFloorList = () => mockRequests.get("/floor");
