<script>
    import cForm from "./cForm";
    import qs from "qs";
    export default {
        components: { cForm },
        name: "cTable",
        data() {
            const { pageSize, currentPage } = this.$route.query;
            return {
                data: [],
                dataTotal: 0,
                localLoading: false,
                localPage: {
                    pageSize: Number(pageSize) || 10,
                    currentPage: Number(currentPage) || 1
                }
            };
        },
        props: {
            columns: {
                type: Array,
                default: () => []
            },
            loading: {
                type: Boolean,
                default: false
            },
            tableConfig: {
                type: [Object, null],
                default: () => ({})
            },
            pageConfig: {
                type: [Object, null],
                default: () => ({})
            },
            requestFun: {
                type: [Function, null],
                default: null
            },
            showIndex: {
                type: Boolean,
                default: true
            },
            searchConfig: {
                type: [Object, Boolean, null],
                default: false
            },
            search2Url: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            const { pageSize, currentPage, ...other } = this.$route.query;
            this.$refs.form.setFields(qs.parse(other));
            this.getData();
        },
        methods: {
            // pageSize 改变回调
            pageSizeChg(e) {
                this.localPage = { ...this.localPage, pageSize: e };
                // this.getData({ ...this.localPage, pageSize: e });
            },
            // current 改变回调
            currentPageChg(e) {
                this.localPage = { ...this.localPage, currentPage: e || 1 };
                // this.getData({ ...this.localPage, currentPage: e || 1 });
            },
            // 获取数据
            async getData(params = {}) {
                const { requestFun } = this;
                if (!requestFun) return;
                try {
                    this.localLoading = true;
                    const _params = await this.formatParams(params);
                    const res = await requestFun(_params);
                    this.formatIndex(res.data);
                    this.dataTotal = res.total;
                    this.queryToUrl(_params);
                    this.localLoading = false;
                } catch (err) {
                    this.localLoading = false;
                    Promise.reject(err);
                }
            },
            // 请求参数写入url
            queryToUrl(params) {
                const { $route, $router, search2Url } = this;
                // 参数回填路由
                if (
                    $route.fullPath !=
                        $route.path + qs.stringify(params, { addQueryPrefix: true }) &&
                    search2Url
                ) {
                    setTimeout(() => {
                        $router.replace(
                            $route.path +
                                qs.stringify(params, {
                                    arrayFormat: "indices",
                                    addQueryPrefix: true
                                })
                        );
                    });
                }
            },
            // 展示序号
            formatIndex(data) {
                const { showIndex } = this;
                const { currentPage, pageSize } = this.localPage;
                this.data = showIndex
                    ? data.map((v, i) => {
                          return {
                              _index: (currentPage - 1) * pageSize + i + 1,
                              ...v
                          };
                      })
                    : data;
            },
            // 格式化请求参数
            async formatParams(params) {
                const { currentPage, pageSize } = this.localPage;
                const formVals = await this.$refs.form.validate();
                return { ...formVals, currentPage, pageSize, ...params };
            },
            // 格式化搜索表单
            formatSearchItem(data) {
                const self = this;
                const col = data.length % 3; // 总的筛选数量 余 3

                const res = [];
                for (let i = 0, len = Math.ceil(data.length / 4); i < len; i++) {
                    res.push(
                        i == len - 1
                            ? [
                                  ...data.slice(i * 4, i * 4 + 4),
                                  {
                                      type: "render",
                                      colSpan: 24 - col * 8,
                                      //   colSpan: 24,
                                      render: function (h) {
                                          return h(
                                              "div",
                                              {
                                                  style: { textAlign: "right" }
                                              },
                                              [
                                                  h("el-button", {
                                                      domProps: { innerHTML: "搜索" },
                                                      props: { type: "primary" },
                                                      on: {
                                                          click: function () {
                                                              self.localPage = {
                                                                  currentPage: 1,
                                                                  pageSize: 10
                                                              };
                                                          }
                                                      }
                                                  }),
                                                  h("el-button", {
                                                      domProps: { innerHTML: "重置" },
                                                      on: {
                                                          click: function () {
                                                              self.$refs.form.resetFields();
                                                          }
                                                      }
                                                  })
                                              ]
                                          );
                                      }
                                  }
                              ]
                            : [...data.slice(i * 4, i * 4 + 4)]
                    );
                }
                return res;
            },
            // 重新求情数据
            refresh(arg) {
                this.$refs.form.resetFields();
                this.localPage = {
                    currentPage: arg.currentPage || 1,
                    pageSize: arg.pageSize || 10
                };
                this.getData({ currentPage: 1, pageSize: 10, ...arg });
            }
        },
        watch: {
            async localPage(n, o) {
                this.getData({ ...n });
            }
        },
        render(createElement) {
            const {
                loading,
                localLoading,
                tableConfig,
                data,
                columns,
                showIndex,
                localPage,
                pageConfig,
                dataTotal,
                currentPageChg,
                pageSizeChg,
                $scopedSlots,
                $getDataType,
                formatSearchItem,
                searchConfig
            } = this;
            const { items, labelWidth } = searchConfig;
            return createElement(
                "div",
                {
                    style: {
                        marginTop: "24px"
                    }
                },
                [
                    // searchform
                    createElement(
                        "cForm",
                        {
                            ref: "form",
                            props: { items: formatSearchItem(items), "label-width": labelWidth }
                        },
                        []
                    ),
                    // table
                    createElement(
                        "el-table",
                        {
                            props: {
                                size: "mini",
                                stripe: true,
                                border: false,
                                headerCellStyle: {
                                    background: "rgba(0,0,0,0.04)",
                                    color: "rgba(0, 0, 0, 0.65)"
                                },
                                ...tableConfig,
                                data
                            },
                            directives: [
                                {
                                    name: "loading",
                                    value: loading || localLoading || false
                                }
                            ]
                        },
                        [
                            (showIndex
                                ? [{ label: "序号", prop: "_index", width: "60px" }, ...columns]
                                : columns
                            ).map(({ render: _render, ...other }) => {
                                return createElement(
                                    "el-table-column",
                                    {
                                        props: {
                                            align: "center",
                                            ...other
                                        },
                                        scopedSlots: {
                                            default: function (props) {
                                                return _render &&
                                                    $getDataType(_render) == "[object Function]"
                                                    ? _render(
                                                          props.row[other.prop],
                                                          props.row,
                                                          props.$index,
                                                          createElement
                                                      )
                                                    : props.row[other.prop];
                                            }
                                        }
                                    },
                                    []
                                );
                            }),
                            // 操作列
                            $scopedSlots.action &&
                                createElement("el-table-column", {
                                    props: {
                                        align: "center",
                                        label: "操作",
                                        width: "200px"
                                    },
                                    scopedSlots: {
                                        default: function (props) {
                                            return createElement("span", {}, [
                                                $scopedSlots.action(props)
                                            ]);
                                        }
                                    }
                                })
                        ]
                    ),
                    // 分页器
                    createElement(
                        "div",
                        {
                            attrs: {
                                class: "c-page"
                            }
                        },
                        [
                            createElement(
                                "el-pagination",
                                {
                                    props: {
                                        background: false,
                                        layout: "total, sizes, prev, pager, next, jumper",
                                        "page-sizes": [10, 20, 30, 40, 50, 100],
                                        "prev-text": "上一页",
                                        "next-text": "下一页",
                                        "hide-on-single-page": false,
                                        "page-size": Number(localPage.pageSize),
                                        "current-page": Number(localPage.currentPage),
                                        ...pageConfig,
                                        total: dataTotal
                                    },
                                    on: {
                                        "current-change": currentPageChg,
                                        "size-change": pageSizeChg
                                    }
                                },
                                []
                            )
                        ]
                    )
                ]
            );
        }
    };
</script>

<style lang="less" scoped>
    .c-page {
        text-align: right;
        margin-top: 20px;
        padding-right: 10px;
    }
    /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
        background: rgba(0, 0, 0, 0.02);
    }
</style>
    