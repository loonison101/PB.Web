angular.module('pb').factory('LoadoutFactory', ['$http', function ($http) {

    function byPlayerId ( playerId ) {
        return $http.get('Loadout/ByPlayerId?id=' + playerId)
    }

    function updateName (id, name) {
        return $http.get('Loadout/UpdateName?id=' + id + '&name=' + name);
    }

    function remove ( id ) {
        return $http.get('Loadout/Delete?id=' + id);
    }

    function updateImageUrl ( id, url ) {
        return $http.get('Loadout/UpdateImageUrl?id=' + id + '&url=' + url);
    }

    function create ( loadout ) {
        return $http.post('Loadout/Create', loadout);
    }

    return {
        byPlayerId: byPlayerId,
        updateName: updateName,
        remove: remove,
        updateImageUrl: updateImageUrl,
        create: create
    }
}]);