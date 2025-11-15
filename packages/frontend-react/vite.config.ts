/// <reference path="./src/vite-env.d.ts" />

import fs from 'fs'
import path from 'path'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const defaultFrontendHost = 'membership.devtest.vanhack.ca'

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
    const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

    const config: UserConfig = {
        plugins: [tsconfigPaths(), TanStackRouterVite({ autoCodeSplitting: true }), react()],
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
        server:
            mode === 'production'
                ? undefined
                : {
                      host: loadedEnv.NOMOS_FRONTEND_HOST ?? defaultFrontendHost,
                      port: mode === 'production' ? undefined : 5173,
                      hmr: {
                          clientPort: 5173,
                          host: loadedEnv.NOMOS_FRONTEND_HOST ?? defaultFrontendHost
                      },

                      https: {
                          ca: fs.readFileSync(
                              path.resolve(__dirname, loadedEnv.NOMOS_FRONTEND_CA_FILE ?? 'certs/ca.crt')
                          ),
                          key: fs.readFileSync(
                              path.resolve(__dirname, loadedEnv.NOMOS_FRONTEND_KEY_FILE ?? 'certs/localhost.key')
                          ),
                          cert: fs.readFileSync(
                              path.resolve(__dirname, loadedEnv.NOMOS_FRONTEND_CRT_FILE ?? 'certs/localhost.crt')
                          )
                      },

                      proxy: {
                          '/services': {
                              target: loadedEnv.NOMOS_FRONTEND_BACKEND_URL ?? 'https://membership.devtest.vanhack.ca',
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
                      },
                      watch: { usePolling: true }
                  }
    }

    return config
})
