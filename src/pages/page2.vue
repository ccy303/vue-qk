<template>
    <cTable :columns="columns" :requestFun="getData" :tablsConfig="{}" :searchConfig="searchConfig">
        <template v-slot:action="scope">
            <el-button @click="click(scope)">处理按钮</el-button>
        </template>
    </cTable>
</template>

<script>
import cTable from "@src/components/cTable";
export default {
    components: { cTable },
    data() {
        return {
            columns: [
                {
                    label: "标题1",
                    prop: "a",
                    render: (text, row, index, h) => {
                        return text * 10000;
                    }
                },
                {
                    label: "标题2",
                    prop: "aa"
                },
                {
                    label: "标题3",
                    prop: "aaa"
                }
            ],
            searchConfig: {
                items: [
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name1",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name2",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name3",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name4",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name5",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name6",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name7",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name8",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    },
                    {
                        label: "一行N个",
                        type: "select",
                        name: "name9",
                        options: [{ label: "选项", value: "选项" }],
                        props: {
                            disabled: false
                        }
                    }
                ]
            }
        };
    },
    methods: {
        getData(arg) {
            return Promise.resolve({
                data: [
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() },
                    { a: Math.random(), aa: Math.random(), aaa: Math.random() }
                ],
                total: 100
            });
        },
        click(...arg) {
            console.log(arg);
        }
    }
};
</script>

<style scoped lang="less">
</style>