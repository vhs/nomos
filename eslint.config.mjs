import js from '@tyisi/config-eslint/js'

js[0].languageOptions.globals = {
    ...js[0].languageOptions.globals,
    _: false,
    $: false,
    $http: false,
    $timeout: false,
    alert: false,
    angular: false,
    Highcharts: false,
    moment: false,
    window: false
}

export default js
