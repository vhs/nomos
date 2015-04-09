'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.profile', {
                parent: "admin",
                url: '/users/:userId',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/users/profile.html',
                resolve: {
                    user: ['$stateParams', 'UserService1', function($stateParams, UserService1) {
                        return UserService1.GetUser($stateParams.userId);
                    }]
                },
                controller: ['$scope', '$modal', 'user', 'PrivilegeService1', function($scope, $modal, user, PrivilegeService1) {
                    $scope.user = user;
                    var currentPriv = {};
                    //Build a map of selected privileges
                    angular.forEach(user.privileges, function(userPriv){
                        currentPriv[userPriv.code] = userPriv;
                    });
                    var promise = PrivilegeService1.GetAllPrivileges();
                    promise.then(function(privileges){
                        $scope.privileges = [];
                        angular.forEach(privileges, function(privilege){
                            privilege.selected = angular.isDefined(currentPriv[privilege.code]);
                            $scope.privileges.push(privilege);
                        });
                    });

                    $scope.togglePrivilege = function(privilege){
                        privilege.selected = !privilege.selected;
                        $scope.privilegeDirty = true;
                    };

                    $scope.updatePrivileges = function(){
                        var codes = [];
                        angular.forEach($scope.privileges, function(priv){
                            if (priv.selected){
                                codes.push(priv.code);
                            }
                        });

                        PrivilegeService1.PutUserPrivileges(user.id, codes).then(function(){
                            $scope.privilegeDirty = false;
                        });
                    };
                }]
            });
    }]);