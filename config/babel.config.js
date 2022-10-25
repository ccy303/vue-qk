module.exports = function (api) {
	api.cache(true);
	const presets = [
		[
			"@babel/preset-env",
			{
				targets: { ie: 11 },
				useBuiltIns: "usage",
				corejs: { version: 3.8, proposals: true },
			},
		],
	];
	const plugins = [];
	const ignore = [
		(filename) => {
			return !/^(((?!node_modules).)*(js|jsx|ts|tsx))|(.*(node_modules).*(react.*|copy-anything|is-what).*(\.js)$)/.test(
				filename
			);
		},
	];
	return {
		presets,
		plugins,
		ignore,
		sourceType: "unambiguous",
	};
};