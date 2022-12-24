<script>
    export default {
        name: "formItem",
        props: {
            item: {
                type: Object,
                default: () => ({})
            },
            value: {
                default: () => {
                    return "";
                }
            }
        },
        render(createElement) {
            const self = this;
            let { item, value } = self;
            const { name, type, label, props, options, isDetail, isHideBtn, ...arg } = item;
            const { placeholder } = props || {};

            if (type == "render") {
                return createElement(
                    "el-form-item",
                    {
                        props: { label, prop: name, ...arg }
                    },
                    [item.render(createElement)]
                );
            }
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
            if (type == "daterange") {
                return createElement(
                    "el-form-item",
                    {
                        props: { label, prop: name, ...arg }
                    },
                    [
                        createElement("el-date-picker", {
                            attrs: {
                                "start-placeholder": "开始日期",
                                "end-placeholder": "结束日期",
                                type: "daterange"
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
                const { change, removeTag } = props || {};
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
                                style: { width: "100%" },
                                props: {
                                    ...props,
                                    value: value
                                },
                                on: {
                                    input: function (event) {
                                        self.$emit("input", event);
                                    },
                                    change: event => {
                                        change && change(event);
                                    },
                                    "remove-tag": function (event) {
                                        removeTag && removeTag(event);
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
            if (type == "checkbox") {
                const { render, canEdit } = item;
                return createElement(
                    "el-form-item",
                    {
                        props: { label, prop: name, ...arg }
                    },
                    [
                        createElement(
                            "el-checkbox-group",
                            {
                                attrs: {
                                    placeholder: placeholder || `请选择${label}`,
                                    type
                                },
                                style: { width: "100%" },
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
                            [
                                (options || []).map(v => {
                                    if (canEdit) {
                                        return createElement(
                                            "div",
                                            {
                                                on: {}
                                            },
                                            [
                                                createElement(
                                                    "el-checkbox",
                                                    {
                                                        props: {
                                                            label: v.value,
                                                            key: v.value
                                                        }
                                                    },
                                                    [v.label]
                                                )
                                            ]
                                        );
                                    }

                                    return createElement(
                                        "el-checkbox",
                                        {
                                            props: {
                                                label: v.value,
                                                key: v.value
                                            }
                                        },
                                        [v.label]
                                    );
                                }),
                                render ? render(createElement) : ""
                            ]
                        ),
                        createElement(
                            "div",
                            {
                                style: {
                                    display: "block",
                                    width: "100%",
                                    fontSize: "12px",
                                    color: "#606266"
                                }
                            },
                            [props.tip]
                        )
                    ]
                );
            }

            if (type == "radio") {
                return createElement(
                    "el-form-item",
                    {
                        props: { label, prop: name, ...arg }
                    },
                    [
                        createElement(
                            "el-radio-group",
                            {
                                attrs: {
                                    placeholder: placeholder || `请选择${label}`,
                                    type
                                },
                                style: { width: "100%" },
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
                                return createElement(
                                    "el-radio",
                                    {
                                        props: {
                                            label: v.value,
                                            key: v.value
                                        }
                                    },
                                    [v.label]
                                );
                            })
                        )
                    ]
                );
            }
            if (type == "upload") {
                const { onSuccess } = props || {};
                return createElement(
                    "el-form-item",
                    {
                        props: { label, prop: name, ...arg }
                    },
                    [
                        createElement(
                            "el-upload",
                            {
                                props: {
                                    action: "",
                                    ...props,
                                    fileList: value,
                                    httpRequest: self.uploadFun,
                                    onSuccess: (res, file, fileList) => {
                                        onSuccess && onSuccess(res, file, fileList);
                                        self.onSuccess(res, file, fileList);
                                    }
                                },
                                scopedSlots: props["list-type"] == "picture-card" && {
                                    file: files => {
                                        const { file } = files;
                                        return createElement(
                                            "div",
                                            {
                                                style: { width: "100%", height: "100%" }
                                            },
                                            [
                                                createElement("img", {
                                                    class: "el-upload-list__item-thumbnail",
                                                    attrs: { src: file.url }
                                                }),
                                                createElement(
                                                    "span",
                                                    { class: "el-upload-list__item-actions" },
                                                    [
                                                        createElement(
                                                            `span`,
                                                            {
                                                                class: "el-upload-list__item-preview",
                                                                domProps: {
                                                                    innerHTML: `<a href="${file.url}" target="_block" style="color:#fff"><i class="el-icon-view"></i></a>`
                                                                }
                                                            },
                                                            []
                                                        ),
                                                        createElement(
                                                            "span",
                                                            {
                                                                class: "el-upload-list__item-download",
                                                                on: {
                                                                    click() {
                                                                        let a =
                                                                            document.createElement(
                                                                                "a"
                                                                            );
                                                                        let event = new MouseEvent(
                                                                            "click"
                                                                        );
                                                                        a.download = file.name;
                                                                        a.href = file.url;
                                                                        a.dispatchEvent(event);
                                                                    }
                                                                }
                                                            },
                                                            [
                                                                createElement("i", {
                                                                    class: "el-icon-download"
                                                                })
                                                            ]
                                                        ),
                                                        !props.disabled &&
                                                            createElement(
                                                                "span",
                                                                {
                                                                    class: "el-upload-list__item-preview",
                                                                    on: {
                                                                        click() {
                                                                            self.$emit(
                                                                                "input",
                                                                                value?.filter(
                                                                                    v =>
                                                                                        v.uid !=
                                                                                        file.uid
                                                                                )
                                                                            );
                                                                            props["on-remove"]?.(
                                                                                file,
                                                                                {
                                                                                    ...value
                                                                                }
                                                                            );
                                                                        }
                                                                    }
                                                                },
                                                                [
                                                                    createElement("i", {
                                                                        class: "el-icon-delete"
                                                                    })
                                                                ]
                                                            )
                                                    ]
                                                )
                                            ]
                                        );
                                    }
                                }
                            },
                            [
                                props["list-type"] == "picture-card"
                                    ? createElement("div", {}, [
                                          createElement("i", {
                                              class: {
                                                  "el-icon-plus": true,
                                                  "avatar-uploader-icon": true
                                              }
                                          })
                                      ])
                                    : isHideBtn
                                    ? createElement("div", {}, [])
                                    : createElement(
                                          "el-button",
                                          {
                                              attrs: {
                                                  type: "primary"
                                              },
                                              props: { size: "small" }
                                          },
                                          ["点击上传"]
                                      ),
                                !props.disabled &&
                                    createElement(
                                        "div",
                                        {
                                            class: {
                                                "el-upload__tip": true
                                            },
                                            slot: "tip"
                                        },
                                        [props.tip || "只能上传jpg/png文件，且不超过500kb"]
                                    )
                            ]
                        )
                    ]
                );
            }
            if (type == "ueditor") {
                return createElement(
                    "el-form-item",
                    {
                        props: { label, prop: name, ...arg }
                    },
                    [
                        isDetail
                            ? createElement("div", {
                                  domProps: {
                                      innerHTML: value
                                  },
                                  style: { marginTop: "-14px" }
                              })
                            : createElement("vue-ueditor-wrap", {
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
        },
        methods: {
            onSuccess(res, file, fileList) {
                this.$emit("input", fileList);
            },
            async uploadFun(res) {
                const { httpRequesFun } = this.item;
                const { file } = res;
                let loading = null;
                try {
                    loading = this.$loading({
                        lock: true,
                        text: "文件上传中...",
                        spinner: "el-icon-loading",
                        background: "rgba(0, 0, 0, 0.7)"
                    });
                    const { data } = await (httpRequesFun || this.$http.publics.uploadFile)?.(file);
                    loading.close();
                    if (data.code != "200") {
                        return Promise.reject(data);
                    }
                    return Promise.resolve(data);
                } catch (error) {
                    loading.close();
                    return Promise.reject(error);
                }
            }
        }
    };
</script>