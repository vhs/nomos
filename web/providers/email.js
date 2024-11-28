'use strict'

angular.module('mmpApp').factory('EmailService1', [
    '$http',
    function ($http) {
        return {
            GetTemplate: function (id) {
                return $http.get('/services/web/EmailService1.svc/GetTemplate?id=' + id).then(function (response) {
                    return response.data
                })
            },
            UpdateName: function (id, name) {
                return $http.post('/services/web/EmailService1.svc/UpdateName', { id, name }).then(function (response) {
                    return response.data
                })
            },
            UpdateCode: function (id, code) {
                return $http.post('/services/web/EmailService1.svc/UpdateCode', { id, code }).then(function (response) {
                    return response.data
                })
            },
            UpdateSubject: function (id, subject) {
                return $http.post('/services/web/EmailService1.svc/UpdateSubject', { id, subject }).then(function (response) {
                    return response.data
                })
            },
            UpdateHelp: function (id, help) {
                return $http.post('/services/web/EmailService1.svc/UpdateHelp', { id, help }).then(function (response) {
                    return response.data
                })
            },
            UpdateBody: function (id, body) {
                return $http.post('/services/web/EmailService1.svc/UpdateBody', { id, body }).then(function (response) {
                    return response.data
                })
            },
            UpdateHtml: function (id, html) {
                return $http.post('/services/web/EmailService1.svc/UpdateHtml', { id, html }).then(function (response) {
                    return response.data
                })
            },
            PutTemplate: function (name, code, subject, help, body, html) {
                return $http
                    .post('/services/web/EmailService1.svc/PutTemplate', {
                        name,
                        code,
                        subject,
                        help,
                        body,
                        html
                    })
                    .then(function (response) {
                        return response.data
                    })
            },
            DeleteTemplate: function (id) {
                return $http.get('/services/web/EmailService1.svc/DeleteTemplate?id=' + id).then(function (response) {
                    return response.data
                })
            },
            ListTemplates: function (page, size, columns, order, filters) {
                return $http
                    .post('/services/web/EmailService1.svc/ListTemplates', {
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
            CountTemplates: function (filters) {
                return $http.post('/services/web/EmailService1.svc/CountTemplates', { filters }).then(function (response) {
                    return response.data
                })
            }
        }
    }
])
