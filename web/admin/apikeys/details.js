'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.apikeys.details', {
            parent: 'admin',
            url: '/admin/apikeys/:keyid',
            templateUrl: 'admin/apikeys/details.html',
            resolve: {
                key: [
                    '$stateParams',
                    'ApiKeyService1',
                    function ($stateParams, ApiKeyService1) {
                        return ApiKeyService1.GetApiKey($stateParams.keyid).then(function (data) {
                            return data
                        })
                    }
                ]
            },
            controller: [
                '$state',
                '$scope',
                '$modal',
                'currentUser',
                'key',
                'ApiKeyService1',
                'PrivilegeService1',
                function ($state, $scope, $modal, currentUser, key, ApiKeyService1, PrivilegeService1) {
                    $scope.key = key
                    $scope.doesExpire = false

                    $scope.setExpires = function () {
                        if ($scope.doesExpire) {
                            $scope.key.expires = null //"0000-00-00 00:00:00";
                        } else {
                            $scope.key.expires = new Date().format('Y-m-d H:i:s')
                            $scope.expirydate = new Date(Date.parse($scope.key.expires)).format('Y-m-d')
                            $scope.expirytime = $scope.key.expires
                        }

                        $scope.doesExpire = !$scope.doesExpire
                    }

                    if ($scope.key.expires !== '0000-00-00 00:00:00' && $scope.key.expires != null) {
                        $scope.expirydate = new Date(Date.parse($scope.key.expires)).format('Y-m-d')
                        $scope.expirytime = $scope.key.expires
                        $scope.doesExpire = true
                    }

                    const updateExpiry = function () {
                        const date = new Date(Date.parse($scope.expirydate))
                        const time = new Date(Date.parse($scope.expirytime))

                        $scope.key.expires = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate(),
                            time.getHours(),
                            time.getMinutes(),
                            time.getSeconds()
                        ).format('Y-m-d H:i:s')
                    }

                    $scope.datepicker = {
                        today: Date(),
                        format: 'yyyy-MM-dd',
                        dateOptions: {
                            formatYear: 'yyyy',
                            startingDay: 1
                        },
                        opened: false,
                        open: function ($event) {
                            $event.preventDefault()
                            $event.stopPropagation()

                            $scope.datepicker.opened = true
                        },
                        changed: updateExpiry
                    }
                    $scope.timepicker = {
                        changed: updateExpiry
                    }

                    const currentPriv = {}
                    //Build a map of selected privileges
                    angular.forEach(key.privileges, function (keyPriv) {
                        currentPriv[keyPriv.code] = keyPriv
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

                    $scope.updatePrivileges = function () {
                        const codes = []
                        angular.forEach($scope.privileges, function (priv) {
                            if (priv.selected) {
                                codes.push(priv.code)
                            }
                        })

                        ApiKeyService1.PutApiKeyPrivileges(key.id, codes).then(function () {
                            $scope.privilegeDirty = false
                        })
                    }

                    $scope.save = function () {
                        ApiKeyService1.UpdateApiKey($scope.key.id, $scope.key.notes, $scope.key.expires).then(function () {
                            alert('saved')
                        })
                    }

                    $scope.cancel = function () {
                        $state.go('admin.apikeys')
                    }
                }
            ]
        })
    }
])
