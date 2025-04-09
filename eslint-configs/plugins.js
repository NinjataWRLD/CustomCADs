import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import tanstackRouterPlugin from '@tanstack/eslint-plugin-router';
import vitestPlugin from '@vitest/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import i18nextPlugin from 'eslint-plugin-i18next';

export const plugins = {
	'react-hooks': reactHooksPlugin,
	prettier: prettierPlugin,
	vitest: vitestPlugin,
	i18next: i18nextPlugin,
	'@typescript-eslint': tsPlugin,
	'@tanstack/query': tanstackQueryPlugin,
	'@tanstack/router': tanstackRouterPlugin,
};
