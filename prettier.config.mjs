import basePrettierConfig from '@tyisi/config-prettier'

// @ts-ignore
delete basePrettierConfig['tailwindFunctions']

const config = {
    ...basePrettierConfig,
    printWidth: 150,
    plugins: ['@prettier/plugin-php', 'prettier-plugin-sh', 'prettier-plugin-sql', '@prettier/plugin-xml'],
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
            files: ['*.sh'],
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
        }
    ]
}

export default config
