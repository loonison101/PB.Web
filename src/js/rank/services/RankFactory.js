angular.module('pb').factory('RankFactory', ['$http', function ($http) {

    function loadRanks ( teamId ) {
        return $http.get('Rank/ByTeamId?id=' + teamId);
    }

    function saveRanks ( rankModels ) {
        return $http.post('Rank/Update', rankModels);
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
        save: saveRanks
    }
}]);