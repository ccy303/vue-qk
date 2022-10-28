<script>
export default {
    name: "formItem",
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        value: {
            default: ""
        }
    },
    render(createElement) {
        const self = this;
        const { item, value } = self;
        const { name, type, label, props, options, ...arg } = item;
        const { placeholder } = props;
        if (type == "text" || type == "textarea") {
            return createElement(
                "el-form-item",
                {
                    props: { label, prop: name, ...arg }
                },
                [
                    createElement("el-input", {
                        attrs: {
                            placeholder: placeholder || `请输入${label}`,
                            type
                        },
                        props: {
                            ...props,
                            value: value
                        },
                        on: {
                            input: function (event) {
                                self.$emit("input", event);
                            }
                        }
                    })
                ]
            );
        }
        if (type == "select") {
            return createElement(
                "el-form-item",
                {
                    props: { label, prop: name, ...arg }
                },
                [
                    createElement(
                        "el-select",
                        {
                            attrs: {
                                placeholder: placeholder || `请选择${label}`,
                                type
                            },
                            props: {
                                ...props,
                                value: value
                            },
                            on: {
                                input: function (event) {
                                    self.$emit("input", event);
                                }
                            }
                        },
                        (options || []).map(v => {
                            return createElement("el-option", {
                                props: {
                                    label: v.label,
                                    value: v.value
                                }
                            });
                        })
                    )
                ]
            );
        }
    }
};
</script>