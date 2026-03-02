'use strict'

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.grants', {
            parent: 'user',
            url: '/grants',
            data: {
                access: 'user'
            },
            templateUrl: 'user/grants/grants.html',
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'UserService1',
                'PrivilegeService1',
                function ($scope, $modal, $timeout, UserService1, PrivilegeService1) {
                    $scope.grants = []
                    $scope.itemCount = 0

                    for (const i in $scope.currentUser.privileges) {
                        const priv = $scope.currentUser.privileges[i]

                        if (priv.code === 'grant:*') {
                            PrivilegeService1.GetAllPrivileges().then(function (privileges) {
                                $scope.grants = privileges
                            })
                            break
                        }

                        if (priv.code.indexOf('grant:') !== -1) {
                            priv.code = priv.code.replace('grant:', '')
                            $scope.grants.push(priv)
                        }
                    }

                    $scope.users = []

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,username,fname,lname,email',
                        order: 'id',
                        search: null
                    }

                    $scope.updating = false
                    $scope.pendingUpdate = 0

                    $scope.checkUpdated = function () {
                        if ($scope.pendingUpdate <= 0) {
                            $scope.updated()
                        } else {
                            $timeout($scope.checkUpdated, 10)
                        }
                    }

                    $scope.getFilter = function () {
                        let filter = null
                        const filters = []

                        if ($scope.listService.search != null && $scope.listService.search !== '') {
                            const val = '%' + $scope.listService.search + '%'
                            filters.push({
                                left: {
                                    column: 'username',
                                    operator: 'like',
                                    value: val
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'email',
                                        operator: 'like',
                                        value: val
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'fname',
                                            operator: 'like',
                                            value: val
                                        },
                                        operator: 'or',
                                        right: {
                                            column: 'lname',
                                            operator: 'like',
                                            value: val
                                        }
                                    }
                                }
                            })
                        }

                        const addRightmost = function (filter, val) {
                            if (filter.right != null) addRightmost(filter.right, val)
                            filter.right = val
                        }

                        for (let i = 0; i < filters.length; i++) {
                            if (filter == null) {
                                if (filters.length > 1) {
                                    filter = {
                                        left: filters[i],
                                        operator: 'and',
                                        right: null
                                    }
                                } else {
                                    filter = filters[i]
                                    break
                                }
                            } else if (i === filters.length - 1) {
                                addRightmost(filter, filters[i])
                            } else {
                                addRightmost(filter, {
                                    left: filters[i],
                                    operator: 'and',
                                    right: null
                                })
                            }
                        }

                        return filter
                    }

                    $scope.getUsers = function () {
                        const filter = $scope.getFilter()
                        const offset = ($scope.listService.page - 1) * $scope.listService.pageSize

                        return UserService1.ListUsers(
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter
                        )
                    }

                    $scope.getUsersCount = function () {
                        const filter = $scope.getFilter()

                        return UserService1.CountUsers(filter)
                    }

                    $scope.updated = function () {
                        $scope.getUsersCount().then(function (data) {
                            $scope.itemCount = data

                            $scope.getUsers().then(function (data) {
                                $scope.users = data
                                //$scope.resetForms();
                                $scope.updating = false
                                $scope.pendingUpdate = 0
                            })
                        })
                    }

                    $scope.refresh = function () {
                        $scope.updating = true
                        $scope.updated()
                    }

                    $scope.refresh()

                    $scope.openGrantUser = function (user, grants) {
                        $modal.open({
                            templateUrl: 'GrantUserModal.html',
                            size: 'md',
                            controller: function ($scope, $modalInstance) {
                                $scope.grantee = user
                                $scope.grantee.privileges = grants

                                $scope.updating = false
                                $scope.pendingUpdate = 0

                                $scope.checkUpdated = function () {
                                    if ($scope.pendingUpdate <= 0) {
                                        $scope.updated()
                                    } else {
                                        $timeout($scope.checkUpdated, 10)
                                    }
                                }

                                $scope.updated = function () {
                                    $scope.updating = false
                                    $scope.pendingUpdate = 0
                                }

                                for (const privilege of $scope.grantee.privileges) {
                                    privilege.selected = false
                                }

                                UserService1.GetGrantUserPrivileges($scope.grantee.id).then(function (privileges) {
                                    angular.forEach(privileges, function (priv) {
                                        for (const privilege of $scope.grantee.privileges) if (priv === privilege.code) privilege.selected = true
                                    })
                                })

                                $scope.togglePrivilege = function (privilege) {
                                    $scope.updating = true
                                    $scope.pendingUpdate = 1

                                    if (privilege.selected) {
                                        UserService1.RevokePrivilege($scope.grantee.id, privilege.code).then(function () {
                                            privilege.selected = false
                                            $scope.pendingUpdate = 0
                                            $scope.checkUpdated()
                                        })
                                    } else {
                                        UserService1.GrantPrivilege($scope.grantee.id, privilege.code).then(function () {
                                            privilege.selected = true
                                            $scope.pendingUpdate = 0
                                            $scope.checkUpdated()
                                        })
                                    }
                                }

                                $scope.done = function () {
                                    $modalInstance.dismiss('cancel')
                                    $scope.grantee = {}
                                }
                            }
                        })
                    }
                }
            ]
        })
    }
])
