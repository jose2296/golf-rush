import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@svgs': path.resolve(__dirname, './src/assets/svgs/'),
            '@modules': path.resolve(__dirname, './src/modules/'),
            '@shared': path.resolve(__dirname, './src/shared/'),
        }
    }
});
