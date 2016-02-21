angular.module('pb').factory('TeamFactory', ['$http', 'config', 'OidcManager','store', function ($http, config, OidcManager, store) {

    function loadById ( teamId ) {
        return $http.get(config.apiUrl + 'v1/Team/ById?id=' + teamId);
    }

    function removeUser ( teamId ) {
        return $http.get(config.apiUrl + 'v1/Team/RemoveUser?userId=' + store.get('pbUserId') + '&teamId=' + teamId);
    }

    function update ( team ) {
        return $http.put(config.apiUrl + 'v1/Team/Update', team);
    }

    function getAll(){
        return $http.get(config.apiUrl + 'v1/Team/Get');
    }

    function addOrRemoveTeam ( teamId ) {
        return $http.get(config.apiUrl + 'v1/Team/AddOrRemoveTeam?userId=' + store.get('pbUserId') + '&teamId=' + teamId);
    }

    function setDefaultTeam ( teamId ) {
        return $http.get(config.apiUrl + 'v1/Team/SetDefaultTeam?userId=' + store.get('pbUserId') + '&teamId=' + teamId);
    }

    function create ( team ) {
        return $http.post(config.apiUrl + 'v1/Team/Create', team);
    }

    function remove ( teamId ) {
        return $http.get(config.apiUrl + 'v1/Team/Delete?id=' + teamId);
    }

    return {
        load: loadById,
        removeUser: removeUser,
        update: update,
        getAll: getAll,
        addOrRemoveTeam: addOrRemoveTeam,
        setDefaultTeam: setDefaultTeam,
        create: create,
        remove: remove
    }
}]);