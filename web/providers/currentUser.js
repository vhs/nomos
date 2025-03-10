'use strict'

angular.module('mmpApp').factory('CurrentUser', [
    'AuthService1',
    'UserService1',
    function (AuthService1, UserService1) {
        return {
            getCurrentUser: function () {
                return AuthService1.CurrentUser().then(function (principal) {
                    if (principal.id) {
                        return UserService1.GetUser(principal.id).then(function (user) {
                            user.principal = principal
                            user.hasPermission = function (perm) {
                                for (const permission of this.principal.permissions) {
                                    if (permission === perm) return true
                                }
                            }

                            user.valid = new Date(user.mem_expire) > new Date()

                            return user
                        })
                    } else {
                        throw 'login'
                    }
                })
            }
        }
    }
])
