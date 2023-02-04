import axios, { HeadersDefaults } from "axios";
import Cookies from "cookies";
import cookie from "cookie";
import { BsCheckLg } from "react-icons/bs";

const axiosClient = axios.create();
const clientId: string = "d6d53426faf846c6abd5ee373086a7d9";
const clientSecret: string = "0cf34294b189487aa01d0665841697d2";
let scopes = "user-read-private user-read-email";

// Replace this with our own backend base URL
axiosClient.defaults.baseURL = "https://api.spotify.com";

type headers = {
  "Content-Type": string;
  Accept: string;
};

// axiosClient.defaults.headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// } as HeadersDefaults & headers;

// Adding Authorization header for all requests

axiosClient.interceptors.request.use(
  (config) => {
    //@ts-ignore

    const cookieInst = Cookies(
      //@ts-ignore
      config.extraParams.reqq, //@ts-ignore
      config.extraParams.ress //@ts-ignore
    );

    const token =
      //@ts-ignore
      config.extraParams.aToken !== "" && //@ts-ignore
      config.extraParams.aToken !== undefined //@ts-ignore
        ? config.extraParams.aToken
        : cookieInst.get("access_tkn");

    if (token) {
      config.headers!["Authorization"] = "Bearer " + token;
    }
    config.headers!["Content-Type"] = "application/json";
    config.headers!["Accept"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          let cookieInst = Cookies(
            originalConfig.extraParams.reqq,
            originalConfig.extraParams.ress
          );

          const rf_tkn = await axios.post(
            "https://accounts.spotify.com/api/token",
            {
              redirect_uri: "http://localhost:3000",
              grant_type: "refresh_token",
              //@ts-ignore
              refresh_token: cookieInst.get("refresh_tkn"),
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                  "Basic " +
                  Buffer.from(clientId + ":" + clientSecret).toString("base64"),
              },
            }
          );
          console.log("retry data");
          originalConfig.extraParams.aToken = rf_tkn.data.access_token;
          return axiosClient(originalConfig);
        } catch (_error) {
          // console.log("eror time out >>>>>>>>>>>>>>>>>>>>>>>>>>>>", _error);

          //window.location.href = window.location.origin;
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
