import { mergeConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import type { StorybookConfig } from '@storybook/react-vite'

const includeDirs = [
    '01-atoms',
    '02-molecules',
    '03-particles',
    '04-composites',
    '05-materials',
    '06-layouts',
    '07-pages',
    '08-app',
    '09-providers'
]

const stories = [
    '../src/**/*.mdx',
    ...includeDirs.map((includeDir) => `../src/components/${includeDir}/**/*.stories.@(js|jsx|mjs|ts|tsx)`)
]

const config: StorybookConfig = {
    stories,

    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],

    framework: {
        name: '@storybook/react-vite',
        options: {}
    },

    docs: {},

    core: {
        disableTelemetry: true
    },

    staticDirs: ['../public'],

    typescript: {
        reactDocgen: 'react-docgen-typescript'
    },

    viteFinal(config) {
        return mergeConfig(config, {
            plugins: [tsconfigPaths()]
        })
    }
}

export default config
