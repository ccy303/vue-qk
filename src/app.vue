<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this);
    }
};
</script>

<style scoped lang="less">
.container {
    display: flex;
    height: 100%;
}
</style>