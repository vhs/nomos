import config from '@tyisi/config-stylelint'

config.rules['block-no-empty'] = null
config.rules['no-empty-source'] = null
config.rules['selector-class-pattern'] = [
    '^([A-Za-z][a-z0-9]*)(-{0,2}[A-Za-z0-9][a-z0-9]*)*$',
    { resolveNestedSelectors: true }
]
config.rules['custom-property-pattern'] = [
    '([a-z][a-z0-9]*)(-{0,2}[A-Za-z0-9][a-z0-9]*)*$',
    { resolveNestedSelectors: true }
]
config.rules['media-query-no-invalid'] = null
config.rules['no-invalid-position-at-import-rule'] = null

export default config
