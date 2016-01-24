angular.module('pb').factory('GearFactory', ['$http','config', function ( $http, config ) {

    function update ( gear ) {
        return $http.put(config.apiUrl + 'v1/Gear/Update', gear);
    }

    function create ( gear ) {
        return $http.post(config.apiUrl + 'v1/Gear/Create', gear);
    }

    function remove ( id ) {
        return $http.get(config.apiUrl + 'v1/Gear/Delete?id=' + id);
    }

    return {
        update: update,
        create: create,
        remove: remove
    }
}]);