<template></template>
<script>
    export default {
        created() {
            window.location.replace(`${VUE_ROUTE_BASE_PATH}api/oauth2/logout`);
        }
    };
</script>

<style></style>
