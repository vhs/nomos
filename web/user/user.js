'use strict';

angular
    .module('mmpApp.user', ['ui.router', 'angular-md5', 'ui.bootstrap'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user', {
                abstract: true,
                templateUrl: "user/user.html",
                data: {
                    access: "user"
                },
                resolve: {
                    currentUser: ['AuthService1', 'UserService1', function(AuthService1, UserService1) {
                        return AuthService1.CurrentUser().then(function(data) {
                            if(data.id) {
                                return UserService1.GetUser(data.id);
                            } else {
                                return data;
                            }
                        });
                    }]
                },
                controller: ['$scope', '$location', 'currentUser', function($scope, $location, currentUser) {
                    $scope.currentUser = currentUser;

                    $scope.currentUser.hasPrivilege = function(priv) {
                        for(var i=0; i<$scope.currentUser.privileges.length; i++) {
                            if($scope.currentUser.privileges[i].code == priv)
                                return true;
                        }

                        for(var i=0; i<$scope.currentUser.membership.privileges.length; i++) {
                            if($scope.currentUser.membership.privileges[i].code == priv)
                                return true;
                        }

                        return false;
                    };

                    if(!currentUser.id)
                        $location.path("/login/");
                }]
            });
    }]);