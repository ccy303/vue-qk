
<script>
import cform from "./cForm";
export default {
    components: { cform },
    name: "cTable",
    data() {
        return {
            data: [],
            dataTotal: 0,
            localPage: {
                pageSize: 10,
                currentPage: 1
            }
        };
    },
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        tabConfig: {
            type: Object || null,
            default: () => {}
        },
        pageConfig: {
            type: Object || null,
            default: () => {}
        },
        request: {
            type: Function || null,
            default: null
        },
        showIndex: {
            type: Boolean,
            default: true
        },
        searchConfig: {
            type: Object || mull,
            default: {}
        }
    },
    mounted() {
        this.request &&
            (async () => {
                const res = await this.request();
                this.data = this.showIndex
                    ? res.data.map((v, i) => ({ _index: i + 1, ...v }))
                    : res.data;
                this.dataTotal = res.total;
            })();
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
        }
    },
    watch: {
        localPage(n, o) {
            console.log(n, o);
        }
    },
    render(createElement) {
        return createElement("div", {}, [
            createElement(
                "el-table",
                {
                    props: {
                        size: "small",
                        stripe: true,
                        border: true,
                        ...this.tabConfig,
                        data: this.data
                    }
                },
                [
                    (this.showIndex
                        ? [{ label: "序号", prop: "_index" }, ...this.columns]
                        : this.columns
                    ).map(({ ...other }) => {
                        return createElement(
                            "el-table-column",
                            {
                                props: {
                                    align: "center",
                                    ...other
                                }
                            },
                            []
                        );
                    })
                ]
            ),
            // 分页器
            createElement(
                "div",
                {
                    attrs: {
                        class: "c--page"
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
                                "page-size": Number(this.localPage.pageSize),
                                "current-page": Number(this.localPage.currentPage),
                                ...this.pageConfig,
                                total: this.dataTotal
                            },
                            on: {
                                "current-change": this.currentPageChg,
                                "size-change": this.pageSizeChg
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
.c--page {
    text-align: right;
    margin-top: 20px;
    padding-right: 10px;
}
</style>
    