import Vue from "vue";
import App from "./app";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import routes from "./routes";
import "element-ui/lib/theme-chalk/index.css";
import "@src/styles/common.less";
Vue.use(VueRouter);

Vue.use(ElementUI, { size: "medium", zIndex: 3000 });

Vue.mixin({
    methods: {
        getDataType(data) {
            return Object.prototype.toString.call(data);
        }
    }
});

new Vue({
    el: "#root",
    router: routes,
    render: render => render(App)
});
