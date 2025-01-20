import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const env = {
  browser: true,
  node: true,
  es2022: true,
};

// To check what the specific rule does, visit https://eslint.org/docs/latest/rules/<rule-name>
const possibleErrors = {
  'no-const-assign': 'error',
  'no-dupe-args': 'error',
  'valid-typeof': 'error',
  'no-new-native-nonconstructor': 'error',
  'no-obj-calls': 'error',
  'array-callback-return': 'warn',
  'for-direction': 'warn',
  'getter-return': 'warn',
  'no-constructor-return': 'warn',
  'no-debugger': 'warn',
  'no-dupe-else-if': 'warn',
  'no-dupe-keys': 'warn',
  'no-dupe-case': 'warn',
  'no-dupe-imports': 'warn',
  'no-ex-assign': 'warn',
  'no-import-assign': 'warn',
  'no-loss-of-precision': 'warn',
  'no-promise-executor-return': 'warn',
  'no-self-assign': 'warn',
  'no-self-compare': 'warn',
  'no-setter-return': 'warn',
  'no-sparse-arrays': 'warn',
  'no-template-curly-in-string': 'warn',
  'no-this-before-super': 'warn',
  'no-unreachable': 'warn',
  'no-useless-assignment': 'warn',
  'use-isnan': 'warn',
}, suggestions = {
  'default-param-last': 'error',
  'no-throw-literal': 'error',
  'prefer-const': 'error',
  'func-style': ['warn', 'expression'],
  'default-case': 'warn',
  'default-case-last': 'warn',
  'eqeqeq': ['warn', 'smart'],
  'func-names': ['warn', 'as-needed'],
  'max-depth': ['warn', { 'max': 4 }],
  'max-lines': ['warn', { 'max': 200 }],
  'no-console': 'warn',
  'no-else-return': 'warn',
  'no-eq-null': 'warn',
  'no-case-declarations': 'warn',
  'no-new': 'warn',
  'no-new-wrappers': 'warn',
  'no-return-assign': 'warn',
  'no-undef-init': 'warn',
  'no-unneeded-ternary': 'warn',
  'no-useless-return': 'warn',
  'no-var': 'warn',
  'prefer-template': 'warn',
  'yoda': 'warn',
  'prefer-arrow-callback': 'warn',
  'prefer-promise-reject-errors': 'warn',
  'prefer-exponentiation-operator': 'warn',
  "prefer-destructuring": ['error', {
    'VariableDeclarator': { 'array': true, 'object': true },
    'AssignmentExpression': { 'array': true, 'object': true },
  }],
};

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { env, rules: { ...possibleErrors, ...suggestions } }
];
