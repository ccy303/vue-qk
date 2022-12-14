import Vue from "vue";
import App from "./app";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import routes from "./routes";
import utils from "./utils";
import "../public/theme/index.css";
import "@src/styles/common.less";
import https from "@src/https";

(async () => {
    Vue.use(ElementUI, { size: "medium", zIndex: 3000 });
    const vueRouter = new VueRouter({
        mode: "history",
        routes: routes
    });

    Vue.use(VueRouter);

    let userInfo = null;

    try {
        // ({ data: userInfo } = await https.user.getUser());
        userInfo = {};
        userInfo.auth = ["a", "b"];
    } catch (err) {
        console.log(err);
    }

    vueRouter.beforeEach((to, from, next) => {
        if (!userInfo && to.meta.logined !== false) {
            return next("/login");
        } else if (to.meta.auth) {
            return utils.$checkAuth(userInfo.auth, to.meta.auth) ? next() : next("/403");
        }
        next();
    });

    Vue.prototype.$http = https;


    Vue.mixin({
        data() {
            return {
                g_userInfo: userInfo
            };
        },
        methods: {
            ...utils
        }
    });

    // event bug
    Vue.prototype.$EB = new Vue();

    new Vue({
        el: "#root",
        router: vueRouter,
        render: render => render(App)
    });
})();
