'use strict';

angular
    .module('mmpApp')
    .factory('IpnService1', ['$http', function ($http) {
        return {
            GetAll: function() {
                return $http.get("/services/web/IpnService1.svc/GetAll")
                    .then(function(response) { return response.data; });
            },
            Get: function(IpnId) {
                return $http.get("/services/web/IpnService1.svc/Get?IpnId=" + IpnId)
                    .then(function(response) { return response.data; });
            }
        };
    }]);