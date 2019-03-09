import axios from "axios";

axios.interceptors.request.use(
  config => {
    // can add common header for all request
    if (!config.headers) {
      config.headers = {
        "Content-Type": "application/json"
      };
    }
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;
