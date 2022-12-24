<template>
    <el-container class="container">
        <cHeader />
        <el-container>
            <el-aside class="aside" width="260px">
                <el-menu :router="true" :default-active="defauleActive" class="menu">
                    <menuItem v-for="menu in menus" :menu="menu" :key="menu.name" />
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
                        <div class="page">
                            <router-view></router-view>
                        </div>
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
                this.defauleActive = to.meta.acPath || to.path;
                this.breadcrumb = to.meta.breadcrumb || [{ title: to.name }];
            }
        },
        mounted() {
            const self = this;
            this.menus = this.getMenus(this.$router.options.routes);
            this.defauleActive = this.$route.meta.acPath || this.$route.path;
            this.breadcrumb = this.$route.meta.breadcrumb || [{ title: this.$route.name }];
            this.$EB.$on("setBreadcrumb", arg => {
                self.breadcrumb = arg;
            });
        },
        methods: {
            getMenus(routes = [], path = "") {
                const menus = [];
                const { g_userInfo, $checkAuth } = this;
                routes.map(route => {
                    route.fullPath = path + (route.path[0] == "/" ? route.path : `/${route.path}`);
                    if (route.meta.auth && !$checkAuth(g_userInfo.auth, route.meta.auth)) {
                        return;
                    }
                    if (route.children) {
                        if (route.meta.menu) {
                            menus.push({
                                path: route.path,
                                name: route.name,
                                meta: route.meta,
                                fullPath: route.fullPath,
                                children: this.getMenus(route.children, route.fullPath)
                            });
                        } else {
                            menus.push(...(this.getMenus(route.children, route.fullPath) || []));
                        }
                    } else {
                        route.meta.menu &&
                            menus.push({
                                path: route.path,
                                name: route.name,
                                fullPath: route.fullPath,
                                meta: route.meta
                            });
                    }
                });
                return menus;
            }
        }
    };
</script>

<style scoped lang="less">
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-width: 1366px;
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
                // height: calc(100vh - 60px - 48px);
                padding: 20px;
                box-sizing: border-box;
                background: #f4f5f9;

                .page {
                    // height: 100%;
                    box-sizing: border-box;
                    background: #fff;
                    padding: 20px;
                    overflow: auto;
                }
            }
        }
    }
</style>