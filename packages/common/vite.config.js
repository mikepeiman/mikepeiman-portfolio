import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [svelte()],
    build: {
        lib: {
            entry: 'index.js',
            name: 'Common',
            formats: ['es'],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ['svelte', '@sveltejs/kit', '$app/stores', '$app/navigation'],
            output: {
                globals: {
                    svelte: 'svelte'
                }
            }
        }
    }
});