import { languageOptions } from './language-options.js';
import { plugins } from './plugins.js';
import rules, { javascriptRules } from './rules.js';

export const getEslintConfig = (__dirname) => [
	{
		ignores: ['**/dist/**', '**/node_modules/**'],
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			...languageOptions,
			parserOptions: {
				project: './tsconfig.app.json',
				tsconfigRootDir: __dirname,
			},
		},
		plugins,
		rules,
	},
	{
		files: ['vite.config.ts'],
		languageOptions: {
			...languageOptions,
			parserOptions: {
				project: './tsconfig.node.json',
				tsconfigRootDir: __dirname,
			},
		},
		plugins,
		rules,
	},
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions,
		plugins,
		rules: javascriptRules,
	},
];
