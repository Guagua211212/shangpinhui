import { v4 as uuidv4 } from "uuid";
//要生成一个随机字符串，且每次执行不能发生变化，游客身份要持久存储
export const getUUID = () => {
  //先从本地存储获取uuid（看一下本地存储里是否有）
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  //如果没有
  if (!uuid_token) {
    //生成临时游客身份
    uuid_token = uuidv4();
    //本地存储一次
    localStorage.setItem("UUIDTOKEN", uuid_token);
  }
  //所有的函数都要有返回值，不然会是undefined
  return uuid_token;
};

//这个也叫单例，即只执行一次
