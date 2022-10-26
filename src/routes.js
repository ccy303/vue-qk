import Vue from "vue";
import VueRouter from "vue-router";

const EmptyRouter = {
    template: `<router-view></router-view>`
};

const UserProfile = {
    template: `<div>UserProfile</div>`
};
const UserPosts = {
    template: `<div>UserPosts</div>`
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
            path: "/admin_1",
            title: "菜单1",
            menu: true,
            component: () => import("@src/components/layout"),
            redirect: "/admin_1/index",
            children: [
                {
                    path: "index",
                    title: "子菜单",
                    menu: true,
                    component: UserProfile
                }
            ]
        },
        {
            path: "/admin_2",
            title: "菜单2",
            menu: true,
            component: () => import("@src/components/layout"),
            redirect: "/admin_1/index",
            children: [
                {
                    path: "index",
                    title: "子菜单",
                    menu: true,
                    component: UserPosts
                }
            ]
        }
    ]
});

export default router;
