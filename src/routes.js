const UserProfile = {
    template: `<div><router-link to="/bus/list-dtl">详情</router-link to="/bus"></div>`
};

export default [
    {
        path: "/",
        name: "首页",
        component: () => import("@src/pages/home"),
        meta: {
            menu: false
        }
    },
    {
        path: "/login",
        name: "登录",
        component: () => import("@src/pages/login"),
        meta: {
            logined: false,
            menu: false
        }
    },
    {
        path: "/bus",
        name: "一级",
        component: () => import("@src/components/layout"),
        redirect: "/bus/list",
        meta: {
            menu: true
        },
        children: [
            {
                path: "list",
                name: "二级",
                component: () => import("@src/pages/page1"),
                meta: {
                    menu: true,
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" }
                    ]
                }
            },
            {
                path: "list2",
                name: "二级",
                component: UserProfile,
                meta: {
                    menu: true,
                    breadcrumb: [
                        { title: "面包屑1-1", to: "/" },
                        { title: "面包屑2-2", to: "" }
                    ]
                }
            },
            {
                path: "list-dtl",
                name: "详情",
                meta: {
                    menu: false,
                    acPath: "/bus/list2",
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" },
                        { title: "面包屑3", to: "" }
                    ]
                },
                component: UserProfile
            }
        ]
    },
    {
        path: "/admin_2",
        name: "菜单2",
        component: () => import("@src/components/layout"),
        redirect: "/admin_2/index",
        meta: {
            menu: true
        },
        children: [
            {
                path: "index",
                name: "子菜单",
                component: () => import("@src/pages/page2"),
                meta: {
                    menu: true,
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" },
                        { title: "面包屑3", to: "" }
                    ]
                }
            }
        ]
    },
    {
        path: "/auth",
        name: "权限路由",
        meta: {
            menu: false
        },
        component: () => import("@src/components/layout"),
        children: [
            {
                path: "index",
                name: "权限路由",
                component: UserProfile,
                meta: {
                    // auth: { type: "|", auths: ["a"] },
                    // auth: { type: "&", auth: ["a"] },
                    auth: ["aaa"],
                    menu: true,
                    breadcrumb: [
                        { title: "面包屑1", to: "/" },
                        { title: "面包屑2", to: "" },
                        { title: "面包屑3", to: "" }
                    ]
                }
            }
        ]
    },
    {
        path: "/403",
        title: "403",
        meta: {
            menu: false
        },
        component: () => import("@src/components/403")
    },
    {
        path: "*",
        title: "404",
        menu: false,
        meta: {
            menu: false
        },
        component: () => import("@src/components/404")
    }
];
