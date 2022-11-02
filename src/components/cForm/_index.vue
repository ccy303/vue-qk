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
        }
    },
    render(createElement) {
        const { $slots, items, form, labelWidth, $getDataType } = this;
        return createElement(
            "el-form",
            {
                ref: "formRef",
                props: {
                    model: form,
                    "label-width": labelWidth
                }
            },
            [
                items?.map(item => {
                    const type = $getDataType(item);
                    const renderItem = function (_item) {
                        return createElement(
                            "formItem",
                            {
                                props: {
                                    item: _item,
                                    value: form[_item.name]
                                }
                            },
                            []
                        );
                    };
                    if (type == "[object Object]") {
                        return renderItem(item);
                    } else {
                        return createElement("el-row", { props: { gutter: 20 } }, [
                            item.map(v => {
                                return createElement(
                                    "el-col",
                                    { props: { span: Math.floor(24 / item.length) } },
                                    [renderItem(v)]
                                );
                            })
                        ]);
                    }
                }),
                createElement(
                    "div",
                    {
                        attrs: {
                            class: "btn-group"
                        }
                    },
                    $slots.btns
                )
            ]
        );
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