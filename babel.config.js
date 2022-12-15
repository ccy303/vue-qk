module.exports = function (api) {
    api.cache(false);
    const presets = [
        [
            "@babel/preset-env",
            {
                targets: { ie: 11 },
                useBuiltIns: "usage",
                corejs: { version: 3.8, proposals: true }
            }
        ]
    ];
    const plugins = [];
    const ignore = [
        filename => {
            return (
                /node_modules/.test(filename) ||
                !/.*(node_modules).*(copy-anything|is-what|axios).*(\.(m)?js|\.vue)$/.test(filename)
            );
        }
    ];
    return {
        presets,
        plugins,
        ignore,
        sourceType: "unambiguous"
    };
};
