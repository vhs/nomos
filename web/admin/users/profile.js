'use strict';

angular.module('mmpApp.admin').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('admin.profile', {
            parent: 'admin',
            url: '/users/:userId',
            data: {
                access: 'admin',
            },
            templateUrl: 'admin/users/profile.html',
            resolve: {
                profile: [
                    '$stateParams',
                    'UserService1',
                    function ($stateParams, UserService1) {
                        return UserService1.GetUser($stateParams.userId);
                    },
                ],
            },
            controller: [
                '$scope',
                '$modal',
                '$timeout',
                'profile',
                'PrivilegeService1',
                'UserService1',
                'MembershipService1',
                'PinService1',
                function ($scope, $modal, $timeout, profile, PrivilegeService1, UserService1, MembershipService1, PinService1) {
                    $scope.currentProfile = profile;
                    $scope.profile = profile;
                    const currentPriv = {};
                    let currentMembership = profile.membership;
                    if (currentMembership == null) currentMembership = {};
                    const currentStatus = {
                        title: '',
                        code: profile.active,
                        selected: true,
                    };

                    $scope.updating = false;
                    $scope.pendingUpdate = 0;

                    $scope.passwordsMatch = true;

                    $scope.generatePin = function () {
                        PinService1.GeneratePin($scope.profile.id).then(function (response) {
                            const split = response.key.split('|');
                            response.pinid = split[0];
                            response.pin = split[1];
                            $scope.profile.keys.push(response);
                        });
                    };

                    $scope.changePassword = function (isValid) {
                        UserService1.UpdatePassword($scope.profile.id, $scope.newPassword).then(
                            function (response) {
                                alert('Password was changed successfully.');
                                $('#passwordChange').modal('hide'); // forgive me spaghetti monster, for I have sinned. I have done view logic in my controller.
                                $scope.resetPasswordForm();
                            },
                            function (err) {
                                alert('We encountered an error trying to update your password.');
                            },
                        );
                    };

                    $scope.comparePasswords = function () {
                        $scope.passwordsMatch = $scope.newPassword == $scope.rePassword;
                    };

                    $scope.resetPasswordForm = function () {
                        $scope.changePasswordForm.$setPristine();
                        $scope.newPassword = '';
                        $scope.rePassword = '';
                    };

                    $scope.resetProfileForm = function () {
                        $scope.profileForm.$setPristine();
                        $scope.profile = angular.copy($scope.currentProfile);
                    };

                    $scope.updateProfile = function () {
                        $scope.updating = true;
                        $scope.pendingUpdate = 1;

                        UserService1.UpdateUsername($scope.profile.id, $scope.profile.username).then(function () {
                            if ($scope.currentUser.hasPrivilege('full-profile')) {
                                $scope.pendingUpdate += 1;
                                UserService1.UpdateName($scope.profile.id, $scope.profile.fname, $scope.profile.lname).then(function () {
                                    $scope.pendingUpdate -= 1;
                                });

                                $scope.pendingUpdate += 1;
                                UserService1.UpdateEmail($scope.profile.id, $scope.profile.email).then(function () {
                                    $scope.pendingUpdate -= 1;
                                });

                                $scope.pendingUpdate += 1;
                                UserService1.UpdatePaymentEmail($scope.profile.id, $scope.profile.payment_email).then(function () {
                                    $scope.pendingUpdate -= 1;
                                });
                            }

                            $scope.pendingUpdate += 1;
                            UserService1.UpdateNewsletter($scope.profile.id, $scope.profile.newsletter).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.pendingUpdate += 1;
                            UserService1.UpdateCash($scope.profile.id, $scope.profile.cash).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.profile.keys.forEach(function (key) {
                                if (key.type == 'pin' && key.pin) {
                                    $scope.pendingUpdate += 1;
                                    PinService1.UpdatePin(key.id, key.pin).then(function () {
                                        $scope.pendingUpdate -= 1;
                                    });
                                }
                            });

                            $scope.pendingUpdate += 1;
                            UserService1.UpdateExpiry($scope.profile.id, $scope.profile.mem_expire).then(function () {
                                $scope.pendingUpdate -= 1;
                            });

                            $scope.checkUpdated();
                            $scope.pendingUpdate -= 1;
                        });
                    };

                    $scope.checkUpdated = function () {
                        if ($scope.pendingUpdate <= 0) {
                            $scope.profileUpdated();
                        } else {
                            $timeout($scope.checkUpdated, 10);
                        }
                    };

                    $scope.profileUpdated = function () {
                        UserService1.GetUser($scope.profile.id).then(function (data) {
                            $scope.currentProfile = data;
                            if ($scope.profile.id == $scope.$parent.currentUser.id) $scope.$parent.currentUser = data;
                            $scope.resetProfileForm();
                            $scope.updating = false;
                        });
                    };

                    //Build a map of selected privileges
                    angular.forEach(profile.privileges, function (userPriv) {
                        currentPriv[userPriv.code] = userPriv;
                    });
                    const promise = PrivilegeService1.GetAllPrivileges();
                    promise.then(function (privileges) {
                        $scope.privileges = [];
                        angular.forEach(privileges, function (privilege) {
                            privilege.selected = angular.isDefined(currentPriv[privilege.code]);
                            $scope.privileges.push(privilege);
                        });
                    });

                    $scope.togglePrivilege = function (privilege) {
                        privilege.selected = !privilege.selected;
                        $scope.privilegeDirty = true;
                    };

                    $scope.updatePrivileges = function () {
                        const codes = [];
                        angular.forEach($scope.privileges, function (priv) {
                            if (priv.selected) {
                                codes.push(priv.code);
                            }
                        });

                        $scope.updating = true;
                        $scope.pendingUpdate = 1;

                        PrivilegeService1.PutUserPrivileges(profile.id, codes).then(function () {
                            $scope.privilegeDirty = false;

                            $scope.checkUpdated();
                            $scope.pendingUpdate -= 1;
                        });
                    };

                    //Build a map of selected membership
                    const mpromise = MembershipService1.GetAll();
                    mpromise.then(function (memberships) {
                        $scope.memberships = [];
                        angular.forEach(memberships, function (membership) {
                            membership.selected = membership.code == currentMembership.code;
                            $scope.memberships.push(membership);
                        });
                    });

                    $scope.switchMembership = function (membership) {
                        angular.forEach($scope.memberships, function (mem) {
                            if (membership.code != mem.code) mem.selected = false;
                        });

                        membership.selected = !membership.selected;

                        $scope.membershipDirty = true;
                    };

                    $scope.updateMembership = function () {
                        let membership = null;
                        angular.forEach($scope.memberships, function (mem) {
                            if (mem.selected) {
                                membership = mem;
                            }
                        });

                        if (membership == null) return;

                        $scope.updating = true;
                        $scope.pendingUpdate = 1;

                        UserService1.UpdateMembership(profile.id, membership.id).then(function () {
                            $scope.membershipDirty = false;

                            $scope.checkUpdated();
                            $scope.pendingUpdate -= 1;
                        });
                    };

                    //Build a map of selected statii
                    const mpromiseUser = UserService1.GetStatuses();
                    mpromiseUser.then(function (statuses) {
                        $scope.statuses = [];
                        angular.forEach(statuses, function (status) {
                            status.selected = status.code == currentStatus.code;
                            $scope.statuses.push(status);
                        });
                    });

                    $scope.switchStatus = function (status) {
                        angular.forEach($scope.statuses, function (stat) {
                            if (status.code != stat.code) stat.selected = false;
                        });

                        status.selected = !status.selected;

                        $scope.statusDirty = true;
                    };

                    $scope.updateStatus = function () {
                        let status = null;
                        angular.forEach($scope.statuses, function (stat) {
                            if (stat.selected) {
                                status = stat;
                            }
                        });

                        if (status == null) return;

                        $scope.updating = true;
                        $scope.pendingUpdate = 1;

                        UserService1.UpdateStatus(profile.id, status.code).then(function () {
                            $scope.statusDirty = false;

                            $scope.checkUpdated();
                            $scope.pendingUpdate -= 1;
                        });
                    };
                },
            ],
        });
    },
]);
