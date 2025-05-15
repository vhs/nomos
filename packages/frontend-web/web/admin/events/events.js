'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.events', {
            parent: 'admin',
            url: '/events/',
            templateUrl: 'admin/events/events.html',
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'EventService1',
                'PrivilegeService1',
                function ($scope, $modal, $timeout, EventService1, PrivilegeService1) {
                    $scope.events = []
                    $scope.itemCount = 0

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,name,domain,event,description,enabled,privileges',
                        order: 'domain',
                        search: null,
                        filter: null
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
                                    column: 'name',
                                    operator: 'like',
                                    value: val
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'domain',
                                        operator: 'like',
                                        value: val
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'event',
                                            operator: 'like',
                                            value: val
                                        },
                                        operator: 'or',
                                        right: {
                                            column: 'description',
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

                    $scope.getEvents = function () {
                        const filter = $scope.getFilter()
                        const offset = ($scope.listService.page - 1) * $scope.listService.pageSize

                        return EventService1.ListEvents(
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter
                        )
                    }

                    $scope.getEventsCount = function () {
                        const filter = $scope.getFilter()

                        return EventService1.CountEvents(filter)
                    }

                    $scope.updated = function () {
                        $scope.getEventsCount().then(function (data) {
                            $scope.itemCount = data

                            $scope.getEvents().then(function (data) {
                                $scope.events = data
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

                    $scope.openCreate = function () {
                        const modalInstance = $modal.open({
                            templateUrl: 'CreateModal.html',
                            size: 'lg',
                            controller: function ($scope, $modalInstance) {
                                $scope.object = {}
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (object) {
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            EventService1.CreateEvent(object.name, object.domain, object.event, object.description, false).then(function () {
                                $scope.pendingUpdate -= 1
                            })

                            $scope.checkUpdated()
                        })
                    }

                    $scope.openEdit = function (object) {
                        const modalInstance = $modal.open({
                            templateUrl: 'EditModal.html',
                            size: 'lg',
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object
                                $scope.privileges = []
                                const currentPriv = {}

                                $scope.ok = function () {
                                    $modalInstance.close({ pref: $scope.object, privs: $scope.privileges })
                                }

                                //Build a map of selected privileges
                                angular.forEach(object.privileges, function (prefPriv) {
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
                            const object = arg.pref
                            const privileges = arg.privs
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            EventService1.UpdateEvent(object.id, object.name, object.domain, object.event, object.description, object.enabled).then(
                                function () {
                                    $scope.checkUpdated()
                                    $scope.pendingUpdate -= 1
                                }
                            )

                            const codes = []
                            angular.forEach(privileges, function (priv) {
                                if (priv.selected) {
                                    codes.push(priv.code)
                                }
                            })

                            $scope.updating = true
                            $scope.pendingUpdate += 1
                            EventService1.PutEventPrivileges(object.id, codes).then(function () {
                                $scope.privilegeDirty = false

                                $scope.checkUpdated()
                                $scope.pendingUpdate -= 1
                            })

                            $scope.checkUpdated()
                        })
                    }

                    $scope.openDelete = function (object) {
                        const modalInstance = $modal.open({
                            templateUrl: 'DeleteModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (object) {
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            EventService1.DeleteEvent(object.id).then(function () {
                                $scope.pendingUpdate -= 1
                            })

                            $scope.checkUpdated()
                        })
                    }

                    $scope.openEnableDisable = function (object) {
                        const modalInstance = $modal.open({
                            templateUrl: 'EnableDisableModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.object = object
                                $scope.enable = object.enabled ? 'Disable' : 'Enable'
                                $scope.ok = function () {
                                    $modalInstance.close($scope.object)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (object) {
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            EventService1.EnableEvent(object.id, !object.enabled).then(function () {
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
