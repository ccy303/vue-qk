import Vue from "vue";
import App from "./app";
import VueRouter from "vue-router";

Vue.use(VueRouter);

new Vue({
	el: "#root",
	render: (render) => render(App),
});
