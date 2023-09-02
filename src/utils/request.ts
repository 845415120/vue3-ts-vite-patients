// import { useUserStore } from "@/stores";
// import router from "@/router";
// import axios from "axios";
// import { showFailToast } from "vant";

// // 1. 新axios实例，基础配置
// const baseURL = "https://consult-api.itheima.net/";
// const request = axios.create({
//   baseURL,
//   timeout: 10000,
// });

// // 2. 请求拦截器，携带token
// request.interceptors.request.use(
//   (config) => {
//     const store = useUserStore();
//     if (store.user?.token) {
//       config.headers.Authorization = `Bearer ${store.user.token}`;
//     }
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// // 3. 响应拦截器，剥离无效数据，401拦截
// request.interceptors.response.use(
//   (res) => {
//     // 后台约定，响应成功，但是code不是10000，是业务逻辑失败
//     if (res.data?.code !== 10000) {
//       showFailToast(res.data.message);
//       return Promise.reject(res.data);
//     }
//     // 业务逻辑成功，返回响应数据，作为axios成功的结果
//     return res.data?.data;
//   },
//   (err) => {
//     if (err.response.status === 401) {
//       // 删除用户信息
//       const store = useUserStore();
//       store.delUser();
//       // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
//       router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`);
//     }
//     return Promise.reject(err);
//   }
// );
// export { baseURL, request };

import axios, { AxiosError, type Method } from "axios";
import { useUserStore } from "../stores";
import { showToast } from "vant";
// import { storeToRefs } from 'pinia'
import router from "@/router";
export const baseURL = "https://consult-api.itheima.net/";
//创建实例
const instance = axios.create({
  // 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
});
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 2. 携带token
    const store = useUserStore();
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
//响应连接器
instance.interceptors.response.use(
  (res) => {
    //  3. 处理业务失败
    // 1,判断code是否为规定值
    if (res.data.code !== 10000) {
      showToast(res.data.message || "业务失败");
      return Promise.reject(res.data);
    }
    //  4. 摘取核心响应数据
    return res.data;
  },
  (err: AxiosError) => {
    //处理401错误
    if (err.response?.status === 401) {
      //清除本地的用户信息
      const store = useUserStore();
      store.delUser();
      // 跳转到登录页面，携带当前访问页面的地址(包含参数)
      router.push({
        path: "/login",
        //currentRoute当前路由地址
        query: { returnUrl: router.currentRoute.value.fullPath },
      });
    }
  }
);
type Data<T> = {
  code: number;
  message: string;
  data: T;
};
export default instance;
export const request = <T>(
  url: string,
  method: Method = "GET",
  submitData?: object
) => {
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === "GET" ? "params" : "data"]: submitData,
  });
};
