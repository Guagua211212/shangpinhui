//先引入mockjs模块
import Mock from "mockjs";
//把JSON数据格式引入进来
import banner from "./banner";
import floor from "./floor";
//即使这两个json文件数据格式没有对外暴露，但是可以引用。
//webpack默认对外暴露的有：图片、json数据格式

//mock数据：第一个参数--请求的地址  第二个参数--请求的数据
Mock.mock("/mock/banner", { code: 200, data: banner }); //模拟首页大轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });
