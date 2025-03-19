import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import tanstackRouterPlugin from '@tanstack/eslint-plugin-router';
import vitestPlugin from '@vitest/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const languageOptions = {
    globals: {
        browser: true,
        node: true,
    },
    ecmaVersion: 2022,
};

// To check what the specific rule does, visit https://eslint.org/docs/latest/rules/<rule-name>
const possibleErrors = {
    'no-const-assign': 'error', // Disallow reassigning const variables
    'no-dupe-args': 'error', // Disallow duplicate arguments in function definitions
    'valid-typeof': 'error', // Enforce comparing typeof expressions against valid strings
    'no-new-native-nonconstructor': 'error', // Disallow new operators with global non-constructor functions
    'no-obj-calls': 'error', // Disallow calling global object properties as functions
    'array-callback-return': 'warn', // Enforce return statements in callbacks of array methods
    'for-direction': 'warn', // Enforce for loop update clause moving the counter in the right direction
    'getter-return': 'warn', // Enforce return statements in getters
    'no-constructor-return': 'warn', // Disallow returning value from constructor
    'no-debugger': 'warn', // Disallow the use of debugger
    'no-dupe-else-if': 'warn', // Disallow duplicate conditions in if-else-if chains
    'no-dupe-keys': 'warn', // Disallow duplicate keys in object literals
    'no-duplicate-case': 'warn', // Disallow duplicate case labels
    'no-duplicate-imports': 'warn', // Disallow duplicate module imports
    'no-ex-assign': 'warn', // Disallow reassigning exceptions in catch clauses
    'no-import-assign': 'warn', // Disallow assigning to imported bindings
    'no-loss-of-precision': 'warn', // Disallow literal numbers that lose precision
    'no-promise-executor-return': 'warn', // Disallow returning values from Promise executor functions
    'no-self-assign': 'warn', // Disallow assignments where both sides are exactly the same
    'no-self-compare': 'warn', // Disallow comparisons where both sides are exactly the same
    'no-setter-return': 'warn', // Disallow returning values from setters
    'no-sparse-arrays': 'warn', // Disallow sparse arrays
    'no-template-curly-in-string': 'warn', // Disallow template literal placeholder syntax in regular strings
    'no-this-before-super': 'warn', // Disallow this/super before calling super() in constructors
    'no-unreachable': 'warn', // Disallow unreachable code after return, throw, continue, and break statements
    'no-useless-assignment': 'warn', // Disallow variable assignments when the value is not used
    'use-isnan': 'warn', // Require calls to isNaN() when checking for NaN
};

const suggestions = {
    'default-param-last': 'error', // Enforce default parameters to be last
    'no-throw-literal': 'error', // Disallow throwing literals as exceptions
    'prefer-const': 'error', // Require const declarations for variables that are never reassigned after declared
    'func-style': ['warn', 'expression'], // Enforce the consistent use of either function declarations or expressions assigned to variables
    'default-case': 'warn', // Require default cases in switch statements
    'default-case-last': 'warn', // Enforce default clauses in switch statements to be last
    eqeqeq: ['warn', 'smart'], // Require the use of === and !==
    'func-names': ['warn', 'as-needed'], // Require or disallow named function expressions
    'max-depth': ['warn', { max: 4 }], // Enforce a maximum depth that blocks can be nested
    'max-lines': ['warn', { max: 200 }], // Enforce a maximum number of lines per file
    'no-console': 'warn', // Disallow the use of console
    'no-else-return': 'warn', // Disallow else blocks after return statements in if statements
    'no-eq-null': 'warn', // Disallow null comparisons without type-checking operators
    'no-case-declarations': 'warn', // Disallow lexical declarations in case clauses
    'no-new': 'warn', // Disallow new operators outside of assignments or comparisons
    'no-new-wrappers': 'warn', // Disallow new operators with the String, Number, and Boolean objects
    'no-return-assign': 'warn', // Disallow assignment operators in return statements
    'no-undef-init': 'warn', // Disallow initializing variables to undefined
    'no-unneeded-ternary': 'warn', // Disallow ternary operators when simpler alternatives exist
    'no-useless-return': 'warn', // Disallow redundant return statements
    'no-var': 'warn', // Require let or const instead of var
    'prefer-template': 'warn', // Require template literals instead of string concatenation
    yoda: 'warn', // Require or disallow "Yoda" conditions
    'prefer-arrow-callback': 'warn', // Require using arrow functions for callbacks
    'prefer-promise-reject-errors': 'warn', // Require using Error objects as Promise rejection reasons
    'prefer-exponentiation-operator': 'warn', // Disallow the use of Math.pow in favor of the ** operator
    'prefer-destructuring': [
        'error',
        {
            VariableDeclarator: { array: true, object: true },
            AssignmentExpression: { array: true, object: true },
        },
    ], // Require destructuring from arrays and/or objects
};

const eslintConfig = [
    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:i18next/recommended',
    ),
    {
        languageOptions,
        plugins: {
            prettier: prettierPlugin,
            vitest: vitestPlugin,
            '@tanstack/query': tanstackQueryPlugin,
            '@tanstack/router': tanstackRouterPlugin,
        },
        rules: {
            ...possibleErrors,
            ...suggestions,
            'prettier/prettier': 'warn',
            '@tanstack/query/exhaustive-deps': 'warn',
            '@tanstack/query/stable-query-client': 'warn',
            '@tanstack/router/create-route-property-order': 'warn',
        },
    },
];

export default eslintConfig;
