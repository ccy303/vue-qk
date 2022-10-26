<template>
    <el-container class="container">
        <cHeader />
        <el-container>
            <el-aside width="200px">
                <el-menu :router="true" :default-active="defauleActive">
                    <template v-for="menu in menus">
                        <template v-if="!menu.children">
                            <el-menu-item :index="menu.fullPath" :key="menu.fullPath">
                                <span slot="title"> {{ menu.title }} </span>
                            </el-menu-item>
                        </template>
                        <template v-else>
                            <el-submenu :key="menu.fullPath" :index="menu.fullPath">
                                <span slot="title"> {{ menu.title }} </span>
                                <el-menu-item
                                    v-for="subMenu in menu.children"
                                    :index="subMenu.fullPath"
                                    :key="subMenu.fullPath"
                                >
                                    {{ subMenu.title }}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import cHeader from "./header";
export default {
    data() {
        return {
            menus: [],
            defauleActive: ""
        };
    },
    components: {
        cHeader
    },
    watch: {
        $route(to, from) {
            this.defauleActive = to.fullPath;
        }
    },
    mounted() {
        console.log(this);
        this.menus = this.getMenus(this.$router.options.routes);
        this.defauleActive = this.$router.currentRoute.fullPath;
    },
    methods: {
        getMenus(routes = [], path = "") {
            const menus = [];
            routes.map(v => {
                v.fullPath = path + (v.path[0] == "/" ? v.path : `/${v.path}`);
                if (v.children) {
                    if (v.menu) {
                        v.children = this.getMenus(v.children, v.fullPath);
                        menus.push(v);
                    } else {
                        menus.push(...(this.getMenus(v.children, v.fullPath) || []));
                    }
                } else {
                    v.menu && menus.push(v);
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
}
</style>