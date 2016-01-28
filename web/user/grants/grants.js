'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.grants', {
                parent: "user",
                url: '/grants',
                data: {
                    access: "user"
                },
                templateUrl: 'user/grants/grants.html',
                controller: ['$scope', '$modal', '$timeout', 'UserService1', 'PrivilegeService1', function($scope, $modal, $timeout, UserService1, PrivilegeService1) {

                    $scope.grants = [];

                    for(var i in $scope.currentUser.privileges)
                    {
                        var priv = $scope.currentUser.privileges[i];

                        if (priv.code == "grant:*") {
                            PrivilegeService1.GetAllPrivileges().then(function(privileges) {
                                $scope.grants = privileges;
                            });
                            break;
                        }

                        if (priv.code.indexOf("grant:") != -1) {
                            priv.code = priv.code.replace("grant:", "");
                            $scope.grants.push(priv);
                        }
                    }

                    $scope.users = [];

                    $scope.listService = {
                        page: 0,
                        size: 10,
                        columns: "id,username,fname,lname,email",
                        order: "id",
                        search: null
                    };

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.checkUpdated = function() {
                        if($scope.pendingUpdate <= 0) {
                            $scope.updated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.getUsers = function() {

                        var filter = null;
                        var filters = [];

                        if ($scope.listService.search != null && $scope.listService.search != "") {
                            var val = "%" + $scope.listService.search + "%";
                            filters.push({
                                left: {
                                    column: "username",
                                    operator: "like",
                                    value: val
                                },
                                operator: "or",
                                right: {
                                    left: {
                                        column: "email",
                                        operator: "like",
                                        value: val
                                    },
                                    operator: "or",
                                    right: {
                                        left: {
                                            column: "fname",
                                            operator: "like",
                                            value: val
                                        },
                                        operator: "or",
                                        right: {
                                            column: "lname",
                                            operator: "like",
                                            value: val
                                        }
                                    }
                                }
                            });
                        }

                        var addRightmost = function(filter, val) {
                            if (filter.right != null)
                                addRightmost(filter.right, val);
                            filter.right = val;
                        };

                        for (var i = 0; i < filters.length; i++) {
                            if (filter == null) {
                                if (filters.length > 1) {
                                    filter = {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    };
                                } else {
                                    filter = filters[i];
                                    break;
                                }
                            } else {
                                if (i == filters.length - 1) {
                                    addRightmost(filter, filters[i]);
                                } else {
                                    addRightmost(filter, {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    });
                                }
                            }
                        }

                        return UserService1.ListUsers($scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, filter);
                    };

                    $scope.updated = function() {
                        $scope.getUsers().then(function(data) {
                            $scope.users = data;
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.refresh = function() {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();


                    $scope.openGrantUser = function (user, grants) {
                        $modal.open({
                            templateUrl: 'GrantUserModal.html',
                            size: "md",
                            controller: function ($scope, $modalInstance) {
                                $scope.grantee = user;
                                $scope.grantee.privileges = grants;

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
                                    $scope.updating = false;
                                    $scope.pendingUpdate = 0;
                                };

                                for(var i = 0; i < $scope.grantee.privileges.length; i++) {
                                    $scope.grantee.privileges[i].selected = false;
                                }

                                UserService1.GetGrantUserPrivileges($scope.grantee.id).then(function(privileges){
                                    angular.forEach(privileges, function(priv){
                                        for(var i = 0; i < $scope.grantee.privileges.length; i++)
                                            if (priv == $scope.grantee.privileges[i].code)
                                                $scope.grantee.privileges[i].selected = true;
                                    });
                                });

                                $scope.togglePrivilege = function(privilege){
                                    $scope.updating = true;
                                    $scope.pendingUpdate = 1;

                                    if(privilege.selected) {
                                        UserService1.RevokePrivilege($scope.grantee.id, privilege.code).then(function(){
                                            privilege.selected = false;
                                            $scope.pendingUpdate = 0;
                                            $scope.checkUpdated();
                                        });
                                    } else {
                                        UserService1.GrantPrivilege($scope.grantee.id, privilege.code).then(function(){
                                            privilege.selected = true;
                                            $scope.pendingUpdate = 0;
                                            $scope.checkUpdated();
                                        });
                                    }
                                };

                                $scope.done = function () {
                                    $modalInstance.dismiss('cancel');
                                    $scope.grantee = {};
                                };
                            }
                        });
                    };

                }]
            });
    }]);