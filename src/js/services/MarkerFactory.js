angular.module('pb').factory('MarkerFactory', ['$http','config', function ($http, config) {

    function create ( marker ) {
        return $http.post(config.apiUrl + 'v1/Marker/Create', marker);
    }

    function byUserId ( userId ) {
        return $http.get(config.apiUrl + 'v1/Marker/ByUserId?id=' + userId);
    }

    function update ( marker ) {
        return $http.put(config.apiUrl + 'v1/Marker/Update', marker);
    }

    function remove ( markerId ) {
        return $http.get(config.apiUrl + 'v1/Marker/Delete?id=' + markerId);
    }

    return {
        create: create,
        byUserId: byUserId,
        update: update,
        remove: remove
    };
}]);