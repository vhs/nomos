'use strict';

angular.module('mmpApp').factory('MetricService1', [
    '$http',
    function ($http) {
        return {
            GetNewMembers: function (start, end) {
                return $http.post('/services/web/MetricService1.svc/GetNewMembers', { start_range: start, end_range: end }).then(function (response) {
                    return response.data;
                });
            },
            GetTotalMembers: function (start, end) {
                return $http.get('/services/web/MetricService1.svc/GetTotalMembers').then(function (response) {
                    return response.data;
                });
            },
            GetNewKeyHolders: function (start, end) {
                return $http
                    .post('/services/web/MetricService1.svc/GetNewKeyHolders', { start_range: start, end_range: end })
                    .then(function (response) {
                        return response.data;
                    });
            },
            GetTotalKeyHolders: function (start, end) {
                return $http.get('/services/web/MetricService1.svc/GetTotalKeyHolders').then(function (response) {
                    return response.data;
                });
            },
            GetPendingAccounts: function () {
                return $http.post('/services/web/MetricService1.svc/GetPendingAccounts', {}).then(function (response) {
                    return response.data;
                });
            },
            GetExceptionPayments: function () {
                return $http.post('/services/web/MetricService1.svc/GetExceptionPayments', {}).then(function (response) {
                    return response.data;
                });
            },
            GetRevenue: function (start, end, group) {
                return $http
                    .post('/services/web/MetricService1.svc/GetRevenue', { start_range: start, end_range: end, group })
                    .then(function (response) {
                        return response.data;
                    });
            },
            GetMembers: function (start, end, group) {
                return $http
                    .post('/services/web/MetricService1.svc/GetMembers', { start_range: start, end_range: end, group })
                    .then(function (response) {
                        return response.data;
                    });
            },
            GetCreatedDates: function (start, end) {
                return $http
                    .post('/services/web/MetricService1.svc/GetCreatedDates', { start_range: start, end_range: end })
                    .then(function (response) {
                        return response.data;
                    });
            },
        };
    },
]);
