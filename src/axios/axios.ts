import axios from "axios";

let config = {
  baseURL: "http://localhost:8081",
  // baseURL: "https://kemi.loca.lt" ,
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // 检查跨站点访问控制
  // headers: { 'X-Custom-Header': 'foobar' }
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Custom-Header': 'foobar' }

};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => {
    // console.log("发送请求");
    // Do something before request is sent
    // config.headers = { token: localStorage.getItem("token") };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios;
