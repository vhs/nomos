'use strict';

angular
    .module('mmpApp')
    .factory('PaymentService1', ['$http', function ($http) {
        return {
          
          Get: function(paymentId) {
            return $http.get("/services/web/PaymentService1.svc/Get?paymentId=" + paymentId)
                    .then(function(response) { return response.data; });
          },
        };
    }]);