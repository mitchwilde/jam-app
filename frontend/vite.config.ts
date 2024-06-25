import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from "vite-plugin-svgr";

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '/',
    plugins: [svgr(), react(), viteTsconfigPaths()],
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        //port: 3000,
        proxy: {
          '/api': {
            target: 'http://localhost:5001',
            changeOrigin: true
          },
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        reporters: ['verbose'],
        coverage: {
          reporter: ['text', 'json', 'html'],
          include: ['src/**/*'],
          exclude: [],
        }
      },
})