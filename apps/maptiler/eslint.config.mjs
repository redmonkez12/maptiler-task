import config from "@maptiler/eslint-config-eslint";

export default [
	...config,
	{
		files: ["src/**/*.{ts,tsx}"],
	},
];
