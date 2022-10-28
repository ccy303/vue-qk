<template>
    <div>
        <cHeader />
        <img width="100%" :src="require('@src/assets/bg.gif')" alt="" />
        <div class="btn">
            <router-link to="/bus"><el-button type="primary">前往后台</el-button></router-link>
        </div>
    </div>
</template>

<script>
import cHeader from "@src/components/header";
export default {
    components: {
        cHeader
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
