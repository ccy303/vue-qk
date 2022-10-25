<template>
    <div class="test">
        哈哈哈哈123
        <div class="test1">123</div>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(123);
    },
};
</script>

<style scoped lang="less">
.test {
    background: #000;
    color: #fff;
    .test1 {
        background: red;
    }
}
</style>