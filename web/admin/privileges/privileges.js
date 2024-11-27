'use strict';

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.privileges', {
            parent: 'admin',
            url: '/admin/privileges/',
            data: {
                access: 'admin',
            },
            templateUrl: 'admin/privileges/privileges.html',
            resolve: {
                privileges: [
                    'PrivilegeService1',
                    function (PrivilegeService1) {
                        return PrivilegeService1.GetAllPrivileges();
                    },
                ],
                systemPermissions: [
                    'PrivilegeService1',
                    function (PrivilegeService1) {
                        return PrivilegeService1.GetAllSystemPermissions();
                    },
                ],
            },
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'privileges',
                'systemPermissions',
                'PrivilegeService1',
                function ($scope, $modal, $timeout, privileges, systemPermissions, PrivilegeService1) {
                    $scope.privileges = privileges;
                    $scope.systemPermissions = systemPermissions;

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.checkUpdated = function () {
                        if ($scope.pendingUpdate <= 0) {
                            $scope.updated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.updated = function () {
                        PrivilegeService1.GetAllPrivileges().then(function (data) {
                            $scope.privileges = data;
                            $scope.resetForms();
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.resetForms = function () {};

                    $scope.openCreatePrivilege = function () {
                        var modalInstance = $modal.open({
                            templateUrl: 'CreatePrivilegeModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.privilege = {};
                                $scope.systemPermissions = systemPermissions;
                                $scope.ok = function () {
                                    $modalInstance.close($scope.privilege);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (privilege) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            PrivilegeService1.CreatePrivilege(privilege.name, privilege.code, privilege.description, privilege.icon, false).then(
                                function () {
                                    $scope.pendingUpdate -= 1;
                                },
                            );

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openEditPrivilege = function (privilege) {
                        var modalInstance = $modal.open({
                            templateUrl: 'EditPrivilegeModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.privilege = privilege;
                                $scope.systemPermissions = systemPermissions;
                                $scope.ok = function () {
                                    $modalInstance.close($scope.privilege);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (privilege) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            PrivilegeService1.UpdatePrivilegeName(privilege.id, privilege.name).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.pendingUpdate += 1;
                            PrivilegeService1.UpdatePrivilegeDescription(privilege.id, privilege.description).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.pendingUpdate += 1;
                            PrivilegeService1.UpdatePrivilegeIcon(privilege.id, privilege.icon).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openDeletePrivilege = function (privilege) {
                        var modalInstance = $modal.open({
                            templateUrl: 'DeletePrivilegeModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.privilege = privilege;
                                $scope.ok = function () {
                                    $modalInstance.close($scope.privilege);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (privilege) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            PrivilegeService1.DeletePrivilege(privilege.id).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openEnableDisablePrivilege = function (privilege) {
                        var modalInstance = $modal.open({
                            templateUrl: 'EnableDisablePrivilegeModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.privilege = privilege;
                                $scope.enable = privilege.enabled ? 'Disable' : 'Enable';
                                $scope.ok = function () {
                                    $modalInstance.close($scope.privilege);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (privilege) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            PrivilegeService1.UpdatePrivilegeEnabled(privilege.id, !privilege.enabled).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.checkUpdated();
                        });
                    };
                },
            ],
        });
    },
]);
