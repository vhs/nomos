'use strict';

angular
    .module('mmpApp')
    .factory('PaymentService1', ['$http', function ($http) {
        return {
          
          Get: function(paymentId) {
            return $http.get("/services/web/PaymentService1.svc/Get?paymentId=" + paymentId)
                    .then(function(response) { return response.data; });
          },
          GetPaginated: function(offset, limit) {
            return $http.post("/services/web/PaymentService1.svc/GetPaginated", {offset: offset, limit: limit})
                    .then(function(response) { return response.data; });
          }
        };
    }]);