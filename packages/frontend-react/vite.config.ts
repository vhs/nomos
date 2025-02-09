import fs from 'fs'
import path from 'path'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths(), TanStackRouterVite(), react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'charts': ['chart.js', 'react-chartjs-2'],
                    'crypto-js': ['crypto-js'],
                    'moment': ['moment'],
                    'react': ['react', 'react-dom'],
                    'heroicons': ['@heroicons/react'],
                    'react-spinners': ['react-spinners'],
                    'react-toastify': ['react-toastify'],
                    'swr': ['swr'],
                    'tanstack': ['@tanstack/react-router'],
                    'zod': ['zod']
                }
            }
        }
    },
    server: {
        https: {
            ca: fs.readFileSync(path.resolve(__dirname, 'certs/ca.crt')),
            key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.key')),
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.crt'))
        },

        proxy: {
            '/services': {
                target: 'https://membership.devtest.vanhack.ca',
                changeOrigin: true,
                secure: false,
                ws: true,
                xfwd: true
            },
            '/storybook': {
                target: 'http://localhost:6006',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/storybook/, ''),
                secure: false,
                ws: true,
                xfwd: true
            }
        }
    }
})
