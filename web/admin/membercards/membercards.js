'use strict'

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.membercards', {
            parent: 'admin',
            url: '/admin/membercards',
            templateUrl: 'admin/membercards/membercards.html',
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'MemberCardService1',
                'PaymentService1',
                function ($scope, $modal, $timeout, MemberCardService1, PaymentService1) {
                    $scope.registerkey = ''

                    $scope.registerCard = function () {
                        MemberCardService1.RegisterGenuineCard($scope.registerkey, 'blah').then(function (data) {
                            if (data && data.key) {
                                alert('Card registered successfully!\n\n' + data.key)
                            } else {
                                alert(data)
                            }

                            $scope.refresh()
                        })
                    }

                    $scope.issueCard = function () {
                        MemberCardService1.IssueCard($scope.issueemail, $scope.issuekey).then(function (data) {
                            if (data && data.owneremail) {
                                alert('Card successfully issued to ' + data.owneremail)
                            } else {
                                alert(data)
                            }

                            $scope.refresh()
                        })
                    }

                    $scope.membercards = []
                    $scope.payments = []

                    $scope.showIssued = false
                    $scope.togglePending = function (val) {
                        $scope.showIssued = val
                        $scope.refresh()
                    }

                    $scope.cardList = {
                        page: 0,
                        size: 10,
                        columns: 'id,key,created,issued,active,paymentid,userid,owneremail,notes',
                        order: 'created desc',
                        search: null
                    }

                    $scope.paymentList = {
                        page: 0,
                        size: 10,
                        columns: 'id,txn_id,status,user_id,payer_fname,payer_lname,payer_email,date,pp,item_name,item_number,rate_amount,currency',
                        order: 'date desc',
                        search: null
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

                    $scope.getMemberCards = function () {
                        let filter = null
                        const filters = []

                        if ($scope.showIssued) {
                            filters.push({
                                column: 'issued',
                                operator: 'is not null'
                            })
                        }

                        if ($scope.cardList.search != null && $scope.cardList.search !== '') {
                            const val = '%' + $scope.cardList.search + '%'
                            filters.push({
                                left: {
                                    column: 'owneremail',
                                    operator: 'like',
                                    value: val
                                },
                                operator: 'or',
                                right: {
                                    column: 'notes',
                                    operator: 'like',
                                    value: val
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
                            } else {
                                if (i === filters.length - 1) {
                                    addRightmost(filter, filters[i])
                                } else {
                                    addRightmost(filter, {
                                        left: filters[i],
                                        operator: 'and',
                                        right: null
                                    })
                                }
                            }
                        }

                        return MemberCardService1.ListGenuineCards(
                            $scope.cardList.page,
                            $scope.cardList.size,
                            $scope.cardList.columns,
                            $scope.cardList.order,
                            filter
                        )
                    }

                    $scope.getPayments = function () {
                        let filter = null
                        const filters = []

                        filters.push({
                            column: 'item_number',
                            operator: '=',
                            value: 'vhs_card_2015'
                        })

                        if ($scope.showPending) {
                            filters.push({
                                column: 'status',
                                operator: '=',
                                value: '0'
                            })
                        }

                        if ($scope.showOrphaned) {
                            filters.push({
                                left: {
                                    column: 'user_id',
                                    operator: '=',
                                    value: '0'
                                },
                                operator: 'and',
                                right: {
                                    column: 'status',
                                    operator: '=',
                                    value: '1'
                                }
                            })
                        }

                        if ($scope.paymentList.search != null && $scope.paymentList.search !== '') {
                            const val = '%' + $scope.paymentList.search + '%'
                            filters.push({
                                left: {
                                    column: 'payer_email',
                                    operator: 'like',
                                    value: val
                                },
                                operator: 'or',
                                right: {
                                    left: {
                                        column: 'payer_fname',
                                        operator: 'like',
                                        value: val
                                    },
                                    operator: 'or',
                                    right: {
                                        left: {
                                            column: 'payer_lname',
                                            operator: 'like',
                                            value: val
                                        },
                                        operator: 'or',
                                        right: {
                                            column: 'txn_id',
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
                            } else {
                                if (i === filters.length - 1) {
                                    addRightmost(filter, filters[i])
                                } else {
                                    addRightmost(filter, {
                                        left: filters[i],
                                        operator: 'and',
                                        right: null
                                    })
                                }
                            }
                        }

                        return PaymentService1.ListPayments(
                            $scope.paymentList.page,
                            $scope.paymentList.size,
                            $scope.paymentList.columns,
                            $scope.paymentList.order,
                            filter
                        )
                    }

                    $scope.updated = function () {
                        $scope
                            .getMemberCards()
                            .then(function (data) {
                                $scope.membercards = data
                                //$scope.resetForms();
                                $scope.updating = false
                                $scope.pendingUpdate = 0
                            })
                            .then(function () {
                                return $scope.getPayments().then(function (data) {
                                    $scope.payments = data
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

                    $scope.openEnableDisableCard = function (card) {
                        const modalInstance = $modal.open({
                            templateUrl: 'EnableDisableCardModal.html',
                            size: 'sm',
                            controller: function ($scope, $modalInstance) {
                                $scope.card = card
                                $scope.active = card.active ? 'Deactivate' : 'Activate'
                                $scope.ok = function () {
                                    $modalInstance.close($scope.card)
                                }

                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel')
                                }
                            }
                        })

                        modalInstance.result.then(function (card) {
                            $scope.updating = true
                            $scope.pendingUpdate = 0

                            $scope.pendingUpdate += 1
                            MemberCardService1.UpdateGenuineCardActive(card.key, !card.active).then(function () {
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
