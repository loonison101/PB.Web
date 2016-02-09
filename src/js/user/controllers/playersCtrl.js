angular.module('pb').controller('playersCtrl', [ '$scope', '$http', 'Notification', 'UserFactory','titleFactory','RoleFactory', function ( $scope, $http, Notification, UserFactory, titleFactory, RoleFactory ) {

    titleFactory.set('View Players');

    $scope.model = {
        players: [],
        isLoading: false
    };

    $scope.role = RoleFactory;

    function loadPlayers () {
        $scope.model.isLoading = true;

        UserFactory.getAll().then(function (response) {
            $scope.model.isLoading = false;

            $scope.model.players = response.data;
        });

    }

    $scope.loadPlayers = loadPlayers;

    $scope.loadPlayers();

    $scope.deletePlayer = function ( player ) {

        if ( confirm('Are you sure?') ) {

            UserFactory.remove(player.Id).then(function () {
                $scope.model.players.splice($scope.model.players.indexOf(player), 1);

                Notification.success('Player Deleted!');
            });
        }
    };

}]);