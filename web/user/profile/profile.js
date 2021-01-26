'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.profile', {
                parent: "user",
                url: '/profile/',
                templateUrl: 'user/profile/profile.html',
                controller: ['$scope', '$timeout', 'PinService1', 'UserService1', function($scope, $timeout, PinService1, UserService1) {

                    $scope.showPin = false;
                    $scope.togglePin = function(val) { $scope.showPin = val; };

                    $scope.PinService1 = PinService1;
                    $scope.profile = angular.copy($scope.currentUser);

                    $scope.goodStanding = false;

                    UserService1.GetStanding($scope.profile.id).then(function(data) {
                        $scope.goodStanding = (data == 'true');
                    });

                    $scope.member_since = moment($scope.profile.created).format("MMMM Do, YYYY");
                    $scope.member_for = moment($scope.profile.created).fromNow(true);
                    $scope.last_login = moment($scope.profile.lastlogin).format("MMM DD, YYYY, h:mm:ss a");
                    $scope.expiry = moment($scope.profile.mem_expire).fromNow();
                    $scope.expiry_date = moment($scope.profile.mem_expire).format("MMMM Do YYYY");

                    $scope.filterLinked = function(key){
                        return key.type === 'github' ||
                            key.type === 'slack' ||
                            key.type === 'google';
                    };

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

                                $scope.pendingUpdate += 1;
                                UserService1.UpdatePaymentEmail(
                                    $scope.currentUser.id,
                                    $scope.profile.payment_email
                                ).then(function() { $scope.pendingUpdate -= 1; });

                                $scope.pendingUpdate += 1;
                                UserService1.UpdateStripeEmail(
                                    $scope.currentUser.id,
                                    $scope.profile.stripe_email
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
                }]
            });
    }]);