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
            },
            ListRecords: function(page, size, columns, order, filters) {
                return $http.post("/services/web/IpnService1.svc/ListRecords", { page: page, size: size, columns: columns, order: order, filters: filters })
                    .then(function(response) { return response.data; });
            },
            CountRecords: function(filters) {
                return $http.post("/services/web/IpnService1.svc/CountRecords", { filters: filters })
                    .then(function(response) { return response.data; });
            }

        };
    }]);
