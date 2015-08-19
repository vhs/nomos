'use strict';

angular
.module('mmpApp.user')
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('user.home', {
      parent: "user",
      url: '/',
      templateUrl: 'user/home/home.html',
      resolve: {
          membership: ['$stateParams', 'MembershipService1', function($stateParams, MembershipService1) {
              return MembershipService1.Get($stateParams.membershipId);
          }],
          allPermissions: ['PrivilegeService1', function(PrivilegeService1) {
              return PrivilegeService1.GetAllPrivileges();
          }]
      },
      controller: ['$scope', function($scope) {
          $scope.date = "January 2015";
      }]
    });
}]);