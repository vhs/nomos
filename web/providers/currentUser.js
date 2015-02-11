'use strict';

angular
    .module('mmpApp')
    .factory('CurrentUser', ['AuthService1', 'UserService1', function (AuthService1, UserService1) {
        return {
            getCurrentUser: function () {
                return AuthService1.CurrentUser().then(function (data) {
                    if (data.id) {
                        return UserService1.GetUser(data.id).then(function (data) {
                            return data;
                        });
                    } else {
                        return data;
                    }
                });
            }
        }
    }]);
