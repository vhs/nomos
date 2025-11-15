import basePrettierConfig from '@tyisi/config-prettier'

// @ts-ignore
delete basePrettierConfig['tailwindFunctions']

const config = {
    ...basePrettierConfig,
    printWidth: 150,
    plugins: [
        ...basePrettierConfig.plugins,
        'prettier-plugin-ini',
        'prettier-plugin-nginx',
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
            files: ['*.sh', 'packages/webhooker/webhooker.console', 'packages/webhooker/webhooker.sbin', '.npmrc'],
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
        },
        {
            files: ['docker/nomos.env.template'],
            options: {
                parser: 'sh'
            }
        },
        {
            files: ['conf/php/*.ini', 'conf/php-fpm/*.conf', '.editorconfig'],
            options: {
                parser: 'ini'
            }
        },
        {
            files: ['conf/nginx-*.conf'],
            options: {
                parser: 'nginx'
            }
        },
        {
            files: ['*.neon'],
            options: {
                parser: 'yaml'
            }
        },
        {
            files: ['docker-compose.conf', 'docker-compose.*.conf'],
            options: {
                parser: 'sh'
            }
        }
    ]
}

export default config
