<template>
    <cTable :columns="columns" :request="getData" :tablsConfig="{}">
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
            ]
        };
    },
    methods: {
        getData(e) {
            console.log(e);
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