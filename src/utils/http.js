import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import useLoginInfo from "@/store/useLoginInfo";
import router from "@/router/index";
import baseURL from "@/api/baseURL";

const [loginInfo] = useLoginInfo();

function getUserToken(config) {
  const token = loginInfo.value.token;
  if (token) {
    config.headers["xbb-ssh"] = token;
  }
  return config;
}

const axiosConfig = {
  timeout: 5 * 60000,
  baseURL,
};

let loadingInstance;
const interceptors = {
  request(config) {
    config = getUserToken(config);
    config.headers["Content-Type"] = "application/json";
    loadingInstance = ElLoading.service({
      lock: true,
    });
    return config;
  },
  requestError(error) {
    ElMessage.error(error.message.toString());
    return Promise.reject(error);
  },
  response(res) {
    const ret = res.data;
    loadingInstance?.close();
    return ret;
  },
  responseError(error) {
    loadingInstance?.close();
    if (error.response) {
      if (error.response.status == 500) {
        ElMessage.error("Network exception, please try again.");
        return Promise.reject(error);
      }
      if (error.response.status == 511) {
        ElMessage.error(error.response.data.message);
        router.push({
          name: "login",
          query: { to: router.currentRoute.value.fullPath },
        });
        return Promise.reject(error);
      }
      if (error.response.status == 510) {
        ElMessage.error(error.response.data.message);
        return Promise.reject(error);
      }
      ElMessage.error(error.message.toString());
    } else {
      ElMessage.error("Network exception, please try again.");
    }
    return Promise.reject(error);
  },
};

const axiosInstance = axios.create(axiosConfig);
axiosInstance.interceptors.request.use(interceptors.request, interceptors.requestError);
axiosInstance.interceptors.response.use(interceptors.response, interceptors.responseError);

export default axiosInstance;
