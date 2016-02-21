angular.module('pb').factory('UserFactory', ['$http', '$window', 'config','OidcManager','store', function ($http, $window, config, OidcManager, store) {

    function loadUser ( userId ) {
        return $http.get(config.apiUrl +  'v1/Player/ById?id=' + userId);
    }

    function loadWithCurrentId (){
        //if (OidcManager.profile == void 0) OidcManager.redirectForToken();

        return $http.get(config.apiUrl + 'v1/Player/ById?id=' + store.get('pbUserId'));
    }

    function getAll() {
        return $http.get(config.apiUrl + 'v1/Player');
    }

    function remove ( id ) {
        return $http.get(config.apiUrl + 'v1/Player/Delete?id=' + id);
    }

    function removeTeam ( userTeamId ) {
        return $http.get(config.apiUrl + 'v1/Player/RemoveTeam?userTeamId=' + userTeamId);
    }

    function update ( player ) {
        //return $http.put(config.apiUrl + 'v1/Player/Update?id=' + player.Id, player);
        //return $http({
        //    method: 'POST',
        //    url: config.apiUrl + 'v1/Player/Update',//?id=' + player.Id,
        //    //data: JSON.stringify({
        //    //    value: player
        //    //})
        //    data: player
        //});
        return $http.put(config.apiUrl + 'v1/Player/Update', player);
    }

    function setPassword ( userId, password ) {
        return $http.get(config.apiUrl + 'v1/Player/SetPassword?userId=' + userId + '&password=' + password);
    }

    function setDefaultTeam ( userId, teamId ) {
        return $http.get(config.apiUrl + 'v1/Player/SetDefaultTeam?userId=' + userId + '&teamId=' + teamId);
    }

    return {
        load: loadUser,
        loadWithCurrentId: loadWithCurrentId,
        getAll: getAll,
        remove: remove,
        removeTeam: removeTeam,
        update: update,
        setPassword: setPassword,
        setDefaultTeam: setDefaultTeam
    }
}]);