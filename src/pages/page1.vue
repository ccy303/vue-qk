<template>
    <div>
        <cForm ref="form" :items="items" :inline="true">
            <div slot="btns">
                <el-button @click="submit">提交</el-button>
            </div>
        </cForm>
    </div>
</template>

<script>
import cForm from "@src/components/cForm";
export default {
    components: {
        cForm
    },
    data() {
        return {
            items: [
                {
                    label: "文本输入1",
                    type: "text",
                    name: "name1",
                    rules: [
                        { required: true, message: "文本输入1" },
                        { type: "number", message: "必须为数字值" }
                    ],
                    props: {
                        disabled: false,
                        "prefix-icon": "el-icon-platform-eleme"
                    }
                },
                {
                    label: "文本输入2",
                    type: "textarea",
                    name: "name2",
                    props: {
                        disabled: false
                    }
                },
                {
                    label: "下拉",
                    type: "select",
                    name: "name3",
                    options: [{ label: "选项", value: "选项" }],
                    props: {
                        disabled: false
                    }
                }
            ]
        };
    },
    mounted() {
        console.log(this.$refs);
    },
    methods: {
        async submit() {
            const res = await this.$refs.form.validate();
            console.log(res);
        }
    }
};
</script>

<style scoped lang="less">
</style>