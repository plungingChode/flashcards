import { sveltekit } from '@sveltejs/kit/vite';
import { multicssclass } from 'svelte-multicssclass';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [multicssclass({ sep: ";" }), sveltekit()],
	server: {
		port: 3000
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
