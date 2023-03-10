import adapter from '@sveltejs/adapter-static' // This was changed from adapter-auto
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib',
			$components: "src/lib/components",
			$models: "src/lib/models",
			$store: "src/lib/store",
			$icons: "src/lib/icons",
			$services: "src/lib/services",
			$classes: "src/lib/classes"
		}
	}
};

export default config;
