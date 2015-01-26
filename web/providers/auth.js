'use strict';

angular
.module('mmpApp')
.factory('AuthService1', ['$http', function ($http) {
        return {
            CurrentUser: function() {
                return $http.get("/services/web/AuthService1.svc/CurrentUser")
                    .then(function(response) { return response.data; });
            },
            Login: function(username, password) {
                return $http.post("/services/web/AuthService1.svc/Login", {username: username, password:password})
                    .then(function(response) { return response.data; });
            },
            Logout: function() {
                return $http.get("/services/web/AuthService1.svc/Logout")
                    .then(function(response) { return response.data; });
            }
        };
    }]);