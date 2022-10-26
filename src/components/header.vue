<template>
    <el-header class="header">
        <div class="left">
            <a href="/">
                <img :src="require('@src/assets/logo_dx.png')" alt="" />
            </a>
            <span class="title">XXXX平台</span>
        </div>
        <div class="usr">这是用户信息</div>
    </el-header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.08);
    z-index: 99;
    .left {
        display: flex;
        align-items: center;
        .title {
            margin-left: 20px;
            font-weight: bolder;
        }
    }
    .usr {
    }
}
</style>