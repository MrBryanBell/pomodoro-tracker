module.exports = {
	root: true,
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		extraFileExtensions: ['.svelte'],
	},
	plugins: ['svelte', '@typescript-eslint', 'import', 'simple-import-sort', 'unused-imports'],
	ignorePatterns: ['*.cjs'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:svelte/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		"eslint-config-codely/typescript",
	],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			rules: {
				'no-inner-declarations': 'off'
			}
		},
	],
	settings: {},
	rules: {
		'no-console': 'off',
		semi: ['warn', 'always'],
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'import/no-unresolved': 'off',
		'prefer-const': 'error',
		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': 'error',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
		// 'key-spacing': [
		// 	'error', 
		// 	{ 
		// 		beforeColon: true, 
		// 		align: 'colon',
		// 		mode: "strict"
		// 	}
		// ],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
	},
};