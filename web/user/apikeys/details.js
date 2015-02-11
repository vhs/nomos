'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.apikeys.details', {
                parent: "user",
                url: '/apikeys/:keyid',
                templateUrl: 'user/apikeys/details.html',
                resolve: {
                    key: ['$stateParams', 'ApiKeyService1', function($stateParams, ApiKeyService1) {
                        return ApiKeyService1.GetApiKey($stateParams.keyid).then(function(data) {
                            return data;
                        });
                    }]
                },
                controller: ['$state', '$scope', '$modal', 'key', 'ApiKeyService1', function($state, $scope, $modal, key, ApiKeyService1) {
                    $scope.key = key;
                    $scope.doesExpire = false;

                    $scope.setExpires = function() {
                        if ($scope.doesExpire) {
                            $scope.key.expires = "0000-00-00 00:00:00";
                        } else {
                            $scope.key.expires = new Date().format("Y-m-d H:i:s");
                            $scope.expirydate = new Date(Date.parse($scope.key.expires)).format("Y-m-d");
                            $scope.expirytime = $scope.key.expires;
                        }

                        $scope.doesExpire = !$scope.doesExpire;
                    };

                    if($scope.key.expires != "0000-00-00 00:00:00") {
                        $scope.expirydate = new Date(Date.parse($scope.key.expires)).format("Y-m-d");
                        $scope.expirytime = $scope.key.expires;
                        $scope.doesExpire = true;
                    }

                    var updateExpiry = function() {
                        var date = new Date(Date.parse($scope.expirydate));
                        var time = new Date(Date.parse($scope.expirytime));

                        $scope.key.expires = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate(),
                            time.getHours(),
                            time.getMinutes(),
                            time.getSeconds()
                        ).format("Y-m-d H:i:s");
                    };

                    $scope.datepicker = {
                        today: Date(),
                        format: "yyyy-MM-dd",
                        dateOptions: {
                            formatYear: 'yyyy',
                            startingDay: 1
                        },
                        opened: false,
                        open: function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();

                            $scope.datepicker.opened = true;
                        },
                        changed: updateExpiry
                    };
                    $scope.timepicker = {
                        changed: updateExpiry
                    };

                    $scope.save = function () {
                        ApiKeyService1.UpdateApiKey($scope.key.id, $scope.key.notes, $scope.key.expires).then(
                            function() {
                                alert("saved");
                            }
                        );
                    };

                    $scope.cancel = function () {
                        $state.go("user.apikeys");
                    };
                }]
            })
        }]
    )
;