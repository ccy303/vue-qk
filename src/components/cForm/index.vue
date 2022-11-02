<template>
    <el-form ref="formRef" :model="form" :label-width="labelWidth">
        <template v-for="(item, i) in items">
            <formItem
                v-if="$getDataType(item) == '[object Object]'"
                v-model="form[item.name]"
                :item="item"
                :key="`if-${item.name}`"
            />
            <el-row
                v-else-if="$getDataType(item) == '[object Array]'"
                :gutter="20"
                :key="`else-${i}`"
            >
                <el-col
                    v-for="col in initRowColSpan(item)"
                    :span="col.colSpan"
                    :key="`col-${col.name}`"
                >
                    <formItem v-model="form[col.name]" :item="col" />
                </el-col>
            </el-row>
        </template>
        <div class="btn-group">
            <slot name="btns"></slot>
        </div>
    </el-form>
</template>

<script>
import formItem from "./formItem";
export default {
    name: "cForm",
    data() {
        const form = this.formatForm(this.items);
        return { form };
    },
    props: {
        items: {
            type: Array,
            default: () => []
        },
        ["label-width"]: {
            type: String,
            default: "100px"
        }
    },
    components: {
        formItem
    },
    methods: {
        async validate() {
            await this.$refs.formRef.validate();
            return JSON.parse(JSON.stringify(this.form));
        },
        validateField(names, callback) {
            this.$refs.formRef.validateField(names, callback);
        },
        resetFields() {
            this.$refs.formRef.resetFields();
        },
        clearValidate() {
            this.$refs.formRef.clearValidate();
        },
        setFields(values = {}) {
            for (const key in values) {
                this.form[key] = values[key];
            }
        },
        formatForm(data = []) {
            let form = {};
            data.map(v => {
                if (this.$getDataType(v) == "[object Array]") {
                    form = {
                        ...form,
                        ...this.formatForm(v)
                    };
                } else {
                    v.name && (form[v.name] = undefined);
                }
            });
            return form;
        },
        initRowColSpan(data) {
            let span = 0,
                len = 0;
            data.map(v => {
                if (v.colSpan) {
                    span += v.colSpan;
                    len++;
                }
            });
            return data.map(v => {
                if (!v.colSpan) {
                    v.colSpan = Math.floor((24 - span) / (data.length - len));
                }
                return v;
            });
        }
    }
};
</script>
<style scoped lang="less">
.btn-group {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>