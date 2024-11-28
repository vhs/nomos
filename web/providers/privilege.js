'use strict';

angular.module('mmpApp').factory('PrivilegeService1', [
    '$http',
    '$q',
    function ($http, $q) {
        return {
            GetAllPrivileges: function () {
                const parent = this;
                //Cache the result, data doesn't really change.
                if (parent._privileges) {
                    const deferred = $q.defer();
                    console.log(parent._privileges);
                    deferred.resolve(parent._privileges);
                    return deferred.promise;
                }
                return $http.get('/services/web/PrivilegeService1.svc/GetAllPrivileges').then(function (response) {
                    parent._privileges = response.data;
                    return response.data;
                });
            },
            PutUserPrivileges: function (userid, codes) {
                return $http.post('/services/web/UserService1.svc/PutUserPrivileges', { userid, privileges: codes.join() });
            },
            PutKeyPrivileges: function (keyid, codes) {
                return $http.post('/services/web/KeyService1.svc/PutKeyPrivileges', { keyid, privileges: codes.join() });
            },
            PutMembershipPrivileges: function (membershipId, codes) {
                return $http.post('/services/web/MembershipService1.svc/PutPrivileges', { membershipId, privileges: codes.join() });
            },
            GetAllSystemPermissions: function () {
                return $http.get('/services/web/PrivilegeService1.svc/GetAllSystemPermissions').then(function (response) {
                    return response.data;
                });
            },
            GetUserPrivileges: function (userid) {
                return $http.post('/services/web/PrivilegeService1.svc/GetUserPrivileges', { userid }).then(function (response) {
                    return response.data;
                });
            },
            GetPrivilege: function (id) {
                return $http.post('/services/web/PrivilegeService1.svc/GetUserPrivileges', { id }).then(function (response) {
                    return response.data;
                });
            },
            CreatePrivilege: function (name, code, description, icon, enabled) {
                delete this._privileges;
                return $http
                    .post('/services/web/PrivilegeService1.svc/CreatePrivilege', {
                        name,
                        code,
                        description,
                        icon,
                        enabled,
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            UpdatePrivilegeName: function (id, name) {
                delete this._privileges;
                return $http.post('/services/web/PrivilegeService1.svc/UpdatePrivilegeName', { id, name }).then(function (response) {
                    return response.data;
                });
            },
            UpdatePrivilegeDescription: function (id, description) {
                delete this._privileges;
                return $http.post('/services/web/PrivilegeService1.svc/UpdatePrivilegeDescription', { id, description }).then(function (response) {
                    return response.data;
                });
            },
            UpdatePrivilegeIcon: function (id, icon) {
                delete this._privileges;
                return $http.post('/services/web/PrivilegeService1.svc/UpdatePrivilegeIcon', { id, icon }).then(function (response) {
                    return response.data;
                });
            },
            UpdatePrivilegeEnabled: function (id, enabled) {
                delete this._privileges;
                return $http.post('/services/web/PrivilegeService1.svc/UpdatePrivilegeEnabled', { id, enabled }).then(function (response) {
                    return response.data;
                });
            },
            DeletePrivilege: function (id) {
                delete this._privileges;
                return $http.post('/services/web/PrivilegeService1.svc/DeletePrivilege', { id }).then(function (response) {
                    return response.data;
                });
            },
        };
    },
]);
