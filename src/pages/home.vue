<template>
    <div class="content">
        <cHeader />
        <div class="bg">
            <div class="btn">
                <router-link to="/bus"><el-button type="primary">前往后台</el-button></router-link>
            </div>
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
.content {
    width: 100%;
    height: 100%;
    .bg {
        background: url("@src/assets/bg.gif");
        background-size: cover;
        width: 100%;
        height: 100%;
        .btn {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
