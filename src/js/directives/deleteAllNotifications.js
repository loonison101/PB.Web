angular.module('pb').directive('deleteAllNotifications', [ '$http', 'config', 'Notification', function ( $http, config, Notification ) {
    return {
        template: '<button class="btn btn-danger" ng-click="delete()">Delete All Notifications</button>',
        restrict: 'A',
        replace: true,
        link: function ( $scope ){
            $scope.delete = function () {
                var result = window.confirm('Are you sure?');

                if (result){
                    $http.get(config.apiUrl + 'v1/Notifications/DeleteAll').then(function (response) {
                        console.log(response);
                        Notification.success("Delete all notifications!");
                    })
                }
            }
        }
    }
}]);