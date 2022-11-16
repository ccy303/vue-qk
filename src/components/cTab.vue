<script>
export default {
    props: {
        tabProps: {
            type: Object,
            default: () => ({})
        },
        tabs: {
            type: [Array, Object],
            default: () => []
        },
        tab2Url: {
            type: Boolean,
            default: true
        }
    },
    render(createElement) {
        const { $getDataType, tabProps, tabs, $scopedSlots } = this;
        console.log(this);
        console.log(tabs);
        console.log($scopedSlots);
        return createElement(
            "el-tabs",
            {
                props: { ...tabProps }
            },
            [
                (tabs || []).map(tab => {
                    return $getDataType(tab) == "[object String]"
                        ? createElement("el-tab-pane", {
                              props: {
                                  label: tab
                              },
                              scopedSlots: {
                                  default: function (props) {
                                      return $scopedSlots[tab]?.(props);
                                  }
                              }
                          })
                        : 1;
                })
            ]
        );
    }
};
</script>

<style>
</style>