'use strict';

angular.module('mmpApp.user').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('user.apikeys', {
            parent: 'user',
            url: '/apikeys/',
            templateUrl: 'user/apikeys/apikeys.html',
            resolve: {
                keys: [
                    'currentUser',
                    'ApiKeyService1',
                    function (currentUser, ApiKeyService1) {
                        return ApiKeyService1.GetUserApiKeys(currentUser.id).then(function (data) {
                            return data;
                        });
                    },
                ],
            },
            controller: [
                '$scope',
                '$modal',
                'keys',
                'ApiKeyService1',
                function ($scope, $modal, keys, ApiKeyService1) {
                    $scope.keys = keys;

                    $scope.openGenerateKey = function () {
                        const modalInstance = $modal.open({
                            templateUrl: 'GenerateUserApiKeyModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.ok = function () {
                                    $modalInstance.close($scope.newApiKeyNotes);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (newApiKeyNotes) {
                            ApiKeyService1.GenerateUserApiKey($scope.currentUser.id, newApiKeyNotes).then(function (data) {
                                $scope.keys.push(data);
                            });
                        });
                    };

                    $scope.openDeleteApiKey = function (key) {
                        const modalInstance = $modal.open({
                            templateUrl: 'DeleteUserApiKeyModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.key = key;
                                $scope.ok = function () {
                                    $modalInstance.close($scope.key);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (key) {
                            ApiKeyService1.DeleteApiKey(key.id).then(function (data) {
                                for (let i = 0; i < $scope.keys.length; i++) {
                                    if ($scope.keys[i].id == key.id) $scope.keys.splice(i, 1);
                                }
                            });
                        });
                    };
                },
            ],
        });
    },
]);
