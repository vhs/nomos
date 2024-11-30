'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.systempreferences', {
            parent: 'admin',
            url: '/admin/systempreferences/',
            data: {
                access: 'admin'
            },
            templateUrl: 'admin/systempreferences/systempreferences.html',
            resolve: {
                systempreferences: [
                    'PreferenceService1',
                    function (PreferenceService1) {
                        return PreferenceService1.GetAllSystemPreferences()
                    }
                ]
            },
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'systempreferences',
                'PreferenceService1',
                'PrivilegeService1',
                function ($scope, $modal, $timeout, systempreferences, PreferenceService1, PrivilegeService1) {
                    $scope.systempreferences = systempreferences

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
                        PreferenceService1.GetAllSystemPreferences().then(function (data) {
                            $scope.systempreferences = data
                            $scope.resetForms()
                            $scope.updating = false
                            $scope.pendingUpdate = 0
                        })
                    }

                    $scope.resetForms = function () {}

                    $scope.openCreatePreference = function () {
                        const modalInstance = $modal.open({
                            templateUrl: 'CreatePreferenceModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.systempreference = {}
                                $scope.ok = function () {
                                    $modalInstance.close($scope.systempreference)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (systempreference) {
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            PreferenceService1.PutSystemPreference(systempreference.key, systempreference.value, false, systempreference.notes).then(
                                function () {
                                    $scope.pendingUpdate -= 1
                                }
                            )

                            $scope.checkUpdated()
                        })
                    }

                    $scope.openEditPreference = function (systempreference) {
                        const modalInstance = $modal.open({
                            templateUrl: 'EditPreferenceModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.systempreference = systempreference
                                $scope.privileges = []
                                const currentPriv = {}

                                $scope.ok = function () {
                                    $modalInstance.close({ pref: $scope.systempreference, privs: $scope.privileges })
                                }

                                //Build a map of selected privileges
                                angular.forEach(systempreference.privileges, function (prefPriv) {
                                    currentPriv[prefPriv.code] = prefPriv
                                })
                                const promise = PrivilegeService1.GetAllPrivileges()
                                promise.then(function (privileges) {
                                    $scope.privileges = []
                                    angular.forEach(privileges, function (privilege) {
                                        privilege.selected = angular.isDefined(currentPriv[privilege.code])
                                        $scope.privileges.push(privilege)
                                    })
                                })

                                $scope.togglePrivilege = function (privilege) {
                                    privilege.selected = !privilege.selected
                                    $scope.privilegeDirty = true
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (arg) {
                            const systempreference = arg.pref
                            const privileges = arg.privs
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            PreferenceService1.UpdateSystemPreference(
                                systempreference.id,
                                systempreference.key,
                                systempreference.value,
                                systempreference.enabled,
                                systempreference.notes
                            ).then(function () {
                                $scope.checkUpdated()
                                $scope.pendingUpdate -= 1
                            })

                            const codes = []
                            angular.forEach(privileges, function (priv) {
                                if (priv.selected) {
                                    codes.push(priv.code)
                                }
                            })

                            $scope.updating = true
                            $scope.pendingUpdate += 1
                            PreferenceService1.PutSystemPreferencePrivileges(systempreference.id, codes).then(function () {
                                $scope.privilegeDirty = false

                                $scope.checkUpdated()
                                $scope.pendingUpdate -= 1
                            })

                            $scope.checkUpdated()
                        })
                    }

                    $scope.openDeletePreference = function (systempreference) {
                        const modalInstance = $modal.open({
                            templateUrl: 'DeletePreferenceModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.systempreference = systempreference
                                $scope.ok = function () {
                                    $modalInstance.close($scope.systempreference)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (systempreference) {
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            PreferenceService1.DeleteSystemPreference(systempreference.key).then(function () {
                                $scope.pendingUpdate -= 1
                            })

                            $scope.checkUpdated()
                        })
                    }

                    $scope.openEnableDisablePreference = function (systempreference) {
                        const modalInstance = $modal.open({
                            templateUrl: 'EnableDisablePreferenceModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.systempreference = systempreference
                                $scope.enable = systempreference.enabled ? 'Disable' : 'Enable'
                                $scope.ok = function () {
                                    $modalInstance.close($scope.systempreference)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (systempreference) {
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            PreferenceService1.UpdateSystemPreferenceEnabled(systempreference.key, !systempreference.enabled).then(function () {
                                $scope.pendingUpdate -= 1
                            })

                            $scope.checkUpdated()
                        })
                    }
                }
            ]
        })
    }
])
