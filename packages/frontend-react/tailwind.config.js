import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            animation: {
                btn: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s'
            },
            boxShadow: {
                'form-control': 'inset 0px 0px 4px 4px aliceblue',
                'form-error': '0px 0px 4px 2px #ffac3680',
                'primary': '0px 0px 8px -2px #0d6efdff',
                'secondary': '0px 0px 8px -2px #6c757dff',
                'success': '0px 0px 8px -2px #51ab51ff',
                'warning': '0px 0px 8px -2px #ffac36ff',
                'danger': '0px 0px 8px -2px #dc3545ff',
                'info': '0px 0px 8px -2px #0dcaf0ff',
                'light': '0px 0px 8px -2px #f8f9faff',
                'dark': '0px 0px 8px -2px #212529ff',
                'link': '0px 0px 8px -2px #0000ff',
                'disabled': '0px 0px 8px -2px #6c757dff'
            },
            colors: {
                'header': '#f5f5f5',
                'nav': '#f8f8f8',
                'nav-border': 'e7e7e7',
                'warning-border': '#eea236',
                'primary': '#0d6efd',
                'secondary': '#6c757d',
                'success': '#51ab51',
                'warning': '#ffac36',
                'danger': '#dc3545',
                'info': '#0dcaf0',
                'light': '#f8f9fa',
                'dark': '#212529',
                'link': '#0000',
                'disabled': '#6c757d',
                'panel-red': '#d9534f',
                'red-card': '#d9534f',
                'red-card-footer': '#f5f5f5',
                'green-card': '#35a435',
                'panel-green': '#35a435',
                'anchor': '#6ea8fe',
                'regular-link': '#337ab7'
            },
            flexBasis: {
                '1/7': '14.285714285714285%',
                '2/7': '28.57142857142857%',
                '3/7': '42.857142857142854%',
                '4/7': '57.14285714285714%',
                '5/7': '71.42857142857143%',
                '6/7': '85.71428571428571%',
                '7/7': '100%',
                '1/8': '12.5%',
                '2/8': '25%',
                '3/8': '37.5%',
                '4/8': '50%',
                '5/8': '62.5%',
                '6/8': '75%',
                '7/8': '87.5%',
                '8/8': '100%',
                '1/9': '11.11111111111111%',
                '2/9': '22.22222222222222%',
                '3/9': '33.33333333333333%',
                '4/9': '44.44444444444444%',
                '5/9': '55.55555555555556%',
                '6/9': '66.66666666666666%',
                '7/9': '77.77777777777779%',
                '8/9': '88.88888888888889%',
                '9/9': '100%',
                '1/10': '10%',
                '2/10': '20%',
                '3/10': '30%',
                '4/10': '40%',
                '5/10': '50%',
                '6/10': '60%',
                '7/10': '70%',
                '8/10': '80%',
                '9/10': '90%',
                '10/10': '100%',
                '1/11': '9.090909090909092%',
                '2/11': '18.181818181818183%',
                '3/11': '27.27272727272727%',
                '4/11': '36.36363636363637%',
                '5/11': '45.45454545454545%',
                '6/11': '54.54545454545454%',
                '7/11': '63.63636363636363%',
                '8/11': '72.72727272727273%',
                '9/11': '81.81818181818183%',
                '10/11': '90.9090909090909%',
                '11/11': '100%'
            },
            height: {
                'major-height': '80vh',
                'reasonable': '80vh'
            },
            inset: {
                half: '50%'
            },
            screens: {
                '2xs': '360px',
                '1xs': '480px',
                'xs': '576px',
                'sm': '640px',
                'tablet': '640px',
                'md': '768px',
                '2md': '900px',
                'laptop': '1024px',
                'lg': '1024px',
                'desktop': '1280px',
                'xl': '1280px',
                '2xl': '1536px',
                '3xl': '1600px',
                '4xl': '1920px',
                '5xl': '2048px',

                'short': { raw: '(max-height: 400px)' },
                'tall': { raw: '(min-height: 401px and max-height: 600px)' },
                'grande': { raw: '(min-height: 601px and max-height: 800px)' },
                'venti': { raw: '(min-height: 801px)' },

                // Manually generate max-<size> classes due to this bug https://github.com/tailwindlabs/tailwindcss/issues/13022
                'max-sm': { raw: `not all and (min-width: ${defaultTheme.screens.sm})` },
                'max-md': { raw: `not all and (min-width: ${defaultTheme.screens.md})` },
                'max-lg': { raw: `not all and (min-width: ${defaultTheme.screens.lg})` },
                'max-xl': { raw: `not all and (min-width: ${defaultTheme.screens.xl})` },
                'max-2xl': { raw: `not all and (min-width: ${defaultTheme.screens['2xl']})` }
            },
            translate: {
                'quarter-width': '25vw',
                'minor-height': '40vh'
            },
            width: {
                'available': '-webkit-fill-available',
                'half-width': '50vw',
                'major-height': '80vh',
                'reasonable': '80vh'
            },
            zIndex: {
                'above-and-beyond': '12345',
                'infinity-and-beyond': '54321'
            }
        }
    },
    plugins: [],
    safelist: [
        {
            pattern: /((xs|sm|2?md|lg|xl|2xl|3xl|4xl|5xl|tablet|laptop|desktop):)?basis-\d+\/\d+/
        }
    ]
}
