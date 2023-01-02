import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { configDefaults, type UserConfig as VitestConfig } from 'vitest/config';

const config: UserConfig & { test: VitestConfig['test'] } = {
	plugins: [sveltekit()],
	clearScreen: false,
	server: { port: 5173, strictPort: true },
	envPrefix: ['VITE_', 'TAURI_'],
	define: { 'import.meta.vitest': 'undefined' },
	build: {
		target: ['es2021', 'chrome100', 'safari13'],
		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		sourcemap: !!process.env.TAURI_DEBUG
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		// in-source testing
		includeSource: ['src/**/*.{js,ts,svelte}'],
		// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
		setupFiles: ['./setupTest.ts'],
		// Exclude files in c8
		coverage: {
			exclude: ['setupTest.ts']
		},
		deps: {
			// Put Svelte component here, e.g., inline: [/svelte-multiselect/, /msw/]
			inline: []
		},
		// Exclude playwright tests folder
		exclude: [...configDefaults.exclude, 'tests']
	}
};

export default config;
