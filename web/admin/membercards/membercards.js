'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.membercards', {
                parent: "admin",
                url: '/admin/membercards',
                templateUrl: 'admin/membercards/membercards.html',
                controller: ['$scope', 'MemberCardService1', function($scope, MemberCardService1) {
                    $scope.registerkey = "";


                    $scope.registerCard = function() {
                        MemberCardService1.RegisterGenuineCard($scope.registerkey, "blah").then(function(data){
                            alert(data);
                        });
                    };

                    $scope.issueCard = function() {
                        MemberCardService1.IssueCard($scope.issueemail, $scope.issuekey).then(function(data){
                            alert(data);
                        });
                    };

                    $scope.membercards = [];

                    $scope.showIssued = false;
                    $scope.togglePending = function(val) {
                        $scope.showIssued = val;
                        $scope.refresh();
                    };

                    $scope.listService = {
                        page: 0,
                        size: 10,
                        columns: "id,key,created,issued,active,paymentid,userid,owneremail,notes",
                        order: "issued desc",
                        search: null
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

                    $scope.getMemberCards = function() {

                        var filter = null;
                        var filters = [];

                        if ($scope.showIssued) {
                            filters.push({
                                column: "issued",
                                operator: "is not null"
                            });
                        }

                        if ($scope.listService.search != null && $scope.listService.search != "") {
                            var val = "%" + $scope.listService.search + "%";
                            filters.push({
                                left: {
                                    column: "owneremail",
                                    operator: "like",
                                    value: val
                                },
                                operator: "or",
                                right: {
                                    column: "notes",
                                    operator: "like",
                                    value: val
                                }
                            });
                        }

                        var addRightmost = function(filter, val) {
                            if (filter.right != null)
                                addRightmost(filter.right, val);
                            filter.right = val;
                        };

                        for (var i = 0; i < filters.length; i++) {
                            if (filter == null) {
                                if (filters.length > 1) {
                                    filter = {
                                        left: filters[i],
                                        operator: "and",
                                        right: null
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
                                        operator: "and",
                                        right: null
                                    });
                                }
                            }
                        }

                        return MemberCardService1.ListGenuineCards($scope.listService.page, $scope.listService.size, $scope.listService.columns, $scope.listService.order, filter);
                    };

                    $scope.updated = function() {
                        $scope.getMemberCards().then(function(data) {
                            $scope.membercards = data;
                            //$scope.resetForms();
                            $scope.updating = false;
                            $scope.pendingUpdate = 0;
                        });
                    };

                    $scope.refresh = function() {
                        $scope.updating = true;
                        $scope.updated();
                    };

                    $scope.refresh();
                }]
            });
    }]);