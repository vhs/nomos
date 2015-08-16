'use strict';

angular
    .module('mmpApp.admin')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.profile', {
                parent: "admin",
                url: '/users/:userId',
                data: {
                    access: "admin"
                },
                templateUrl: 'admin/users/profile.html',
                resolve: {
                    profile: ['$stateParams', 'UserService1', function($stateParams, UserService1) {
                        return UserService1.GetUser($stateParams.userId);
                    }]
                },
                controller: ['$scope', '$modal', '$timeout', 'profile', 'PrivilegeService1', 'UserService1', 'MembershipService1', function($scope, $modal, $timeout, profile, PrivilegeService1, UserService1, MembershipService1) {
                    $scope.profile = profile;
                    var currentPriv = {};
                    var currentMembership = profile.membership;

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.passwordsMatch = true;

                    $scope.generatePin = function() {
                        PinService1.GeneratePin($scope.currentUser.id).then(function(response){
                            var split = response.key.split("|");
                            response.pinid = split[0];
                            response.pin = split[1];
                            $scope.profile.keys.push(response);
                        });
                    };

                    $scope.changePassword = function(isValid) {
                        UserService1.UpdatePassword($scope.currentUser.id, $scope.newPassword).then(function(response) {
                            alert('Password was changed successfully.');
                            $('#passwordChange').modal('hide'); // forgive me spaghetti monster, for I have sinned. I have done view logic in my controller.
                            $scope.resetPasswordForm();
                        }, function(err) {
                            alert('We encountered an error trying to update your password.');
                        });
                    };

                    $scope.comparePasswords = function() {
                        $scope.passwordsMatch = ($scope.newPassword == $scope.rePassword);
                    };

                    $scope.resetPasswordForm = function() {
                        $scope.changePasswordForm.$setPristine();
                        $scope.newPassword = "";
                        $scope.rePassword = "";
                    };

                    $scope.resetProfileForm = function() {
                        $scope.profileForm.$setPristine();
                        $scope.profile = angular.copy($scope.currentUser);
                    };

                    $scope.updateProfile = function() {
                        $scope.updating = true;
                        $scope.pendingUpdate = 1;

                        UserService1.UpdateUsername(
                            $scope.currentUser.id,
                            $scope.profile.username
                        ).then(function() {

                                if ($scope.currentUser.hasPrivilege("full-profile")) {
                                    $scope.pendingUpdate += 1;
                                    UserService1.UpdateName(
                                        $scope.currentUser.id,
                                        $scope.profile.fname,
                                        $scope.profile.lname
                                    ).then(function() { $scope.pendingUpdate -= 1; });

                                    $scope.pendingUpdate += 1;
                                    UserService1.UpdateEmail(
                                        $scope.currentUser.id,
                                        $scope.profile.email
                                    ).then(function() { $scope.pendingUpdate -= 1; });
                                }

                                $scope.pendingUpdate += 1;
                                UserService1.UpdateNewsletter(
                                    $scope.currentUser.id,
                                    $scope.profile.newsletter
                                ).then(function() { $scope.pendingUpdate -= 1; });

                                $scope.profile.keys.forEach(function(key) {
                                    if(key.type == 'pin' && key.pin) {
                                        $scope.pendingUpdate += 1;
                                        $scope.PinService1.UpdatePin(key.id, key.pin).then(function() {
                                            $scope.pendingUpdate -= 1;
                                        });
                                    }
                                });

                                $scope.checkUpdated();
                                $scope.pendingUpdate -= 1;
                            });
                    };

                    $scope.checkUpdated = function() {
                        if($scope.pendingUpdate <= 0) {
                            $scope.profileUpdated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.profileUpdated = function() {
                        UserService1.GetUser($scope.currentUser.id).then(function(data) {
                            $scope.$parent.currentUser = data;
                            $scope.resetProfileForm();
                            $scope.updating = false;
                        });
                    };

                    //Build a map of selected privileges
                    angular.forEach(profile.privileges, function(userPriv){
                        currentPriv[userPriv.code] = userPriv;
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

                    $scope.updatePrivileges = function(){
                        var codes = [];
                        angular.forEach($scope.privileges, function(priv){
                            if (priv.selected){
                                codes.push(priv.code);
                            }
                        });

                        PrivilegeService1.PutUserPrivileges(profile.id, codes).then(function(){
                            $scope.privilegeDirty = false;
                        });
                    };

                    //Build a map of selected membership
                    var mpromise = MembershipService1.GetAll();
                    mpromise.then(function(memberships){
                        $scope.memberships = [];
                        angular.forEach(memberships, function(membership){
                            membership.selected = membership.code == currentMembership.code;
                            $scope.memberships.push(membership);
                        });
                    });

                    $scope.switchMembership = function(membership){

                        angular.forEach($scope.memberships, function(mem){
                            if (membership.code != mem.code)
                                mem.selected = false;
                        });

                        membership.selected = !membership.selected;

                        $scope.membershipDirty = true;
                    };

                    $scope.updateMembership = function(){
                        var membership = null;
                        angular.forEach($scope.memberships, function(mem){
                            if (mem.selected){
                                membership = mem;
                            }
                        });

                        if (membership == null) return;

                        UserService1.UpdateMembership(profile.id, membership.id).then(function(){
                            $scope.membershipDirty = false;
                        });
                    };


                }]
            });
    }]);