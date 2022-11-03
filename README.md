# vue 通用后台项目脚手架

## 工程目录

    | -- 根目录
        | -- config 配置文件
        | -- public webpack 打包公共文件
        | -- src 代码文件
        | -- assets 静态资源（图片\文件等）
        | -- components 通用组件
        | -- https 接口请求
        | -- pages 页面组件
        | -- styles 公共样式文件
        | -- utils 工具函数
        | -- routes.js 路由定义文件
        ...
    ...

## <span style="color:#FF9900">重要文件夹/文件定义及说明</span>

### https 接口请求文件

-   https 文件夹是项目接口请求仓库，推荐接口请请求按照模块划分定义不同的 js 文件（如：用户相关 user.js）。

-   axios.js 文件是 axios 库的二次封装，定义了请求拦截和接口拦截。

    请求拦截中所有的 get 请求会自动加上时间戳，以防浏览器缓存。相应拦截会对所有未成功请求做出全局 message 使用者无需重新针对异常信息做出提示（如不需要此功能需要再相应请求函数的 headers 中加上 NO-E-MSG：false），此外还会 promise.reject 返回错误对象。

    若请求成功不会进行成功提示，使用者需要自行在业务中添加相应提示（如需）, 成功返回体：{data, headers}

-   index.js 作为所有请求模块的整合导出，会注入到整个 vue 实例中。在开发中可快速使用（如：this.$http.user.getUser()）

### utils 工具函数文件夹

-   index.js 导出全部工具函数，工具函数命名需遵循 $字符开头(如：$getDataType)；所有工具函数会注入到 vue 实例中，开发中可通过 this.$getDataType 快速调用

### <span style="color:#ff3333">routes.js 路由定义文件</span>

基于 [vue-router](https://v3.router.vuejs.org/zh/) 实现, 支持所有 vue-router 属性

-   路由定义

    ```javascript
    // 无Layout路由（没有传统后台系统的侧边导航）
    {
        path: "/path",
        name: "name",
        component: () => import("组件路径"),
        meta: {
            menu?: Boolean // 是否在在侧边导航中显示导航, 默认值 false
            logined?: Boolean // 是否需要登录后方可访问，默认值true
            // 路由权限，本脚手架受用用户相关信息转化为相关字符串的方式定义权限(如：用户为客户，则相应权限字符串为 bus, 若用户进入此路由所需要的权限可以为 auths:["bus"])，且无权限路由不会展示在路由导航菜单中
            auth?: { type: "|", auths: ["1","2"] }, // 拥有1或者拥有2权限的都可进入
            auth?: { type: "&", auths: ["1","2"] }, // 拥有1且拥有2权限的都可进入
            auth?: ["1","2"], // 拥有1或者拥有2权限的都可进入
            // 页面面包屑导航；默认 [ {title:"当前路由name", to:''} ]
            breadcrumb?: [
                { title: "面包屑1", to: "/" },
                { title: "面包屑2", to: "" },
                { title: "面包屑3", to: "" }
            ],
            acPath?: 'fullPath' // 进入当前路由激活那个路由菜单，通常用于从列表进入详情，激活列表菜单
        }
    },

    // 有layout路由（包含传统后台系统的侧边导航）, 一级菜单
    {
        path: "/path",
        name: "name",
        meta: {
            menu: false  // 父层路由不显示鱼带单中, 多级菜单将此设置为true即可
            ...
        },
        component: () => import("@src/components/layout"),  // 父层渲染组件为layout
        children: [
            {
                path: "index",
                name: "name",
                component: () => import("组件路径"),
                meta: {
                    menu?: true
                    ...
                }
            }
        ]
    },


    ```
