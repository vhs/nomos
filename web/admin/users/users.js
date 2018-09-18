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
                    statuses: ['UserService1', function (UserService1) {
                        return UserService1.GetStatuses();
                    }]
                },
                controller: ['$scope', '$modal', '$timeout', 'UserService1', 'MembershipService1', 'statuses', function($scope, $modal, $timeout, UserService1, MembershipService1, statuses) {
                    $scope.users = [];
                    $scope.userCount = 0;
                    $scope.statuses = statuses;

                    $scope.convertStatus = function(code) {
                        for(var i in $scope.statuses)
                            if ($scope.statuses[i].code == code)
                                return $scope.statuses[i].title;
                    };

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

                    $scope.showActive = false;
                    $scope.toggleActive = function(val) {
                        $scope.showActive = val;
                        $scope.refresh();
                    };

                    $scope.showInactive = false;
                    $scope.toggleInactive = function(val) {
                        $scope.showInactive = val;
                        $scope.refresh();
                    };

                    $scope.showBanned = false;
                    $scope.toggleBanned = function(val) {
                        $scope.showBanned = val;
                        $scope.refresh();
                    };

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: "id,username,fname,lname,email,privileges,created,mem_expire,active,cash,lastlogin",
                        order: "created desc",
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

                    $scope.getFilter = function() {

                        var filter = null;
                        var filters = [];
                        var orFilters = [];

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

                        if ($scope.showActive) {
                            orFilters.push({
                                column: "active",
                                operator: "=",
                                value: "y"
                            });
                        }

                        if ($scope.showPending) {
                            orFilters.push({
                                column: "active",
                                operator: "=",
                                value: "t"
                            });
                        }

                        if ($scope.showInactive) {
                            orFilters.push({
                                column: "active",
                                operator: "=",
                                value: "n"
                            });
                        }

                        if ($scope.showBanned) {
                            orFilters.push({
                                column: "active",
                                operator: "=",
                                value: "b"
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

                        for (var i = 0; i < orFilters.length; i++) {
                            if (filter == null) {
                                if (orFilters.length > 1) {
                                    filter = {
                                        left: orFilters[i],
                                        operator: "or",
                                        right: null
                                    };
                                } else {
                                    filter = orFilters[i];
                                    break;
                                }
                            } else {
                                if (i == orFilters.length - 1) {
                                    addRightmost(filter, orFilters[i]);
                                } else {
                                    addRightmost(filter, {
                                        left: orFilters[i],
                                        operator: "or",
                                        right: null
                                    });
                                }
                            }
                        }

                        return filter;
                    };

                    $scope.getUsers = function() {
                        var filter = $scope.getFilter();

                        return UserService1.ListUsers(($scope.listService.page-1)*$scope.listService.pageSize, $scope.listService.pageSize, $scope.listService.columns, $scope.listService.order, filter);
                    };

                    $scope.countUsers = function() {
                        var filter = $scope.getFilter();

                        return UserService1.CountUsers(filter);
                    };

                    $scope.updated = function() {
                        $scope.countUsers().then(function(data) {
                            $scope.userCount = data;

                            $scope.getUsers().then(function(data) {
                                $scope.users = data;

                                $scope.users.forEach(function(user) {
                                    user.member_since = moment(user.created).format("MMMM Do, YYYY");
                                    user.member_for = moment(user.created).fromNow(true);
                                    user.last_login = moment(user.lastlogin).format("MMM DD, YYYY, h:mm:ss a");
                                    user.expiry = moment(user.mem_expire).fromNow();
                                    user.expiry_date = moment(user.mem_expire).format("MMMM Do YYYY");
                                });

                                $scope.resetForms();
                                $scope.updating = false;
                                $scope.pendingUpdate = 0;
                            });
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