import pluginRouter from '@tanstack/eslint-plugin-router'
import cjs from '@tyisi/config-eslint/cjs'
import js from '@tyisi/config-eslint/js'
import mjs from '@tyisi/config-eslint/mjs'
import ts from '@tyisi/config-eslint/ts'
import tsx from '@tyisi/config-eslint/tsx'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import pluginStorybook from 'eslint-plugin-storybook'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

// import jestPlugin from 'eslint-plugin-jest'

// import { inspect } from 'node:util'

function hoistConfig(config, withReact) {
    withReact ??= false

    config[0].languageOptions.parserOptions = {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.eslint.json', './tsconfig.node.json'],
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: {
            jsx: withReact
        }
    }

    if (withReact) config[0].languageOptions.globals = { ...config[0].languageOptions.globals, ...globals.browser }

    config[0].languageOptions.globals.describe = false
    config[0].languageOptions.globals.it = false

    config[0].languageOptions.globals.Highcharts = false

    config[0].languageOptions.globals.top = false

    if (withReact) config[0].plugins['react-hooks'] = pluginReactHooks
    if (withReact) config[0].plugins['react-refresh'] = pluginReactRefresh
    if (withReact) config[0].plugins['@tanstack/router'] = pluginRouter

    if (withReact) config[0].rules['react-refresh/only-export-components'] = ['warn', { allowConstantExport: true }]

    if (withReact)
        // @ts-ignore
        Object.entries(pluginRouter.configs['flat/recommended'][0].rules).forEach(([k, v]) => (config[0].rules[k] = v))
    if (withReact)
        Object.entries(pluginReactHooks.configs.recommended.rules).forEach(([k, v]) => (config[0].rules[k] = v))
    if (withReact)
        Object.entries(pluginReactHooks.configs.recommended.rules).forEach(([k, v]) => (config[0].rules[k] = v))

    delete config[0].rules['@typescript-eslint/no-unnecessary-condition']

    if (withReact) {
        config[0].plugins['storybook'] = pluginStorybook

        pluginStorybook.configs['flat/recommended'].forEach((storybookConfigSlice) => {
            const newConfigSlice = {}

            if (storybookConfigSlice.files != null) {
                newConfigSlice.files = []
                storybookConfigSlice.files.forEach((e) => newConfigSlice.files.push(e))
            }

            if (storybookConfigSlice.rules != null) {
                newConfigSlice.rules = { ...config[0].rules }
                Object.entries(storybookConfigSlice.rules).forEach(([k, v]) => (newConfigSlice.rules[k] = v))
            }

            config.push({ ...config[0], ...newConfigSlice })
        })
    }

    config[0].plugins['unused-imports'] = unusedImports
    config[0].rules['unused-imports/no-unused-imports'] = 'warn'

    config[0].rules['max-params'] = 'off'
    config[0].rules['@typescript-eslint/max-params'] = ['error', { max: 8 }]

    config.unshift({ ignores: ['src/routeTree.gen.ts', 'src/types/nomos.d.ts'] })
}

hoistConfig(ts, false)
hoistConfig(tsx, true)

export default [...cjs, ...mjs, ...js, ...ts, ...tsx]
