angular.module('pb').factory('GearFactory', ['$http', function ( $http ) {

    function update ( gear ) {
        return $http.post('Gear/Update', gear);
    }

    function create ( gear ) {
        return $http.post('Gear/Create', gear);
    }

    function remove ( id ) {
        return $http.get('Gear/Delete?id=' + id);
    }

    return {
        update: update,
        create: create,
        remove: remove
    }
}]);