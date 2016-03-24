'use strict';

angular
    .module('mmpApp')
    .factory('EventService1', ['$http', function ($http) {
        return {
            GetEvent: function(id) {
                return $http.get("/services/web/EventService1.svc/GetEvent?id=" + id)
                    .then(function(response) { return response.data; });
            },
            GetAccessibleEvents: function() {
                return $http.get("/services/web/EventService1.svc/GetAccessibleEvents")
                    .then(function(response) { return response.data; });
            },
            CreateEvent: function(name, domain, event, description, enabled) {
                return $http.post("/services/web/EventService1.svc/CreateEvent", { name:name, domain:domain, event:event, description:description, enabled:enabled })
                    .then(function(response) { return response.data; });
            },
            UpdateEvent: function(id, name, domain, event, description, enabled) {
                return $http.post("/services/web/EventService1.svc/UpdateEvent", { id:id, name:name, domain:domain, event:event, description:description, enabled:enabled })
                    .then(function(response) { return response.data; });
            },
            EnableEvent: function(id, enabled) {
                return $http.post("/services/web/EventService1.svc/EnableEvent", { id:id, enabled:enabled })
                    .then(function(response) { return response.data; });
            },
            PutEventPrivileges: function(id, codes) {
                return $http.post("/services/web/EventService1.svc/PutEventPrivileges",
                    { id: id, privileges: codes.join() });
            },
            ListEvents: function(page, size, columns, order, filters) {
                return $http.post("/services/web/EventService1.svc/ListEvents", { page: page, size: size, columns: columns, order: order, filters: filters })
                    .then(function(response) { return response.data; });
            },
            DeleteEvent: function(id) {
                return $http.get("/services/web/EventService1.svc/DeleteEvent?id=" + id)
                    .then(function(response) { return response.data; });
            },

        };
    }]);