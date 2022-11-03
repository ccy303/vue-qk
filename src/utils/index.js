export default {
    $getDataType(data) {
        return Object.prototype.toString.call(data);
    },
    $checkAuth(usrAuth, chkAuth) {
        const tp = this.$getDataType(chkAuth);
        if (tp == "[object Object]") {
            if (!chkAuth.auths.length) {
                return true;
            }
            const _array = [...usrAuth, ...chkAuth.auths];
            if (chkAuth.type == "|") {
                return Array.from(new Set(_array)).length < _array.length;
            }
            if (chkAuth.type == "&") {
                Array.from(new Set(_array)).length == usrAuth.length;
            }
            return false;
        } else if (tp == "[object Array]") {
            if (!chkAuth.length) {
                return true;
            }
            const _array = [...usrAuth, ...chkAuth];
            return Array.from(new Set(_array)).length < _array.length;
        } else {
            return false;
        }
    }
};
