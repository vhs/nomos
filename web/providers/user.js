'use strict';

angular
    .module('mmpApp')
    .factory('UserService1', ['$http', function ($http) {
        return {
            GetUsers: function() {
                return $http.get("/services/web/UserService1.svc/GetUsers")
                    .then(function(response) { return response.data; });
            },
            ListUsers: function(page, size, columns, order, filters) {
                return $http.post("/services/web/UserService1.svc/ListUsers", {page: page, size: size, columns: columns, order: order, filters: filters})
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
            UpdateUsername: function(userid, username) {
                return $http.post("/services/web/UserService1.svc/UpdateUsername", {userid: userid, username: username})
                    .then(function(response) {
                        return response.data;
                    });
            },
            UpdateNewsletter: function(userid, subscribe) {
                return $http.post("/services/web/UserService1.svc/UpdateNewsletter", {userid: userid, subscribe: subscribe})
                    .then(function(response) {
                        return response.data;
                    });
            },
            UpdateName: function(userid, fname, lname) {
                return $http.post("/services/web/UserService1.svc/UpdateName", {userid: userid, fname: fname, lname: lname})
                    .then(function(response) {
                        return response.data;
                    });
            },
            UpdateEmail: function(userid, email) {
                return $http.post("/services/web/UserService1.svc/UpdateEmail", {userid: userid, email: email})
                    .then(function(response) {
                        return response.data;
                    });
            },
            UpdatePaymentEmail: function(userid, email) {
                return $http.post("/services/web/UserService1.svc/UpdatePaymentEmail", {userid: userid, email: email})
                    .then(function(response) {
                        return response.data;
                    });
            },
            UpdateCash: function(userid, cash) {
                return $http.post("/services/web/UserService1.svc/UpdateCash", {userid: userid, cash: cash})
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
            },
            UpdateMembership: function(userid, membershipid) {
                return $http.post("/services/web/UserService1.svc/UpdateMembership", {userid: userid, membershipid: membershipid});
            },
            Create: function(username, password, email, fname, lname, membershipid) {
                return $http.post("/services/web/UserService1.svc/Create", {username:username, password:password, email:email, fname:fname, lname:lname, membershipid:membershipid});
            },
            GetStatuses: function() {
                return $http.get("/services/web/UserService1.svc/GetStatuses")
                    .then(function(response) { return response.data; });
            },
            UpdateStatus: function(userid, status) {
                return $http.post("/services/web/UserService1.svc/UpdateStatus", {userid: userid, status: status})
                    .then(function(response) {
                        return response.data;
                    });
            },
            UpdateExpiry: function(userid, date) {
                return $http.post("/services/web/UserService1.svc/UpdateExpiry", {userid: userid, date: date})
                    .then(function(response) {
                        return response.data;
                    });
            },
            GetStanding: function(userid) {
                return $http.get("/services/web/UserService1.svc/GetStanding?userid=" + userid)
                    .then(function(response) {
                        return response.data;
                    });
            },
            GetGrantUserPrivileges: function(userid) {
                return $http.get("/services/web/UserService1.svc/GetGrantUserPrivileges?userid=" + userid)
                    .then(function(response) {
                        return response.data;
                    });
            },
            GrantPrivilege: function(userid, privilege) {
                return $http.post("/services/web/UserService1.svc/GrantPrivilege", {userid: userid, privilege: privilege})
                    .then(function(response) {
                        return response.data;
                    });
            },
            RevokePrivilege: function(userid, privilege) {
                return $http.post("/services/web/UserService1.svc/RevokePrivilege", {userid: userid, privilege: privilege})
                    .then(function(response) {
                        return response.data;
                    });
            },
            RequestSlackInvite: function(email) {
                return $http.post("/services/web/UserService1.svc/RequestSlackInvite", {email: email})
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    }]);