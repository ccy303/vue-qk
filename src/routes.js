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
                    component: UserProfile,
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" }
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
        }
        // {
        //     path: "/admin_2",
        //     title: "菜单2",
        //     menu: true,
        //     component: () => import("@src/components/layout"),
        //     redirect: "/admin_2/index",
        //     children: [
        //         {
        //             path: "index",
        //             title: "子菜单",
        //             menu: true,
        //             component: UserPosts
        //         }
        //     ]
        // }
    ]
});

export default router;
