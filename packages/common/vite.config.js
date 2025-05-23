import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [svelte()],
    build: {
        lib: {
            entry: 'src/index.js',
            name: 'common',
            fileName: 'index'
        },
        rollupOptions: {
            external: ['svelte', '@sveltejs/kit'],
            output: {
                globals: {
                    svelte: 'svelte'
                }
            }
        }
    }
});