<template>
    <div class="warp">
        <div class="posi">
            <div class="font">403</div>
            您没有权限访问该页面
            <router-link to="/logout">
                <el-button style="font-size: 16px" type="text">退出登录</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="less" scoped>
    .warp {
        background: url("@src/assets/bg_notFound.jpg");
        height: 100%;
        width: 100%;
        background-size: contain;
        background-position: center;
        font-size: 16px;
        position: relative;
        .posi {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            .font {
                font-size: 140px;
                color: #ff0000;
                font-weight: bold;
            }
        }
    }
</style>