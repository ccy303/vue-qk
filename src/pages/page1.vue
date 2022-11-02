<template>
    <div>
        <cForm ref="form" :items="items">
            <template v-slot:btns>
                <el-button @click="submit">提交</el-button>
                <el-button @click="() => validateField('name1')">校验</el-button>
                <el-button @click="resetFields">重置</el-button>
            </template>
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
                    rules: [{ required: true, message: "文本输入1" }],
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
                },
                [
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name32",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name31",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name33",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    }
                ]
            ]
        };
    },
    methods: {
        async submit() {
            const res = await this.$refs.form.validate();
            console.log(res);
        },
        validateField(names, callback) {
            this.$refs.form.validateField(names, callback);
        },
        resetFields() {
            this.$refs.form.resetFields();
        }
    }
};
</script>

<style scoped lang="less">
</style>