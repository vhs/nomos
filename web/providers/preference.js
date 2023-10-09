'use strict';

angular.module('mmpApp').factory('PreferenceService1', [
    '$http',
    '$q',
    function ($http, $q) {
        return {
            GetAllSystemPreferences: function () {
                return $http.get('/services/web/PreferenceService1.svc/GetAllSystemPreferences').then(function (response) {
                    parent._privileges = response.data;
                    return response.data;
                });
            },
            ListSystemPreferences: function (page, size, columns, order, filters) {
                return $http
                    .post('/services/web/PreferenceService1.svc/ListSystemPreferences', {
                        page: page,
                        size: size,
                        columns: columns,
                        order: order,
                        filters: filters,
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            SystemPreference: function (key) {
                return $http.post('/services/web/PreferenceService1.svc/SystemPreference', { key: key }).then(function (response) {
                    return response.data;
                });
            },
            PutSystemPreference: function (key, value, enabled, notes) {
                return $http.post('/services/web/PreferenceService1.svc/PutSystemPreference', {
                    key: key,
                    value: value,
                    enabled: enabled,
                    notes: notes,
                });
            },
            UpdateSystemPreference: function (id, key, value, enabled, notes) {
                return $http.post('/services/web/PreferenceService1.svc/UpdateSystemPreference', {
                    id: id,
                    key: key,
                    value: value,
                    enabled: enabled,
                    notes: notes,
                });
            },
            UpdateSystemPreferenceEnabled: function (key, enabled) {
                return $http
                    .post('/services/web/PreferenceService1.svc/UpdateSystemPreferenceEnabled', { key: key, enabled: enabled })
                    .then(function (response) {
                        return response.data;
                    });
            },
            PutSystemPreferencePrivileges: function (id, codes) {
                return $http.post('/services/web/PreferenceService1.svc/PutSystemPreferencePrivileges', { id: id, privileges: codes.join() });
            },
            DeleteSystemPreference: function (key) {
                return $http.post('/services/web/PreferenceService1.svc/DeleteSystemPreference', { key: key }).then(function (response) {
                    return response.data;
                });
            },
        };
    },
]);
