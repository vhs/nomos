'use strict'

angular.module('mmpApp').factory('AuthService1', [
    '$http',
    function ($http) {
        return {
            CurrentUser: function () {
                return $http.get('/services/web/AuthService1.svc/CurrentUser').then(function (response) {
                    return response.data
                })
            },
            Login: function (username, password) {
                return $http.post('/services/web/AuthService1.svc/Login', { username, password }).then(function (response) {
                    return response.data
                })
            },
            Logout: function () {
                return $http.get('/services/web/AuthService1.svc/Logout').then(function (response) {
                    return response.data
                })
            },
            ListUserAccessLog: function (userid, page, size, columns, order, filters) {
                return $http
                    .post('/services/web/AuthService1.svc/ListUserAccessLog', {
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
            CountUserAccessLog: function (userid, filters) {
                return $http.post('/services/web/AuthService1.svc/CountuserAccessLog', { userid, filters }).then(function (response) {
                    return response.data
                })
            },
            ListAccessLog: function (page, size, columns, order, filters) {
                return $http
                    .post('/services/web/AuthService1.svc/ListAccessLog', {
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
            CountAccessLog: function (filters) {
                return $http.post('/services/web/AuthService1.svc/CountAccessLog', { filters }).then(function (response) {
                    return response.data
                })
            },
            ListClients: function (page, size, columns, order, filters) {
                return $http.post('/services/web/AuthService1.svc/ListClients', { page, size, columns, order, filters }).then(function (response) {
                    return response.data
                })
            },
            CountClients: function (filters) {
                return $http.post('/services/web/AuthService1.svc/CountClients', { filters }).then(function (response) {
                    return response.data
                })
            },
            RegisterClient: function (name, description, url, redirecturi) {
                return $http
                    .post('/services/web/AuthService1.svc/RegisterClient', {
                        name,
                        description,
                        url,
                        redirecturi
                    })
                    .then(function (response) {
                        return response.data
                    })
            }
        }
    }
])
