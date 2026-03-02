'use strict'

angular.module('mmpApp').factory('MembershipService1', [
    '$http',
    function ($http) {
        return {
            GetAll: function () {
                return $http.get('/services/web/MembershipService1.svc/GetAll').then(function (response) {
                    return response.data
                })
            },
            Get: function (membershipId) {
                return $http.get('/services/web/MembershipService1.svc/Get?membershipId=' + membershipId).then(function (response) {
                    return response.data
                })
            },
            Update: function (membershipId, membership) {
                const m = _.clone(membership)
                m.membershipId = membershipId
                return $http.post('/services/web/MembershipService1.svc/Update', m).then(function (response) {
                    return response.data
                })
            },
            UpdateActive: function (membershipId, active) {
                return $http.post('/services/web/MembershipService1.svc/UpdateActive', { membershipId, active }).then(function (response) {
                    return response.data
                })
            },

            UpdatePrivate: function (membershipId, _private) {
                return $http
                    .post('/services/web/MembershipService1.svc/UpdatePrivate', { membershipId, private: _private })
                    .then(function (response) {
                        return response.data
                    })
            },

            UpdateTrial: function (membershipId, trial) {
                return $http.post('/services/web/MembershipService1.svc/UpdateTrial', { membershipId, trial }).then(function (response) {
                    return response.data
                })
            },

            UpdateRecurring: function (membershipId, recurring) {
                return $http.post('/services/web/MembershipService1.svc/UpdateRecurring', { membershipId, recurring }).then(function (response) {
                    return response.data
                })
            }
        }
    }
])
