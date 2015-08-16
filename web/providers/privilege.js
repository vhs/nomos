'use strict';

angular
    .module('mmpApp')
    .factory('PrivilegeService1', ['$http', '$q', function ($http, $q) {
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
            },
            PutKeyPrivileges: function(keyid, codes) {
                return $http.post("/services/web/KeyService1.svc/PutKeyPrivileges",
                    { keyid: keyid, privileges: codes.join() });
            },
            GetAllSystemPermissions: function() {
                return $http.get("/services/web/PrivilegeService1.svc/GetAllSystemPermissions")
                    .then(function(response){
                        return response.data;
                    });
            },
            GetUserPrivileges: function(userid) {
                return $http.post("/services/web/PrivilegeService1.svc/GetUserPrivileges", { userid: userid })
                    .then(function(response){
                        return response.data;
                    });
            },
            GetPrivilege: function(id) {
                return $http.post("/services/web/PrivilegeService1.svc/GetUserPrivileges", { id: id })
                    .then(function(response){
                        return response.data;
                    });
            },
            CreatePrivilege: function(name, code, description, icon, enabled) {
                delete this._privileges;
                return $http.post("/services/web/PrivilegeService1.svc/CreatePrivilege", { name:name, code:code, description:description, icon:icon, enabled:enabled })
                    .then(function(response){
                        return response.data;
                    });
            },
            UpdatePrivilegeName: function(id, name) {
                delete this._privileges;
                return $http.post("/services/web/PrivilegeService1.svc/UpdatePrivilegeName", { id:id, name:name })
                    .then(function(response){
                        return response.data;
                    });
            },
            UpdatePrivilegeDescription: function(id, description) {
                delete this._privileges;
                return $http.post("/services/web/PrivilegeService1.svc/UpdatePrivilegeDescription", { id:id, description:description })
                    .then(function(response){
                        return response.data;
                    });
            },
            UpdatePrivilegeIcon: function(id, icon) {
                delete this._privileges;
                return $http.post("/services/web/PrivilegeService1.svc/UpdatePrivilegeIcon", { id:id, icon:icon })
                    .then(function(response){
                        return response.data;
                    });
            },
            UpdatePrivilegeEnabled: function(id, enabled) {
                delete this._privileges;
                return $http.post("/services/web/PrivilegeService1.svc/UpdatePrivilegeEnabled", { id:id, enabled:enabled })
                    .then(function(response){
                        return response.data;
                    });
            },
            DeletePrivilege: function(id) {
                delete this._privileges;
                return $http.post("/services/web/PrivilegeService1.svc/DeletePrivilege", { id:id })
                    .then(function(response){
                        return response.data;
                    });
            }
        };
    }]);
