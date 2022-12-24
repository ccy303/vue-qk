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
            },
            value: {
                type: Number,
                default: 0
            }
        },
        render(createElement) {
            const { $getDataType, tabProps, tabs, $scopedSlots } = this;
            var self = this;
            // console.log(this);
            // console.log(tabs);
            // console.log($scopedSlots);

            return createElement(
                "el-tabs",
                {
                    props: { ...tabProps, value: self.value },
                    on: {
                        "tab-click": function (event) {
                            self.$emit("tab-click", tabs[event.index]?.value);
                        }
                    }
                },
                [
                    (tabs || []).map(tab => {
                        return $getDataType(tab) == "[object Object]"
                            ? createElement("el-tab-pane", {
                                  props: {
                                      label: tab?.key
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

<style></style>
