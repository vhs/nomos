'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.users', {
                parent: "admin",
                url: '/users/',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/users/users.html',
                resolve: {
                    users: ['currentUser', 'UserService1', function(currentUser, UserService1) {
                        return UserService1.GetUsers();
                    }]
                },
                controller: ['$scope', '$modal', '$timeout', 'users', 'UserService1', 'MembershipService1', function($scope, $modal, $timeout, users, UserService1, MembershipService1) {
                    $scope.users = users;

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.checkUpdated = function() {
                        if($scope.pendingUpdate <= 0) {
                            $scope.updated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.updated = function() {
                        UserService1.GetUsers().then(function(data) {
                            $scope.users = data;
                            $scope.resetForms();
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.resetForms = function() {

                    };

                    $scope.openCreateUser = function () {

                        var modalInstance = $modal.open({
                            templateUrl: 'CreateUserModal.html',
                            size: "md",
                            controller: function ($scope, $modalInstance) {
                                $scope.user = {};
                                var currentMembership = {};


                                var mpromise = MembershipService1.GetAll();
                                mpromise.then(function(memberships){
                                    $scope.memberships = [];
                                    angular.forEach(memberships, function(membership){
                                        membership.selected = membership.code == currentMembership.code;
                                        $scope.memberships.push(membership);
                                    });
                                });

                                $scope.switchMembership = function(membership){

                                    angular.forEach($scope.memberships, function(mem){
                                        if (membership.code != mem.code)
                                            mem.selected = false;
                                    });

                                    membership.selected = !membership.selected;
                                    $scope.user.membership = membership;

                                    //$scope.membershipDirty = true;
                                };

                                $scope.ok = function () {
                                    $modalInstance.close($scope.user);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (user) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            var membership = null;
                            angular.forEach($scope.memberships, function(mem){
                                if (mem.selected){
                                    membership = mem;
                                }
                            });

                            $scope.pendingUpdate += 1;
                            UserService1.Create(user.username, user.password, user.email, user.fname, user.lname, user.membership.id)
                                .then(function() { $scope.pendingUpdate -= 1; });

                            $scope.checkUpdated();
                        });
                    };
                }]
            });
    }]);