import BigNumber from "bignumber.js";
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
    },
    // 格式化金额
    $thousandBit(num) {
        if (num === undefined || num === null || num === "" || isNaN(Number(num))) {
            return "";
        }
        num = new BigNumber(num)?.toFixed(2);
        return String(num).replace(/\d+/, _n => {
            return _n.replace(/(\d)(?=(\d{3})+$)/g, $1 => {
                return `${$1},`;
            });
        });
    }
};
