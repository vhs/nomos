/**
 * Created by Thomas on 11/21/2015.
 */
'use strict';

angular.module('mmpApp').factory('MemberCardService1', [
    '$http',
    function ($http) {
        return {
            GetGenuineCardDetails: function (key) {
                return $http.get('/services/web/MemberCardService1.svc/GetGenuineCardDetails?key=' + key).then(function (response) {
                    return response.data;
                });
            },
            RegisterGenuineCard: function (key, notes) {
                return $http.post('/services/web/MemberCardService1.svc/RegisterGenuineCard', { key, notes }).then(function (response) {
                    return response.data;
                });
            },
            ValidateGenuineCard: function (key) {
                return $http.post('/services/web/MemberCardService1.svc/ValidateGenuineCard', { key }).then(function (response) {
                    return response.data;
                });
            },
            IssueCard: function (email, key) {
                return $http.post('/services/web/MemberCardService1.svc/IssueCard', { email, key }).then(function (response) {
                    return response.data;
                });
            },
            ListUserGenuineCards: function (userid, page, size, columns, order, filters) {
                return $http
                    .post('/services/web/MemberCardService1.svc/ListUserGenuineCards', {
                        userid,
                        page,
                        size,
                        columns,
                        order,
                        filters,
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            ListGenuineCards: function (page, size, columns, order, filters) {
                return $http
                    .post('/services/web/MemberCardService1.svc/ListGenuineCards', {
                        page,
                        size,
                        columns,
                        order,
                        filters,
                    })
                    .then(function (response) {
                        return response.data;
                    });
            },
            UpdateGenuineCardActive: function (key, active) {
                return $http.post('/services/web/MemberCardService1.svc/UpdateGenuineCardActive', { key, active }).then(function (response) {
                    return response.data;
                });
            },
        };
    },
]);
