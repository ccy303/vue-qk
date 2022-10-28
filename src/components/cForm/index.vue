<template>
    <div>
        <el-form ref="formRef" :model="form" :inline="inline">
            <formItem
                v-for="item in items"
                :key="item.name"
                v-model="form[item.name]"
                :item="item"
            />
            <el-form-item>
                <!-- <slot name="btns"></slot> -->
                <el-button @click="validate">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import formItem from "./formItem";
export default {
    name: "cForm",
    data() {
        const form = {};
        this.items?.map(v => {
            form[v.name] = "";
        });
        return { form };
    },
    props: {
        inline: {
            default: false
        },
        items: {
            type: Array,
            default: () => []
        }
    },
    components: {
        formItem
    },
    methods: {
        log() {
            console.log(this.form);
        },
        async validate() {
            console.log(this.$refs.formRef.validate());
        },
        validateField() {},
        resetFields() {},
        clearValidate() {}
    }
};
</script>

<style scoped lang="less">
</style>