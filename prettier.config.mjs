import basePrettierConfig from '@tyisi/config-prettier'

// @ts-ignore
delete basePrettierConfig['tailwindFunctions']

const config = {
    ...basePrettierConfig,
    printWidth: 150,
    plugins: [
        ...basePrettierConfig.plugins,
        'prettier-plugin-ini',
        '@prettier/plugin-php',
        'prettier-plugin-sh',
        'prettier-plugin-sql',
        'prettier-plugin-tailwindcss',
        '@prettier/plugin-xml'
    ],
    overrides: [
        {
            files: ['*.php'],
            options: {
                parser: 'php',
                braceStyle: '1tbs',
                trailingCommaPHP: false
            }
        },
        {
            files: ['*.sh', 'packages/webhooker/webhooker.console', 'packages/webhooker/webhooker.sbin', '.npmrc', 'conf/php-fpm/*.conf'],
            options: {
                parser: 'sh'
            }
        },
        {
            files: ['*.sql'],
            options: {
                parser: 'sql'
            }
        },
        {
            files: ['*.xml'],
            options: {
                parser: 'xml'
            }
        },
        {
            files: ['.bowerrc'],
            options: {
                parser: 'json'
            }
        },
        {
            files: ['.shellcheckrc'],
            options: {
                parser: 'sh'
            }
        },
        {
            files: ['Dockerfile.*'],
            options: {
                parser: 'sh'
            }
<<<<<<< HEAD
=======
        },
        {
            files: ['conf/php/*.ini', 'conf/php-fpm/*.conf', '.editorconfig'],
            options: {
                parser: 'ini'
            }
>>>>>>> 96e30229 (dev: improved prettier config with missing plugin and .editorconfig support)
        }
    ]
}

export default config
