angular.module('pb').factory('LoadoutFactory', ['$http', 'config', function ($http, config) {

    function byPlayerId ( playerId ) {
        return $http.get(config.apiUrl + 'v1/Loadout/ByPlayerId?id=' + playerId)
    }

    function updateName (id, name) {
        return $http.get(config.apiUrl + 'v1/Loadout/UpdateName?id=' + id + '&name=' + name);
    }

    function remove ( id ) {
        return $http.get(config.apiUrl + 'v1/Loadout/Delete?id=' + id);
    }

    function updateImageUrl ( id, url ) {
        return $http.get(config.apiUrl + 'v1/Loadout/UpdateImageUrl?id=' + id + '&url=' + url);
    }

    function create ( loadout ) {
        return $http.post(config.apiUrl + 'v1/Loadout/Create', loadout);
    }

    return {
        byPlayerId: byPlayerId,
        updateName: updateName,
        remove: remove,
        updateImageUrl: updateImageUrl,
        create: create
    }
}]);