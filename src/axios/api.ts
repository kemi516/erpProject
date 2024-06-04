// import axios from "./axios";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8081';//基本路径
// axios.defaults.baseURL = 'https://kemi.loca.lt';//基本路径

axios.defaults.headers.post['content-Type'] = 'application/json';//设置这个请求参数就是json
axios.defaults.headers.delete['content-Type'] = 'application/json';
axios.defaults.headers.put['content-Type'] = 'application/json';
//登录
const getLogin = (name: any, pawd: any) => {
  return axios.post("/login", {
    name,
    pawd,

  });
};
//所有用户
const getUserAll = () => {
  return axios.get("/userAll");
};
//删除一个用户
const DeleteUser = (username: any) => {
  return axios.delete("/users", {
    data: {
      username: username
    }
  });
};
//改一个用户
const updatetUser = (inserData: any) => {
  return axios.put("/users", inserData);
};
// 添加一个用户
const insertUser = (inserData: any) => {
  return axios.post("/users", inserData);
};

//所有joke
const geJokeAll = () => {
  return axios.get("/jokeContent");
};
//删除一个joke数据
const DeleteJoke = (username: any) => {
  return axios.delete("/jokeContent", {
    data: {
      title: username
    }
  });
};
//改一个joke
const updatetJoke = (inserData: any) => {
  return axios.put("/jokeContent", inserData);
};
// 添加一个joke
const inserJoke = (inserData: any) => {
  return axios.post("/jokeContent", inserData);
};


//所有Riddle
const geRiddleAll = () => {
  return axios.get("/riddle");
};
//删除一个Riddle数据
const DeleteRiddle = (username: any) => {
  return axios.delete("/riddle", {
    data: {
      id: username
    }
  });
};
//改一个Riddle
const updatetRiddle = (inserData: any) => {
  return axios.put("/riddle", inserData);
};
// 添加一个Riddle
const inserRiddle = (inserData: any) => {
  return axios.post("/riddle", inserData);
};

//所有shop
const getShopAll = () => {
  return axios.get("/shopListAll ");
};
//删除一个Riddle数据
const DeleteShop = (username: any) => {
  return axios.delete("/shopList", {
    data: {
      title: username
    }
  });
};
//改一个Shop
const updatetShop = (inserData: any) => {
  return axios.put("/shopList", inserData);
};
// 添加一个Shop
const inserShop = (inserData: any) => {
  return axios.post("/shopList", inserData);
};
export { getLogin, getUserAll, DeleteUser, updatetUser, insertUser, DeleteJoke, geJokeAll, updatetJoke, inserJoke, geRiddleAll, DeleteRiddle, updatetRiddle, inserRiddle, getShopAll, DeleteShop, updatetShop, inserShop };
