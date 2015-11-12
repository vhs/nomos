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
                controller: ['$scope', '$modal', '$timeout', 'UserService1', 'MembershipService1', function($scope, $modal, $timeout, UserService1, MembershipService1) {
                    $scope.users = [];

                    $scope.showPending = false;
                    $scope.togglePending = function(val) {
                        $scope.showPending = val;
                        $scope.refresh();
                    };

                    $scope.showCash = false;
                    $scope.toggleCash = function(val) {
                        $scope.showCash = val;
                        $scope.refresh();
                    };

                    $scope.showExpired = false;
                    $scope.toggleExpired = function(val) {
                        $scope.showExpired = val;
                        $scope.refresh();
                    };

                    $scope.listService = {
                        page: 0,
                        size: 10,
                        columns: "id,username,fname,lname,email,privileges,created,mem_expire",
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

                        if ($scope.showExpired) {
                            filters.push({
                                column: "mem_expire",
                                operator: "<=",
                                value: moment().format("YYYY-MM-DD hh:mm:ss")
                            });
                        }

                        if ($scope.showCash) {
                            filters.push({
                                column: "cash",
                                operator: "=",
                                value: "1"
                            });
                        }

                        if ($scope.showPending) {
                            filters.push({
                                column: "active",
                                operator: "=",
                                value: "t"
                            });
                        }

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
                            $scope.resetForms();
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.refresh = function() {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();

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