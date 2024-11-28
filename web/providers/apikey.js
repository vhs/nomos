'use strict';

angular.module('mmpApp').factory('ApiKeyService1', [
    '$http',
    function ($http) {
        return {
            GetSystemApiKeys: function () {
                return $http.get('/services/web/ApiKeyService1.svc/GetSystemApiKeys').then(function (response) {
                    return response.data;
                });
            },
            GenerateSystemApiKey: function (notes) {
                return $http.post('/services/web/ApiKeyService1.svc/GenerateSystemApiKey', { notes }).then(function (response) {
                    return response.data;
                });
            },
            GetApiKey: function (keyid) {
                return $http.get('/services/web/ApiKeyService1.svc/GetApiKey?keyid=' + keyid).then(function (response) {
                    return response.data;
                });
            },
            GetUserApiKeys: function (userid) {
                return $http.get('/services/web/ApiKeyService1.svc/GetUserApiKeys?userid=' + userid).then(function (response) {
                    return response.data;
                });
            },
            GenerateUserApiKey: function (userid, notes) {
                return $http.post('/services/web/ApiKeyService1.svc/GenerateUserApiKey', { userid, notes }).then(function (response) {
                    return response.data;
                });
            },
            UpdateApiKey: function (keyid, notes, expires) {
                return $http.post('/services/web/ApiKeyService1.svc/UpdateApiKey', { keyid, notes, expires }).then(function (response) {
                    return response.data;
                });
            },
            PutApiKeyPriviledges: function (keyid, priviledges) {
                return $http.post('/services/web/ApiKeyService1.svc/PutApiKeyPriviledges', { keyid, priviledges }).then(function (response) {
                    return response.data;
                });
            },
            DeleteApiKey: function (keyid) {
                return $http.post('/services/web/ApiKeyService1.svc/DeleteApiKey', { keyid }).then(function (response) {
                    return response.data;
                });
            },
        };
    },
]);
