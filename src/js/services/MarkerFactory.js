angular.module('pb').factory('MarkerFactory', ['$http', function ($http) {

    function create ( marker ) {
        return $http.post('Marker/Create', marker);
    }

    function byUserId ( userId ) {
        return $http.get('Marker/ByUserId?id=' + userId);
    }

    function update ( marker ) {
        return $http.post('Marker/Update', marker);
    }

    function remove ( markerId ) {
        return $http.get('Marker/Delete?id=' + markerId);
    }

    return {
        create: create,
        byUserId: byUserId,
        update: update,
        remove: remove
    };
}]);