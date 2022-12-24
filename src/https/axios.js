import Axios from "axios";
const ax = Axios.create({});
import Vue from "vue";
// 请求拦截
ax.interceptors.request.use(config => {
    if (config.method.toLocaleLowerCase() === "get") {
        if (config.params) {
            config.params._t = new Date().getTime();
        } else {
            config.url += `?t=${new Date().getTime()}`;
        }
    }
    return config;
});

// 响应拦截
ax.interceptors.response.use(
    response => {
        const { data, headers, config } = response;
        if (data.code != 200 && !config?.headers?.["NO-E-MSG"]) {
            Vue.prototype.$message({
                type: "error",
                message: data.message
            });
            return Promise.reject({ data, headers });
        }
        return { data, headers };
    },
    err => {
        if (err.response.status == 401 && !err?.response?.config?.headers?.["NO-REDIRECT"]) {
            Vue.prototype.$message({
                type: "error",
                message: "登录失效",
                duration: 1500,
                onClose: () => {
                    location.href = `/login`;
                }
            });
            return;
        }
        !err?.response?.config?.headers?.["NO-E-MSG"] &&
            Vue.prototype.$message({
                type: "error",
                message:
                    err?.response?.status == "403"
                        ? "无权限"
                        : err.response.data.message || "系统错误"
            });
        return Promise.reject(err);
    }
);

export default ax;
