'use strict';

angular
    .module('mmpApp')
    .factory('PrivilegeService', ['$http', '$q', function ($http, $q) {
        return {
            GetAllPrivileges: function() {
                var parent = this;
                //Cache the result, data doesn't really change.
                if (parent._privileges){
                    var deferred = $q.defer();
                    console.log(parent._privileges);
                    deferred.resolve(parent._privileges);
                    return deferred.promise;
                }
                return $http.get("/services/web/PrivilegeService1.svc/GetAllPrivileges")
                    .then(function(response){
                        parent._privileges = response.data;
                        return response.data;
                    });
            },
            PutUserPrivileges: function(userid, codes) {
                return $http.post("/services/web/UserService1.svc/PutUserPrivileges",
                    { userid: userid, privileges: codes.join() });
            }
        };
    }]);