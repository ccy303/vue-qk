<template>
    <cTab :tabs="tabs">
        <template v-slot:tab中文1>123</template>
        <template v-slot:tab中文2>124443</template>
    </cTab>
</template>

<script>
import cTab from "@src/components/cTab";
export default {
    data() {
        return {
            tabs: ["tab中文1", "tab中文2"]
        };
    },
    components: {
        cTab
    }
};
</script>

<style>
</style>