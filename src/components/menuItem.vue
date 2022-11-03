<template>
    <el-menu-item v-if="!menu.children" :index="menu.fullPath" :key="`if${menu.fullPath}`">
        <template slot="title">
            <span slot="title">{{ menu.name }}</span>
        </template>
    </el-menu-item>
    <el-submenu v-else :key="`else${menu.fullPath}`" :index="menu.fullPath">
        <template slot="title">
            <span slot="title">{{ menu.name }}</span>
        </template>
        <menuItem v-for="child in menu.children" :menu="child" :key="child.fullPath" />
    </el-submenu>
</template>

<script>
export default {
    name: "menuItem",
    props: ["menu"]
};
</script>
<style lang="less">
</style>