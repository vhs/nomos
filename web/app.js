'use strict';

angular
.module('mmpApp',
    [
      'ui.router',
        'mmpApp.public',
        'mmpApp.user'

      //'mmpApp.version'
    ]
)
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");

      /*
// Regular user routes
  $stateProvider
      .state('user', {
        abstract: true,
        template: "<ui-view/>",
        data: {
         // access: access.user
        }
      })
      .state('user.home', {
        url: '/',
        templateUrl: 'home'
      })
      .state('user.private', {
        abstract: true,
        url: '/private/',
        templateUrl: 'private/layout'
      })
      .state('user.private.home', {
        url: '',
        templateUrl: 'private/home'
      })
      .state('user.private.nested', {
        url: 'nested/',
        templateUrl: 'private/nested'
      })
      .state('user.private.admin', {
        url: 'admin/',
        templateUrl: 'private/nestedAdmin',
        data: {
         // access: access.admin
        }
      });
      */
}]);
