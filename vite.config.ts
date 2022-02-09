import { defineConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'

const root = join(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), tsconfigPaths({ root: __dirname })],
    root,
    resolve: {
        alias: {
            '~': root,
            '@': root,
        },
    },
    optimizeDeps: {
        exclude: ['simple-peer'],
    },
})
