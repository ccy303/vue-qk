<template>
    <el-container class="container">
        <cHeader />
        <el-container>
            <el-aside class="aside" width="200px">
                <el-menu :router="true" :default-active="defauleActive" class="menu">
                    <menuItem v-for="menu in menus" :menu="menu" :key="menu.title" />
                </el-menu>
            </el-aside>
            <el-main class="main">
                <div class="breadcrumb">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item
                            v-for="(item, idx) in breadcrumb"
                            :key="idx"
                            :replace="true"
                            :to="item.to"
                        >
                            {{ item.title }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <transition name="fade" mode="out-in">
                    <div class="content">
                        <router-view></router-view>
                    </div>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
import cHeader from "./header";
import menuItem from "./menuItem";
export default {
    data() {
        return {
            menus: [],
            defauleActive: "",
            breadcrumb: []
        };
    },
    components: {
        cHeader,
        menuItem
    },
    watch: {
        $route(to, from) {
            const currentRoute = this.$route.matched.slice(-1)[0];
            this.defauleActive = this.getRouteByPathRegExp(currentRoute.regex)?.acPath || to.fullPath;
            this.updateBreadcrumb(currentRoute);
        }
    },
    mounted() {
        const currentRoute = this.$route.matched.slice(-1)[0];
        this.menus = this.getMenus(this.$router.options.routes);
        this.defauleActive = this.getRouteByPathRegExp(currentRoute.regex)?.acPath || this.$route.path;
        this.updateBreadcrumb(currentRoute);
    },
    methods: {
        getMenus(routes = [], path = "") {
            const menus = [];
            routes.map(route => {
                route.fullPath = path + (route.path[0] == "/" ? route.path : `/${route.path}`);
                if (route.children) {
                    if (route.menu) {
                        menus.push({
                            path: route.path,
                            title: route.title,
                            fullPath: route.fullPath,
                            children: this.getMenus(route.children, route.fullPath)
                        });
                    } else {
                        menus.push(...(this.getMenus(route.children, route.fullPath) || []));
                    }
                } else {
                    route.menu &&
                        menus.push({
                            path: route.path,
                            title: route.title,
                            fullPath: route.fullPath
                        });
                }
            });
            return menus;
        },

        updateBreadcrumb(currentRoute, routes = this.$router.options.routes) {
            if (!currentRoute) return [];
            routes.map(route => {
                if (currentRoute.regex.test(route.fullPath)) {
                    this.breadcrumb = route.breadcrumb;
                    return;
                } else {
                    if (route.children) {
                        this.updateBreadcrumb(currentRoute, route.children);
                    }
                }
            });
        },

        getRouteByPathRegExp(exp, routes = this.$router.options.routes) {
            let out = null;
            for (let i = 0; i < routes.length; i++) {
                if (exp?.test(routes[i].fullPath)) {
                    out = routes[i];
                    break;
                } else if (routes[i].children) {
                    out = this.getRouteByPathRegExp(exp, routes[i].children);
                    if (out) {
                        break;
                    }
                }
            }
            return out;
        }
    }
};
</script>

<style scoped lang="less">
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .aside {
        .menu {
            height: 100%;
        }
    }
    .main {
        padding: 0;
        display: flex;
        flex-direction: column;
        .breadcrumb {
            box-shadow: 0 4px 12px 0 hsla(0, 0%, 62%, 0.1);
            height: 48px;
            line-height: 48px;
            display: flex;
            align-items: center;
            padding: 0 0 0 24px;
        }
        .content {
            flex: 1;
            padding: 20px;
        }
    }
}
</style>