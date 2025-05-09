'use strict'

const app = angular
    .module('mmpApp', [
        'ui.router',
        'mmpApp.public',
        'mmpApp.user',
        'mmpApp.admin'

        //'mmpApp.version'
    ])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function (_$stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/')
        }
    ])

app.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams
})

app.directive('showDuringResolve', function ($rootScope) {
    return {
        link: function (scope, element) {
            element.addClass('ng-hide')

            const unregister = $rootScope.$on('$routeChangeStart', function () {
                element.removeClass('ng-hide')
            })

            scope.$on('$destroy', unregister)
        }
    }
})

app.directive('resolveLoader', function ($rootScope, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="alert alert-success ng-hide"><strong>Welcome!</strong> Content is loading, please hold.</div>',
        link: function (_scope, element) {
            $rootScope.$on('$routeChangeStart', function (_event, _currentRoute, previousRoute) {
                if (previousRoute) return

                $timeout(function () {
                    element.removeClass('ng-hide')
                })
            })

            $rootScope.$on('$routeChangeSuccess', function () {
                element.addClass('ng-hide')
            })

            $rootScope.$on('$stateChangeError', function (_event, _toState, _toParams, _fromState, _fromParams, error) {
                if (error === 'login') {
                    $rootScope.$state.go('public.login')
                }
            })
        }
    }
})

app.directive('hcChart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        link: function (scope, element) {
            Highcharts.chart(element[0], scope.options)
        }
    }
})
