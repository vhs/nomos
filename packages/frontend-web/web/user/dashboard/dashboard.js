'use strict'

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.dashboard', {
            parent: 'user',
            url: '/dashboard',
            templateUrl: 'user/dashboard/dashboard.html',
            resolve: {
                newMembers: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetNewMembers(
                            moment().utc().subtract(30, 'days').startOf('month').toISOString(),
                            moment().utc().endOf('month').toISOString()
                        )
                    }
                ],
                totalMembers: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetTotalMembers()
                    }
                ],
                allPermissions: [
                    '$rootScope',
                    'PrivilegeService1',
                    function (_$rootScope, PrivilegeService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return PrivilegeService1.GetAllPrivileges()
                    }
                ],
                revenue: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetRevenue(
                            moment().utc().subtract(18, 'months').startOf('month').toISOString(),
                            moment().utc().subtract(1, 'months').endOf('month').toISOString(),
                            'month'
                        )
                    }
                ],
                members: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetMembers(
                            moment().utc().subtract(18, 'months').startOf('month').toISOString(),
                            moment().utc().subtract(1, 'months').endOf('month').toISOString(),
                            'month'
                        )
                    }
                ],
                revenueLastMonth: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetRevenue(
                            moment().utc().subtract(1, 'months').startOf('month').toISOString(),
                            moment().utc().subtract(1, 'months').endOf('month').toISOString(),
                            'all'
                        )
                    }
                ],
                revenueThisMonth: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetRevenue(
                            moment().utc().startOf('month').toISOString(),
                            moment().utc().endOf('month').toISOString(),
                            'all'
                        )
                    }
                ],
                createdDates: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetCreatedDates(
                            moment().utc().subtract(18, 'months').startOf('month').toISOString(),
                            moment().utc().endOf('month').toISOString()
                        )
                    }
                ],
                createdDatesLast30days: [
                    '$rootScope',
                    '$stateParams',
                    'MetricService1',
                    function (_$rootScope, _$stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetCreatedDates(
                            moment().utc().subtract(3, 'months').startOf('month').toISOString(),
                            moment().utc().endOf('month').toISOString()
                        )
                    }
                ]
            },
            controller: [
                '$scope',
                'newMembers',
                'totalMembers',
                'revenue',
                'members',
                'revenueLastMonth',
                'revenueThisMonth',
                'createdDates',
                'createdDatesLast30days',
                function (
                    $scope,
                    newMembers,
                    totalMembers,
                    revenue,
                    members,
                    revenueLastMonth,
                    revenueThisMonth,
                    createdDates,
                    createdDatesLast30days
                ) {
                    $scope.newMembers = newMembers
                    $scope.newMembersSince = moment().utc().subtract(30, 'days').startOf('month').format('MMM DD, YYYY')
                    $scope.totalMembers = totalMembers
                    $scope.date = moment().format('MMMM YYYY')
                    $scope.revenue = revenue
                    $scope.members = members
                    $scope.revenueLastMonth = revenueLastMonth
                    $scope.revenueThisMonth = revenueThisMonth
                    $scope.createdDates = createdDates
                    $scope.createdDatesLast30days = createdDatesLast30days

                    const series = []

                    for (const membership in revenue.by_membership) {
                        if (!Object.hasOwn(revenue.by_membership, membership)) continue

                        const data = []

                        for (const date in revenue.by_membership[membership]) {
                            if (!Object.hasOwn(revenue.by_membership[membership], date)) continue

                            const d = moment.utc(date, 'YYYY-MM-DD')

                            data.push([Date.UTC(d.year(), d.month(), d.date()), revenue.by_membership[membership][date]])
                        }

                        let name = membership

                        switch (name) {
                            case 'vhs_membership_member':
                                name = 'Member'
                                break
                            case 'vhs_membership_keyholder':
                                name = 'Keyholder'
                                break
                            case 'vhs_membership_friend':
                                name = 'Friend'
                                break
                            case 'vhs_card_2015':
                                name = 'Purchases'
                                break
                        }

                        series.push({
                            type: 'area',
                            name,
                            data
                        })
                    }

                    const totals = []

                    for (const date in revenue.grouping) {
                        if (!Object.hasOwn(revenue.grouping, date)) continue

                        const d = moment.utc(date, 'YYYY-MM-DD')

                        totals.push([Date.UTC(d.year(), d.month(), d.date()), revenue.grouping[date]])
                    }

                    series.push({
                        type: 'line',
                        name: 'Total',
                        data: totals
                    })

                    $scope.revenueChartOptions = {
                        chart: {
                            //type: 'area',
                            zoomType: 'x'
                        },
                        title: {
                            text: 'Annual Revenue'
                        },
                        subtitle: {
                            text: 'Note: only includes PayPal transactions'
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: '$ CAD'
                            }
                        },
                        tooltip: {
                            split: true
                        },
                        plotOptions: {
                            area: {
                                stacking: 'normal',
                                lineColor: '#666666',
                                lineWidth: 1,
                                marker: {
                                    lineWidth: 1,
                                    lineColor: '#666666'
                                }
                            }
                        },
                        series
                    }

                    const created = []
                    const expired = []
                    const total = []

                    for (const date in members.created) {
                        if (!Object.hasOwn(members.created, date)) continue

                        const d = moment.utc(date, 'YYYY-MM-DD')

                        created.push([Date.UTC(d.year(), d.month(), d.date()), members.created[date]])
                    }

                    for (const date in members.expired) {
                        if (!Object.hasOwn(members.expired, date)) continue

                        const d = moment.utc(date, 'YYYY-MM-DD')

                        expired.push([Date.UTC(d.year(), d.month(), d.date()), members.expired[date]])
                    }

                    for (const date in members.total) {
                        if (!Object.hasOwn(members.total, date)) continue

                        const d = moment.utc(date, 'YYYY-MM-DD')

                        total.push([Date.UTC(d.year(), d.month(), d.date()), members.total[date]])
                    }

                    $scope.memberChartOptions = {
                        chart: {
                            //type: 'area',
                            zoomType: 'x'
                        },
                        title: {
                            text: 'Change in Membership'
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: 'Count'
                            }
                        },
                        tooltip: {
                            split: true
                        },
                        plotOptions: {
                            area: {
                                stacking: 'normal',
                                lineColor: '#666666',
                                lineWidth: 1,
                                marker: {
                                    lineWidth: 1,
                                    lineColor: '#666666'
                                }
                            }
                        },
                        series: [
                            {
                                type: 'column',
                                name: 'New Members',
                                data: created
                            },
                            {
                                type: 'column',
                                name: 'Expired Members',
                                data: expired
                            },
                            {
                                type: 'line',
                                name: 'Total Members (PayPal only)',
                                data: total
                            }
                        ]
                    }

                    // const thisMonth = moment()
                    // const lastMonth = moment().subtract(1, 'month')

                    $scope.revenueGoalChartOptions = {
                        chart: {
                            type: 'solidgauge'
                        },
                        title: {
                            text: 'Expected Monthly Revenue - ' + $scope.date
                        },
                        subtitle: {
                            text: 'Note: by PayPal transactions, these happen throughout the month'
                        },
                        xAxis: {
                            categories: ['Target']
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '$ CAD'
                            }
                        },
                        series: [
                            {
                                type: 'solidgauge',
                                name: 'Last Month Actual',
                                data: [{ y: revenueLastMonth.grouping.all, color: 'rgba(124, 181, 236, 0.74902)' }],
                                dataLabels: {
                                    enabled: true,
                                    color: 'rgba(124, 181, 236, 0.74902)',
                                    align: 'center',
                                    // eslint-disable-next-line no-template-curly-in-string
                                    format: '${point.y:.2f}', // one decimal
                                    style: {
                                        fontSize: '20px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                },
                                pointPadding: 0.3,
                                pointPlacement: 0.2
                            },
                            {
                                type: 'solidgauge',
                                name: 'This Month to-date',
                                data: [{ y: revenueThisMonth.grouping.all, color: '#5cb85c' }],
                                dataLabels: {
                                    enabled: true,
                                    color: '#5cb85c',
                                    align: 'center',
                                    // eslint-disable-next-line no-template-curly-in-string
                                    format: '${point.y:.2f}', // one decimal
                                    y: -50,
                                    style: {
                                        fontSize: '20px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                },
                                pointPadding: 0.4,
                                pointPlacement: 0.2
                            }
                        ]
                    }

                    const dowSeries = []

                    for (const dow in createdDates.byDowHour) {
                        for (const hour in createdDates.byDowHour[dow]) {
                            if (hour === 'total') continue
                            dowSeries.push([parseInt(hour), parseInt(dow), createdDates.byDowHour[dow][hour]])
                        }
                    }

                    $scope.createdByDowHourChartOptions = {
                        chart: {
                            type: 'heatmap',
                            marginTop: 40,
                            marginBottom: 80,
                            plotBorderWidth: 1
                        },
                        xAxis: {
                            categories: [
                                '12am',
                                '1am',
                                '2am',
                                '3am',
                                '4am',
                                '5am',
                                '6am',
                                '7am',
                                '8am',
                                '9am',
                                '10am',
                                '11am',
                                '12pm',
                                '1pm',
                                '2pm',
                                '3pm',
                                '4pm',
                                '5pm',
                                '6pm',
                                '7pm',
                                '8pm',
                                '9pm',
                                '10pm',
                                '11pm'
                            ]
                        },
                        yAxis: {
                            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            title: null
                        },

                        colorAxis: {
                            min: 0,
                            minColor: '#FFFFFF',
                            maxColor: Highcharts.getOptions().colors[0]
                        },

                        legend: {
                            align: 'right',
                            layout: 'vertical',
                            margin: 0,
                            verticalAlign: 'top',
                            y: 25,
                            symbolHeight: 280
                        },
                        title: {
                            text: 'Popular sign up times (last 18 months)'
                        },
                        tooltip: {
                            formatter: function () {
                                return (
                                    '<b>' +
                                    this.series.xAxis.categories[this.point.x] +
                                    '</b> hour <br><b>' +
                                    this.point.value +
                                    '</b> created <br><b>' +
                                    this.series.yAxis.categories[this.point.y] +
                                    '</b>'
                                )
                            }
                        },
                        series: [
                            {
                                name: 'Creations by hour',
                                borderWidth: 1,
                                data: dowSeries,
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000'
                                }
                            }
                        ]
                    }

                    const dowSeries30days = []

                    for (const dow in createdDatesLast30days.byDowHour) {
                        for (const hour in createdDatesLast30days.byDowHour[dow]) {
                            if (hour === 'total') continue
                            dowSeries30days.push([parseInt(hour), parseInt(dow), createdDatesLast30days.byDowHour[dow][hour]])
                        }
                    }

                    $scope.createdByDowHour30daysChartOptions = {
                        chart: {
                            type: 'heatmap'
                        },
                        xAxis: {
                            categories: [
                                '12am',
                                '1am',
                                '2am',
                                '3am',
                                '4am',
                                '5am',
                                '6am',
                                '7am',
                                '8am',
                                '9am',
                                '10am',
                                '11am',
                                '12pm',
                                '1pm',
                                '2pm',
                                '3pm',
                                '4pm',
                                '5pm',
                                '6pm',
                                '7pm',
                                '8pm',
                                '9pm',
                                '10pm',
                                '11pm'
                            ]
                        },
                        yAxis: {
                            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            title: null
                        },

                        colorAxis: {
                            min: 0,
                            minColor: '#FFFFFF',
                            maxColor: Highcharts.getOptions().colors[0]
                        },

                        legend: {
                            align: 'right',
                            layout: 'vertical',
                            margin: 0,
                            verticalAlign: 'top',
                            y: 25,
                            symbolHeight: 280
                        },
                        title: {
                            text: 'Popular sign up times (last 3 months)'
                        },
                        tooltip: {
                            formatter: function () {
                                return (
                                    '<b>' +
                                    this.series.xAxis.categories[this.point.x] +
                                    '</b> hour <br><b>' +
                                    this.point.value +
                                    '</b> created <br><b>' +
                                    this.series.yAxis.categories[this.point.y] +
                                    '</b>'
                                )
                            }
                        },
                        series: [
                            {
                                name: 'Creations by hour',
                                data: dowSeries30days
                            }
                        ]
                    }

                    const monthSeries = []

                    for (const month in createdDates.byMonthDow) {
                        for (const dow in createdDates.byMonthDow[month]) {
                            if (dow === 'total') continue
                            monthSeries.push([parseInt(month) - 1, parseInt(dow), createdDates.byMonthDow[month][dow]])
                        }
                    }

                    $scope.createdByMonthDowChartOptions = {
                        chart: {
                            type: 'heatmap',
                            marginTop: 40,
                            marginBottom: 80,
                            plotBorderWidth: 1
                        },
                        xAxis: {
                            categories: [
                                'January',
                                'February',
                                'March',
                                'April',
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                                'November',
                                'December'
                            ]
                        },
                        yAxis: {
                            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            title: null
                        },

                        colorAxis: {
                            min: 0,
                            minColor: '#FFFFFF',
                            maxColor: Highcharts.getOptions().colors[0]
                        },

                        legend: {
                            align: 'right',
                            layout: 'vertical',
                            margin: 0,
                            verticalAlign: 'top',
                            y: 25,
                            symbolHeight: 280
                        },
                        title: {
                            text: 'Popular sign up months (last 18 months)'
                        },
                        tooltip: {
                            formatter: function () {
                                return (
                                    '<b>' +
                                    this.series.xAxis.categories[this.point.x] +
                                    '</b> month <br><b>' +
                                    this.point.value +
                                    '</b> created <br><b>' +
                                    this.series.yAxis.categories[this.point.y] +
                                    '</b>'
                                )
                            }
                        },
                        series: [
                            {
                                name: 'Creations by month',
                                borderWidth: 1,
                                data: monthSeries,
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000'
                                }
                            }
                        ]
                    }
                }
            ]
        })
    }
])
