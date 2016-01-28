'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.dashboard', {
                parent: "user",
                url: '/dashboard',
                templateUrl: 'user/dashboard/dashboard.html',
                resolve: {
                    newMembers: ['$rootScope', '$stateParams', 'MetricService1', function($rootScope, $stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetNewMembers(moment().utc().startOf('month').toISOString(), moment().utc().endOf('month').toISOString());
                    }],
                    totalMembers: ['$rootScope', '$stateParams', 'MetricService1', function($rootScope, $stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetTotalMembers();
                    }],
                    newKeyHolders: ['$rootScope', '$stateParams', 'MetricService1', function($rootScope, $stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetNewKeyHolders(moment().utc().startOf('month').toISOString(), moment().utc().endOf('month').toISOString());
                    }],
                    totalKeyHolders: ['$rootScope', '$stateParams', 'MetricService1', function($rootScope, $stateParams, MetricService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return MetricService1.GetTotalKeyHolders();
                    }],
                    allPermissions: ['$rootScope', 'PrivilegeService1', function($rootScope, PrivilegeService1) {
                        //if (!$rootScope.authenticated) throw "login";
                        return PrivilegeService1.GetAllPrivileges();
                    }]
                },
                controller: [
                    '$scope', 'newMembers', 'newKeyHolders', 'totalMembers', 'totalKeyHolders',
                    function($scope, newMembers, newKeyHolders, totalMembers, totalKeyHolders) {
                        $scope.newMembers = newMembers;
                        $scope.newKeyHolders = newKeyHolders;
                        $scope.totalMembers = totalMembers;
                        $scope.totalKeyHolders = totalKeyHolders;
                        $scope.date = moment().format("MMMM YYYY");
                    }]
            });
    }]);