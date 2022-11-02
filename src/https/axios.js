import Axios from "axios";
const ax = Axios.create({});

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
        const { data, headers } = response;
        return response.headers["x-total-count"]
            ? { data: data, total: headers["x-total-count"], headers }
            : { data, headers };
    },
    err => {
        // !err?.response?.config?.headers?.["NO-E-MSG"] && message.error(err.response.data.message);
        // if (err.response.status == "401" && !!!err?.response?.config?.headers?.["NO-REDIRECT"]) {
        //     setTimeout(() => {
        //         window.location = "/#/login";
        //     }, 1000);
        // }
        return Promise.reject(err);
    }
);

export default ax;
