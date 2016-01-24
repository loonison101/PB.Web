angular.module('pb').factory('RankFactory', ['$http','config','OidcManager', function ($http, config, OidcManager) {

    function loadRanks ( teamId ) {
        return $http.get('Rank/ByTeamId?id=' + teamId);
    }

    function saveRanks ( rankModels ) {
        return $http.post('Rank/Update', rankModels);
    }

    function create ( rank ) {
        return $http.post(config.apiUrl + 'v1/Rank/Create', rank);
    }

    function remove  ( id ) {
        return $http.get(config.apiUrl + 'v1/Rank/Delete?id=' + id);
    }

    function setDefaultRank ( rankId, teamId ) {
        return $http.get(config.apiUrl + 'v1/Rank/SetDefaultRank?userId=' + OidcManager.profile.sub + '&rankId=' + rankId + '&teamId=' + teamId);
    }

    return {
        load: loadRanks,
        enums: {
            CrudAction: {
                NotInitialized: 0,
                Update: 1,
                Create: 2,
                Delete: 3
            }
        },
        save: saveRanks,
        create: create,
        remove: remove,
        setDefaultRank: setDefaultRank
    }
}]);