import angular from '@types/angular'

import moment from './web/components/bower/moment/moment'

type CouldBeBoth<T> = T | T[]

declare global {
    var moment: moment.fn
    var $timeout: angular.ITimeoutService

    interface Date {
        format: (format: string) => string
        shortMonths: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'
        longMonths:
            | 'January'
            | 'February'
            | 'March'
            | 'April'
            | 'May'
            | 'June'
            | 'July'
            | 'August'
            | 'September'
            | 'October'
            | 'November'
            | 'December'
        shortDays: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
        longDays: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
    }

    type HighchartsOptions = string | Record<string, unknown>

    interface Highcharts {
        chart: (element: HTMLElement, options?: HighchartsOptions) => void
        getOptions: () => CouldBeBoth<Record<string | number> | Array<string | number | object>>
    }

    var Highcharts: Highcharts
}

declare module 'angular' {
    interface IScope {
        options?: HighchartsOptions
    }
}
