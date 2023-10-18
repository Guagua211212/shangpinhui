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

//获取Search模块的数据 地址：/api/list 请求方式：post 参数：需要带参数
//当前的这个函数需不需要接收外部传递参数
//当前这个接口【获取搜索模块数据的接口】，给服务器传递一个默认参数params，这个参数至少要是一个空对象
export const reqGetSearchInfo = params =>
  requests({
    url: "/list",
    method: "post",
    data: params
  });

//获取产品详情信息的接口  URL:/api/item/{skuid}  请求方式：get
export const reqGoodsInfo = skuId =>
  requests({ url: `/item/${skuId}`, method: "get" });

//将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
