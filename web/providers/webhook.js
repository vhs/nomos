'use strict';

angular.module('mmpApp').factory('WebHookService1', [
    '$http',
    function ($http) {
        return {
            GetHook: function (id) {
                return $http.get('/services/web/WebHookService1.svc/GetHook?id=' + id).then(function (response) {
                    return response.data;
                });
            },
            CreateHook: function (name, description, enabled, url, translation, headers, method, eventid) {
                return $http
                    .post('/services/web/WebHookService1.svc/CreateHook', {
                        name,
                        description,
                        enabled,
                        url,
                        translation,
                        headers,
                        method,
                        eventid,
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            UpdateHook: function (id, name, description, enabled, url, translation, headers, method, eventid) {
                return $http
                    .post('/services/web/WebHookService1.svc/UpdateHook', {
                        id,
                        name,
                        description,
                        enabled,
                        url,
                        translation,
                        headers,
                        method,
                        eventid,
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            EnableHook: function (id, enabled) {
                return $http.post('/services/web/WebHookService1.svc/EnableHook', { id, enabled }).then(function (response) {
                    return response.data;
                });
            },
            PutHookPrivileges: function (id, codes) {
                return $http.post('/services/web/WebHookService1.svc/PutHookPrivileges', { id, privileges: codes.join() });
            },
            ListUserHooks: function (userid, page, size, columns, order, filters) {
                return $http
                    .post('/services/web/WebHookService1.svc/ListUserHooks', {
                        userid,
                        page,
                        size,
                        columns,
                        order,
                        filters,
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            CountUserHooks: function (userid, filters) {
                return $http.post('/services/web/WebHookService1.svc/CountUserHooks', { userid, filters }).then(function (response) {
                    return response.data;
                });
            },
            ListHooks: function (page, size, columns, order, filters) {
                return $http.post('/services/web/WebHookService1.svc/ListHooks', { page, size, columns, order, filters }).then(function (response) {
                    return response.data;
                });
            },
            CountHooks: function (filters) {
                return $http.post('/services/web/WebHookService1.svc/CountHooks', { filters }).then(function (response) {
                    return response.data;
                });
            },
            DeleteHook: function (id) {
                return $http.get('/services/web/WebHookService1.svc/DeleteHook?id=' + id).then(function (response) {
                    return response.data;
                });
            },
        };
    },
]);
