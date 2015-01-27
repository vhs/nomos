'use strict';

angular
    .module('mmpApp')
    .factory('UserService1', ['$http', function ($http) {
        return {
            GetUsers: function() {
                return $http.get("/services/web/UserService1.svc/GetUsers")
                    .then(function(response) { return response.data; });
            },
            GetUser: function(id) {
                return $http.get("/services/web/UserService1.svc/GetUser?id=" + id)
                    .then(function(response) {
                        response.data.keys.forEach(function(key, i, keys) {
                            if(key.type == "pin") {
                                keys[i].pinid = ('0000' + key.key.split('|')[0]).slice(-4);
                                keys[i].pin = ('0000' + key.key.split('|')[1]).slice(-4);
                            }
                        });

                        return response.data;
                    });
            },
            UpdateProfile: function(userid, username, fname, lname, email, newsletter) {
                return $http.post("/services/web/UserService1.svc/UpdateProfile", {userid: userid, username: username, fname: fname, lname: lname, email: email, newsletter: newsletter})
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }]);