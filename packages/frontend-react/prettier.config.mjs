import config from '../../prettier.config.mjs'

config.printWidth = 120

config.overrides.push({
    files: ['*.css'],
    options: {
        parser: 'tailwind'
    }
})

export default config
