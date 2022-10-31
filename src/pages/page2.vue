<template>
    <div>
        <cTable :columns="columns" :request="getData" :tabConfig="{}"> </cTable>
    </div>
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
                    prop: "a"
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
        }
    }
};
</script>

<style scoped lang="less">
</style>