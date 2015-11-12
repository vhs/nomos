'use strict';

angular
    .module('mmpApp.user')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('user.stats', {
                parent: "user",
                url: '/stats/',
                templateUrl: 'user/stats/stats.html',
                resolve: {
                    newMembers: ['$stateParams', 'MetricService1', function($stateParams, MetricService1) {
                        return MetricService1.GetNewMembers(moment().utc().startOf('month').toISOString(), moment().utc().endOf('month').toISOString());
                    }],
                    totalMembers: ['$stateParams', 'MetricService1', function($stateParams, MetricService1) {
                        return MetricService1.GetTotalMembers(moment().utc().startOf('month').toISOString(), moment().utc().endOf('month').toISOString());
                    }],
                    newKeyHolders: ['$stateParams', 'MetricService1', function($stateParams, MetricService1) {
                        return MetricService1.GetNewKeyHolders(moment().utc().startOf('month').toISOString(), moment().utc().endOf('month').toISOString());
                    }],
                    totalKeyHolders: ['$stateParams', 'MetricService1', function($stateParams, MetricService1) {
                        return MetricService1.GetTotalKeyHolders(moment().utc().startOf('month').toISOString(), moment().utc().endOf('month').toISOString());
                    }],
                    allPermissions: ['PrivilegeService1', function(PrivilegeService1) {
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