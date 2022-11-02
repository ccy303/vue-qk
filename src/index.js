import Vue from "vue";
import App from "./app";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import routes from "./routes";
import "element-ui/lib/theme-chalk/index.css";
import "@src/styles/common.less";
import https from "@src/https";
(async () => {
    let userInfo = null;

    try {
        ({ data: userInfo } = await https.user.getUser());
    } catch (err) {
        console.log(err);
    }

    const vueRouter = new VueRouter({
        routes: routes
    });

    vueRouter.beforeEach((to, from, next) => {
        console.log(to);
        next();
    });

    Vue.use(VueRouter);

    Vue.use(ElementUI, { size: "medium", zIndex: 3000 });

    Vue.mixin({
        data() {
            return {
                g_userInfo: userInfo
            };
        },
        methods: {
            $getDataType(data) {
                return Object.prototype.toString.call(data);
            }
        }
    });

    new Vue({
        el: "#root",
        router: vueRouter,
        render: render => render(App)
    });
})();
