'use strict';

angular
    .module('mmpApp')
    .factory('UserService1', ['$http', function ($http) {
        return {
            GetUsers: function() {
                return $http.get("/services/web/UserService1.svc/GetUsers")
                    .then(function(response) { return response.data; });
            },
            GetUser: function(userid) {
                return $http.get("/services/web/UserService1.svc/GetUser?userid=" + userid)
                    .then(function(response) {
                        response.data.keys.forEach(function(key) {
                            if(key.type == "pin") {
                                if (key.key) {
                                    key.pinid = ('0000' + key.key.split('|')[0]).slice(-4);
                                    key.pin = ('0000' + key.key.split('|')[1]).slice(-4);
                                } else {
                                    key.pinid = '0000';
                                    key.pin = '0000';
                                }
                            }
                        });

                        response.data.hasPrivilege = function (priv) {
                            for (var i = 0; i < this.privileges.length; i++) {
                                if (this.privileges[i].code == priv)
                                    return true;
                            }

                            if (this.membership != null) {
                                for (var i = 0; i < this.membership.privileges.length; i++) {
                                    if (this.membership.privileges[i].code == priv)
                                        return true;
                                }
                            }

                            return false;
                        };

                        return response.data;
                    });
            },
            UpdateProfile: function(userid, username, newsletter) {
                return $http.post("/services/web/UserService1.svc/UpdateProfile", {userid: userid, username: username, newsletter: newsletter})
                    .then(function(response) {
                        return response.data;
                    });
            },
            Register: function(username, password, email, fname, lname) {
                return $http.post("/services/web/UserService1.svc/Register", {username: username, password: password, email: email, fname: fname, lname: lname})
                    .then(function(response) {
                        return response.data;
                    });
            },
            RequestPasswordReset: function(email) {
                return $http.post("/services/web/UserService1.svc/RequestPasswordReset", {email: email})
                    .then(function(response) {
                        return response.data;
                    });
            },
            ResetPassword: function(token, password) {
                return $http.post("/services/web/UserService1.svc/ResetPassword", {token: token, password: password})
                    .then(function(response) {
                        return response.data;
                    });
            },
            UpdatePassword: function(userid, password) {
                return $http.post("/services/web/UserService1.svc/UpdatePassword", {userid: userid, password: password});
            }
        };
    }]);