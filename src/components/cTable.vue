
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
        this.$refs.form.setFields(other);
        this.getData();
    },
    methods: {
        pageSizeChg(e) {
            this.localPage = {
                ...this.localPage,
                pageSize: e
            };
        },
        currentPageChg(e) {
            this.localPage = {
                ...this.localPage,
                currentPage: e
            };
        },
        async getData(params = {}) {
            const { requestFun, showIndex, localPage, $route, $router, search2Url } = this;
            const { currentPage, pageSize } = localPage;
            if (!requestFun) return;
            const formVals = await this.$refs.form.validate();
            const _params = { ...formVals, currentPage, pageSize, ...params };
            const res = await requestFun(_params);
            this.data = showIndex
                ? res.data.map((v, i) => ({
                      _index: (currentPage - 1) * pageSize + i + 1,
                      ...v
                  }))
                : res.data;
            this.dataTotal = res.total;
            // 参数回填路由
            if (
                $route.fullPath != $route.path + qs.stringify(_params, { addQueryPrefix: true }) &&
                search2Url
            ) {
                setTimeout(() => {
                    $router.replace($route.path + qs.stringify(_params, { addQueryPrefix: true }));
                });
            }
        },
        // 格式化搜索表单
        formatSearchItem(data) {
            const self = this;
            const col = data.length % 4;
            const res = [];
            for (let i = 0, len = Math.ceil(data.length / 4); i < len; i++) {
                res.push(
                    i == len - 1
                        ? [
                              ...data.slice(i * 4, i * 4 + 4),
                              {
                                  type: "render",
                                  colSpan: 24 - col * 6,
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
                                                          self.getData();
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
        }
    },
    watch: {
        async localPage(n, o) {
            this.getData({ ...n });
        }
    },
    render(createElement) {
        const {
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
        const { items } = searchConfig;
        return createElement("div", {}, [
            // searchform
            createElement(
                "cForm",
                {
                    ref: "form",
                    props: { items: formatSearchItem(items) }
                },
                []
            ),
            // table
            createElement(
                "el-table",
                {
                    props: {
                        size: "small",
                        stripe: true,
                        border: true,
                        ...tableConfig,
                        data
                    }
                },
                [
                    (showIndex ? [{ label: "序号", prop: "_index" }, ...columns] : columns).map(
                        ({ render: _render, ...other }) => {
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
                        }
                    ),
                    // 操作列
                    $scopedSlots.action &&
                        createElement("el-table-column", {
                            props: {
                                align: "center",
                                label: "操作"
                            },
                            scopedSlots: {
                                default: function (props) {
                                    return createElement("span", {}, [$scopedSlots.action(props)]);
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
        ]);
    }
};
</script>

<style lang="less" scoped>
.c-page {
    text-align: right;
    margin-top: 20px;
    padding-right: 10px;
}
</style>
    