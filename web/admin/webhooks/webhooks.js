'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.webhooks', {
                parent: "admin",
                url: '/admin/webhooks/',
                templateUrl: 'admin/webhooks/webhooks.html',
                controller: ['$scope', '$modal', '$timeout', 'WebHookService1', 'PrivilegeService1', 'EventService1', function($scope, $modal, $timeout, WebHookService1, PrivilegeService1, EventService1) {
                    $scope.webhooks = [];

                    $scope.listService = {
                        page: 0,
                        size: 10,
                        columns: "id,name,description,enabled,userid,url,translation,headers,method,eventid",
                        order: "id",
                        search: null,
                        filter: null
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

                    $scope.load = function() {

                        $scope.listService.filter = null;
                        var filters = [];

                        if ($scope.listService.search != null && $scope.listService.search != "") {
                            var val = "%" + $scope.listService.search + "%";
                            filters.push({
                                left: {
                                    column: "name",
                                    operator: "like",
                                    value: val
                                },
                                operator: "or",
                                right: {
                                    left: {
                                        column: "description",
                                        operator: "like",
                                        value: val
                                    },
                                    operator: "or",
                                    right: {
                                        left: {
                                            column: "url",
                                            operator: "like",
                                            value: val
                                        },
                                        operator: "or",
                                        right: {
                                            left: {
                                                column: "translation",
                                                operator: "like",
                                                value: val
                                            },
                                            operator: "or",
                                            right: {
                                                left: {
                                                    column: "headers",
                                                    operator: "like",
                                                    value: val
                                                },
                                                operator: "or",
                                                right: {
                                                    column: "method",
                                                    operator: "like",
                                                    value: val
                                                }
                                            }
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
                            if ($scope.listService.filter == null) {
                                if (filters.length > 1) {
                                    $scope.listService.filter = {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    };
                                } else {
                                    $scope.listService.filter = filters[i];
                                    break;
                                }
                            } else {
                                if (i == filters.length - 1) {
                                    addRightmost($scope.listService.filter, filters[i]);
                                } else {
                                    addRightmost($scope.listService.filter, {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
                                    });
                                }
                            }
                        }

                        return WebHookService1.ListHooks($scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, $scope.listService.filter);
                    };

                    $scope.updated = function() {
                        $scope.load().then(function(data) {
                            $scope.webhooks = data;
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.refresh = function() {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();

                    $scope.openCreate = function () {

                        var modalInstance = $modal.open({
                            templateUrl: 'CreateModal.html',
                            size: "lg",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = {};
                                $scope.events = [];
                                var currentEvent = {};

                                $scope.ok = function () {
                                    $modalInstance.close({obj: $scope.object, events: $scope.events});
                                };

                                //Build a map of selected events
                                //currentEvent[object.eventid] = object.eventid;

                                var p = EventService1.GetAccessibleEvents();
                                p.then(function(events){
                                    $scope.events = [];
                                    angular.forEach(events, function(event){
                                        event.selected = angular.isDefined(currentEvent[event.id]);
                                        $scope.events.push(event);
                                    });
                                });

                                $scope.selectEvent = function(event){
                                    event.selected = !event.selected;
                                    $scope.eventDirty = true;
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (arg) {
                            var object = arg.obj;
                            var events = arg.events;
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            var selectedEventid = null;
                            angular.forEach(events, function(event){
                                if (event.selected){
                                    selectedEventid = event.id;
                                }
                            });

                            $scope.pendingUpdate += 1;
                            WebHookService1.CreateHook(object.name, object.description, false, object.url, object.translation, object.headers, object.method, selectedEventid)
                                .then(function() { $scope.pendingUpdate -= 1; });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openEdit = function (object) {

                        var modalInstance = $modal.open({
                            templateUrl: 'EditModal.html',
                            size: "lg",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object;
                                $scope.privileges = [];
                                $scope.events = [];
                                var currentPriv = {};
                                var currentEvent = {};

                                $scope.ok = function () {
                                    $modalInstance.close({obj: $scope.object, privs: $scope.privileges, events: $scope.events});
                                };

                                //Build a map of selected privileges
                                angular.forEach(object.privileges, function(prefPriv){
                                    currentPriv[prefPriv.code] = prefPriv;
                                });
                                var promise = PrivilegeService1.GetAllPrivileges();
                                promise.then(function(privileges){
                                    $scope.privileges = [];
                                    angular.forEach(privileges, function(privilege){
                                        privilege.selected = angular.isDefined(currentPriv[privilege.code]);
                                        $scope.privileges.push(privilege);
                                    });
                                });

                                $scope.togglePrivilege = function(privilege){
                                    privilege.selected = !privilege.selected;
                                    $scope.privilegeDirty = true;
                                };

                                //Build a map of selected events
                                currentEvent[object.eventid] = object.eventid;

                                var p = EventService1.GetAccessibleEvents();
                                p.then(function(events){
                                    $scope.events = [];
                                    angular.forEach(events, function(event){
                                        event.selected = angular.isDefined(currentEvent[event.id]);
                                        $scope.events.push(event);
                                    });
                                });

                                $scope.selectEvent = function(event){
                                    angular.forEach($scope.events, function(evt) {
                                        evt.selected = false;
                                    });
                                    event.selected = !event.selected;
                                    $scope.eventDirty = true;
                                };


                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (arg) {
                            var object = arg.obj;
                            var privileges = arg.privs;
                            var events = arg.events;
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            var selectedEventid = null;
                            angular.forEach(events, function(event){
                                if (event.selected){
                                    selectedEventid = event.id;
                                }
                            });

                            $scope.pendingUpdate += 1;
                            WebHookService1.UpdateHook(object.id, object.name, object.description, object.enabled, object.url, object.translation, object.headers, object.method, selectedEventid)
                                .then(function() { $scope.checkUpdated(); $scope.pendingUpdate -= 1; });

                            var codes = [];
                            angular.forEach(privileges, function(priv){
                                if (priv.selected){
                                    codes.push(priv.code);
                                }
                            });

                            $scope.updating = true;
                            $scope.pendingUpdate += 1;
                            WebHookService1.PutHookPrivileges(object.id, codes).then(function(){
                                $scope.privilegeDirty = false;

                                $scope.checkUpdated();
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openDelete = function (object) {

                        var modalInstance = $modal.open({
                            templateUrl: 'DeleteModal.html',
                            size: "sm",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object;
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (object) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            WebHookService1.DeleteHook(object.id)
                                .then(function() { $scope.pendingUpdate -= 1; });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openEnableDisable = function (object) {

                        var modalInstance = $modal.open({
                            templateUrl: 'EnableDisableModal.html',
                            size: "sm",
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object;
                                $scope.enable = object.enabled ? "Disable" : "Enable";
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            }
                        });

                        modalInstance.result.then(function (object) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            WebHookService1.EnableHook(object.id, !object.enabled)
                                .then(function() { $scope.pendingUpdate -= 1; });

                            $scope.checkUpdated();
                        });
                    };
                }]
            });
    }]);