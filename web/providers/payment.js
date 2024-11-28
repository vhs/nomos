'use strict'

angular.module('mmpApp').factory('PaymentService1', [
    '$http',
    function ($http) {
        return {
            GetPayment: function (id) {
                return $http.get('/services/web/PaymentService1.svc/GetPayment?id=' + id).then(function (response) {
                    return response.data
                })
            },
            ListUserPayments: function (userid, page, size, columns, order, filters) {
                return $http
                    .post('/services/web/PaymentService1.svc/ListUserPayments', {
                        userid,
                        page,
                        size,
                        columns,
                        order,
                        filters
                    })
                    .then(function (response) {
                        return response.data
                    })
            },
            CountUserPayments: function (userid, filters) {
                return $http.post('/services/web/PaymentService1.svc/CountUserPayments', { userid, filters }).then(function (response) {
                    return response.data
                })
            },
            ListPayments: function (page, size, columns, order, filters) {
                return $http
                    .post('/services/web/PaymentService1.svc/ListPayments', {
                        page,
                        size,
                        columns,
                        order,
                        filters
                    })
                    .then(function (response) {
                        return response.data
                    })
            },
            CountPayments: function (filters) {
                return $http.post('/services/web/PaymentService1.svc/CountPayments', { filters }).then(function (response) {
                    return response.data
                })
            },
            ReplayPaymentProcessing: function (id) {
                return $http.get('/services/web/PaymentService1.svc/ReplayPaymentProcessing?paymentid=' + id).then(function (response) {
                    return response.data
                })
            }
        }
    }
])
