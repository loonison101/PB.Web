angular.module('pb').factory('TeamFactory', ['$http', function ($http) {

    function loadById ( teamId ) {
        return $http.get('Team/ById?id=' + teamId);
    }

    return {
        load: loadById
    }
}]);