<template>
    <div class="container">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    mounted() {}
};
</script>

<style scoped lang="less">
.container {
    display: flex;
    height: 100%;
}
</style>