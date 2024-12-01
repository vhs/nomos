'use strict'

angular.module('mmpApp').factory('PreferenceService1', [
    '$http',
    '$q',
    function ($http, _$q) {
        return {
            GetAllSystemPreferences: function () {
                return $http.get('/services/web/PreferenceService1.svc/GetAllSystemPreferences').then(function (response) {
                    return response.data
                })
            },
            ListSystemPreferences: function (page, size, columns, order, filters) {
                return $http
                    .post('/services/web/PreferenceService1.svc/ListSystemPreferences', {
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
            SystemPreference: function (key) {
                return $http.post('/services/web/PreferenceService1.svc/SystemPreference', { key }).then(function (response) {
                    return response.data
                })
            },
            PutSystemPreference: function (key, value, enabled, notes) {
                return $http.post('/services/web/PreferenceService1.svc/PutSystemPreference', {
                    key,
                    value,
                    enabled,
                    notes
                })
            },
            UpdateSystemPreference: function (id, key, value, enabled, notes) {
                return $http.post('/services/web/PreferenceService1.svc/UpdateSystemPreference', {
                    id,
                    key,
                    value,
                    enabled,
                    notes
                })
            },
            UpdateSystemPreferenceEnabled: function (key, enabled) {
                return $http.post('/services/web/PreferenceService1.svc/UpdateSystemPreferenceEnabled', { key, enabled }).then(function (response) {
                    return response.data
                })
            },
            PutSystemPreferencePrivileges: function (id, codes) {
                return $http.post('/services/web/PreferenceService1.svc/PutSystemPreferencePrivileges', { id, privileges: codes.join() })
            },
            DeleteSystemPreference: function (key) {
                return $http.post('/services/web/PreferenceService1.svc/DeleteSystemPreference', { key }).then(function (response) {
                    return response.data
                })
            }
        }
    }
])
