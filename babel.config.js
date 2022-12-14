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
            console.log(
                filename,
                !/^(((?!node_modules).)*(js|jsx|ts|tsx|vue))|(.*(node_modules).*(copy-anything|is-what|axios).*(\.(m)?js|\.vue)$)/.test(
                    filename
                )
            );
            return !/^(((?!node_modules).)*(js|jsx|ts|tsx|vue))|(.*(node_modules).*(copy-anything|is-what|axios).*(\.(m)?js|\.vue)$)/.test(
                filename
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
