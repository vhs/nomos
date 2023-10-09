'use strict';

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.email', {
            parent: 'admin',
            url: '/admin/email',
            templateUrl: 'admin/email/email.html',
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'EmailService1',
                function ($scope, $modal, $timeout, EmailService1) {
                    $scope.templates = [];
                    $scope.itemCount = 0;

                    $scope.listService = {
                        page: 1,
                        pageSize: 10,
                        allowedPageSizes: [10, 20, 50, 100, 1000, 10000],
                        columns: 'id,name,code,subject,help,body,html',
                        order: 'id desc',
                        search: null,
                    };

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.checkUpdated = function () {
                        if ($scope.pendingUpdate <= 0) {
                            $scope.updated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.getFilter = function () {
                        var filter = null;
                        var filters = [];

                        if ($scope.listService.search != null && $scope.listService.search != '') {
                            var val = '%' + $scope.listService.search + '%';
                            filters.push({
                                left: {
                                    column: 'name',
                                    operator: 'like',
                                    value: val,
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'code',
                                        operator: 'like',
                                        value: val,
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'subject',
                                            operator: 'like',
                                            value: val,
                                        },
                                        operator: 'or',
                                        right: {
                                            left: {
                                                column: 'body',
                                                operator: 'like',
                                                value: val,
                                            },
                                            operator: 'or',
                                            right: {
                                                column: 'html',
                                                operator: 'like',
                                                value: val,
                                            },
                                        },
                                    },
                                },
                            });
                        }

                        var addRightmost = function (filter, val) {
                            if (filter.right != null) addRightmost(filter.right, val);
                            filter.right = val;
                        };

                        for (var i = 0; i < filters.length; i++) {
                            if (filter == null) {
                                if (filters.length > 1) {
                                    filter = {
                                        left: filters[i],
                                        operator: 'and',
                                        right: null,
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
                                        operator: 'and',
                                        right: null,
                                    });
                                }
                            }
                        }

                        return filter;
                        //return EmailService1.ListTemplates($scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, filter);
                    };

                    $scope.getTemplates = function () {
                        var filter = $scope.getFilter();
                        var offset = ($scope.listService.page - 1) * $scope.listService.pageSize;

                        return EmailService1.ListTemplates(
                            offset,
                            $scope.listService.pageSize,
                            $scope.listService.columns,
                            $scope.listService.order,
                            filter,
                        );
                    };

                    $scope.getTemplatesCount = function () {
                        var filter = $scope.getFilter();

                        return EmailService1.CountTemplates(filter);
                    };

                    $scope.updated = function () {
                        $scope.getTemplatesCount().then(function (data) {
                            $scope.itemCount = data;

                            $scope.getTemplates().then(function (data) {
                                $scope.templates = data;
                                //$scope.resetForms();
                                $scope.updating = false;
                                $scope.pendingUpdate = 0;
                            });
                        });
                    };

                    $scope.refresh = function () {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();

                    $scope.openCreateTemplate = function () {
                        var modalInstance = $modal.open({
                            templateUrl: 'CreateTemplateModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.template = {};
                                $scope.ok = function () {
                                    $modalInstance.close($scope.template);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (template) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            EmailService1.PutTemplate(
                                template.name,
                                template.code,
                                template.subject,
                                template.help,
                                template.body,
                                template.html,
                            ).then(function () {
                                $scope.pendingUpdate -= 1;
                                $scope.checkUpdated();
                            });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openEditTemplate = function (template) {
                        var modalInstance = $modal.open({
                            templateUrl: 'EditTemplateModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.template = template;

                                $scope.ok = function () {
                                    $modalInstance.close({ template: $scope.template });
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (arg) {
                            var template = arg.template;

                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            EmailService1.PutTemplate(
                                template.name,
                                template.code,
                                template.subject,
                                template.help,
                                template.body,
                                template.html,
                            ).then(function () {
                                $scope.pendingUpdate -= 1;
                                $scope.checkUpdated();
                            });

                            $scope.checkUpdated();
                        });
                    };

                    $scope.openDeleteTemplate = function (template) {
                        var modalInstance = $modal.open({
                            templateUrl: 'DeleteTemplateModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.template = template;
                                $scope.ok = function () {
                                    $modalInstance.close($scope.template);
                                };

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                        });

                        modalInstance.result.then(function (template) {
                            $scope.updating = true;
                            $scope.pendingUpdate = 0;

                            $scope.pendingUpdate += 1;
                            EmailService1.DeleteTemplate(template.id).then(function () {
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
