angular.module('pb').directive('deleteAllTeams', ['$http',function ($http) {
    return {
        template: '<button class="btn btn-danger" ng-click="deleteAllTeams()">Delete All Teams</button>',
        restrict: 'A',
        replace:true,
        link: function ( $scope ) {
            $scope.deleteAllTeams = function () {
                var result = window.confirm('Are you sure?');

                if (result) {
                    $http.get('Team/DeleteAll', function (response) {
                        console.log(response);
                    });
                }
            };
        }
    }
}]);