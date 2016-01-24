angular.module('pb').directive('deleteAllTeams', ['$http', 'config', 'Notification', function ($http, config, Notification) {
    return {
        template: '<button class="btn btn-danger" ng-click="deleteAllTeams()">Delete All Teams</button>',
        restrict: 'A',
        replace:true,
        link: function ( $scope ) {
            $scope.deleteAllTeams = function () {
                var result = window.confirm('Are you sure?');

                if (result) {
                    $http.get(config.apiUrl + 'v1/Team/DeleteAll').then(function (response) {
                        console.log(response);
                        Notification.success('Deleted all teams!');
                    });
                }
            };
        }
    }
}]);