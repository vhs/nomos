'use strict'

angular.module('mmpApp').factory('PinService1', [
    '$http',
    function ($http) {
        return {
            GetUserPin: function (userid) {
                return $http.get('/services/web/PinService1.svc/GetUserPin?userid=' + userid).then(function (response) {
                    return response.data
                })
            },
            GeneratePin: function (userid) {
                return $http.get('/services/web/PinService1.svc/GeneratePin?userid=' + userid).then(function (response) {
                    return response.data
                })
            },
            UpdateUserPin: function (userid, pin) {
                return $http.post('/services/web/PinService1.svc/UpdateUserPin', { userid, pin }).then(function (response) {
                    return response.data
                })
            },
            UpdatePin: function (keyid, pin) {
                return $http.post('/services/web/PinService1.svc/UpdatePin', { keyid, pin }).then(function (response) {
                    return response.data
                })
            }
        }
    }
])
