import Vue from "vue";
import VueRouter from "vue-router";

const UserProfile = {
    template: `<div><router-link to="/bus/list-dtl">详情</router-link to="/bus"></div>`
};

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            menu: false,
            title: "首页",
            component: () => import("@src/pages/home")
        },
        {
            path: "/bus",
            title: "一级",
            menu: true,
            component: () => import("@src/components/layout"),
            redirect: "/bus/list",
            children: [
                {
                    path: "list",
                    title: "二级",
                    menu: true,
                    component: () => import("@src/pages/page1"),
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" }
                    ]
                },
                {
                    path: "list-dtl",
                    title: "详情",
                    menu: false,
                    component: UserProfile,
                    acPath: "/bus/list",
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" },
                        { title: "面包屑3", to: "" }
                    ]
                },
                {
                    path: "list2",
                    title: "二级",
                    menu: true,
                    component: UserProfile,
                    breadcrumb: [
                        { title: "面包屑1-1", to: "/" },
                        { title: "面包屑2-2", to: "" }
                    ]
                }
            ]
        },
        {
            path: "/admin_2",
            title: "菜单2",
            menu: true,
            component: () => import("@src/components/layout"),
            redirect: "/admin_2/index",
            children: [
                {
                    path: "index",
                    title: "子菜单",
                    menu: true,
                    component: () => import("@src/pages/page2"),
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" },
                        { title: "面包屑3", to: "" }
                    ]
                }
            ]
        },
        {
            path: "/403",
            title: "403",
            menu: false,
            component: () => import("@src/components/403")
        },
        {
            path: "*",
            title: "404",
            menu: false,
            component: () => import("@src/components/404")
        }
    ]
});

export default router;
