<template>
    <el-menu-item v-if="!menu.children" :index="menu.fullPath" :key="menu.fullPath">
        <template slot="title">
            <span slot="title">{{ menu.title }}</span>
        </template>
    </el-menu-item>
    <el-submenu v-else :key="menu.fullPath" :index="menu.fullPath">
        <template slot="title">
            <span slot="title">{{ menu.title }}</span>
        </template>
        <menuItem v-for="child in menu.children" :menu="child" :key="child.fullPath" />
    </el-submenu>
</template>

<script>
export default {
    name: "menuItem",
    props: ["menu"],
};
</script>
<style lang="less">
</style>