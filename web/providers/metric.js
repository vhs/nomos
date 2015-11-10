'use strict';

angular
.module('mmpApp')
.factory('MetricService1', ['$http', function ($http) {
  return {
    GetNewMembers: function(start, end) {
      return $http.post("/services/web/MetricService1.svc/GetNewMembers", {start_range: start, end_range: end})
        .then(function(response) { return response.data; });
    },
    GetTotalMembers: function(start, end) {
      return $http.post("/services/web/MetricService1.svc/GetTotalMembers", {start_range: start, end_range: end})
        .then(function(response) { return response.data; });
    },
    GetNewKeyHolders: function(start, end) {
      return $http.post("/services/web/MetricService1.svc/GetNewKeyHolders", {start_range: start, end_range: end})
        .then(function(response) { return response.data; });
    },
    GetTotalKeyHolders: function(start, end) {
      return $http.post("/services/web/MetricService1.svc/GetTotalKeyHolders", {start_range: start, end_range: end})
        .then(function(response) { return response.data; });
    },
  };
}]);