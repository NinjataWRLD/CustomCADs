import parser from '@typescript-eslint/parser';

export const languageOptions = {
	parser,
	globals: {
		browser: true,
		node: true,
	},
	ecmaVersion: 2022,
};
