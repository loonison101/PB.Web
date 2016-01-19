angular.module('pb').controller('playersCtrl', [ '$scope', '$http', 'Notification', function ( $scope, $http, Notification ) {
    $scope.model = {
        players: [],
        isLoading: false
    };

    function loadPlayers () {
        $scope.model.isLoading = true;
        $http.get('User/Get').then(function ( response ) {
            $scope.model.isLoading = false;

            $scope.model.players = response.data.Data;
        });

    }

    $scope.loadPlayers = loadPlayers;

    $scope.loadPlayers();

    $scope.deletePlayer = function ( player ) {
        console.log('delte player', player);

        if ( confirm('Are you sure?') ) {
            $http.get('User/Delete?id=' + player.Id).then(function ( response ) {
                //$scope.model.players.splice(player);

                $scope.model.players.splice($scope.model.players.indexOf(player), 1);

                Notification.success('Player Deleted!');
            });
        }


    };

}]);