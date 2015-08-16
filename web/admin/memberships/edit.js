'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.memberships.edit', {
                parent: "admin",
                url: '/admin/memberships/:membershipId',
                templateUrl: 'admin/memberships/edit.html',
                resolve: {
                    membership: ['$stateParams', 'MembershipService1', function($stateParams, MembershipService1) {
                        return MembershipService1.Get($stateParams.membershipId);
                    }],
                    allPermissions: ['PrivilegeService1', function(PrivilegeService1) {
                        return PrivilegeService1.GetAllPrivileges();
                    }]
                },
                controller: ['$scope', 'membership', 'allPermissions', 'MembershipService1', 'PrivilegeService1', function($scope, membership, allPermissions, MembershipService1, PrivilegeService1) {
                    $scope.membership = membership;

                    var currentPriv = {};
                    //Build a map of selected privileges
                    angular.forEach(membership.privileges, function(membershipPriv){
                        currentPriv[membershipPriv.code] = membershipPriv;
                    });
                   
                    $scope.privileges = [];
                    angular.forEach(allPermissions, function(privilege){
                        privilege.selected = angular.isDefined(currentPriv[privilege.code]);
                        $scope.privileges.push(privilege);
                    });


                    $scope.togglePrivilege = function(privilege){
                        privilege.selected = !privilege.selected;
                        $scope.privilegeDirty = true;
                    };

                    $scope.updatePrivileges = function(){
                        var codes = [];
                        angular.forEach($scope.privileges, function(priv){
                            if (priv.selected){
                                codes.push(priv.code);
                            }
                        });

                        PrivilegeService1.PutMembershipPrivileges(membership.id, codes).then(function(){
                            $scope.privilegeDirty = false;
                        });
                    };

                    $scope.update = function() {
                        MembershipService1.Update($scope.membership.id, $scope.membership);
                    };

                    $scope.toggleActive = function() {
                        $scope.membership.active = !$scope.membership.active;
                        MembershipService1.UpdateActive($scope.membership.id, $scope.membership.active);
                    };

                    $scope.toggleTrial = function() {
                        $scope.membership.trial = !$scope.membership.trial;
                        MembershipService1.UpdateTrial($scope.membership.id, $scope.membership.trial);
                    };

                    $scope.toggleRecurring = function() {
                        $scope.membership.recurring = !$scope.membership.recurring;
                        MembershipService1.UpdateRecurring($scope.membership.id, $scope.membership.recurring);
                    };

                    $scope.togglePrivate = function() {
                        $scope.membership.private = !$scope.membership.private;
                        MembershipService1.UpdatePrivate($scope.membership.id, $scope.membership.private);
                    };
                }]
            });
    }]);