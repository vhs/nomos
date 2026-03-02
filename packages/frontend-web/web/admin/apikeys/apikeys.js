'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.apikeys', {
            parent: 'admin',
            url: '/admin/apikeys/',
            templateUrl: 'admin/apikeys/apikeys.html',
            resolve: {
                keys: [
                    'ApiKeyService1',
                    function (ApiKeyService1) {
                        return ApiKeyService1.GetSystemApiKeys().then(function (data) {
                            return data
                        })
                    }
                ]
            },
            controller: [
                '$scope',
                '$modal',
                'keys',
                'ApiKeyService1',
                function ($scope, $modal, keys, ApiKeyService1) {
                    $scope.keys = keys

                    $scope.openGenerateKey = function () {
                        const modalInstance = $modal.open({
                            templateUrl: 'GenerateApiKeyModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.ok = function () {
                                    $modalInstance.close($scope.newApiKeyNotes)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (newApiKeyNotes) {
                            ApiKeyService1.GenerateSystemApiKey(newApiKeyNotes).then(function (data) {
                                $scope.keys.push(data)
                            })
                        })
                    }

                    $scope.openDeleteApiKey = function (key) {
                        const modalInstance = $modal.open({
                            templateUrl: 'DeleteApiKeyModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.key = key
                                $scope.ok = function () {
                                    $modalInstance.close($scope.key)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (key) {
                            ApiKeyService1.DeleteApiKey(key.id).then(function (_data) {
                                for (let i = 0; i < $scope.keys.length; i++) {
                                    if ($scope.keys[i].id === key.id) $scope.keys.splice(i, 1)
                                }
                            })
                        })
                    }
                }
            ]
        })
    }
])
