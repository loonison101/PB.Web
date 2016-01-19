angular.module('pb').controller('rankEditCtrl', ['$scope', 'RankFactory', '$stateParams', 'TeamFactory', 'Notification', function ($scope, RankFactory, $stateParams, TeamFactory, Notification) {
    $scope.ranks = [];
    $scope.team = null;
    $scope.rankId = $stateParams.highlightId;

    TeamFactory.load($stateParams.teamId).then(function (response) {
        $scope.team = response.data.Data;
    });

    function load () {
        RankFactory.load($stateParams.teamId).then(function (response) {
            console.log('ranks', response.data.Data);

            angular.forEach(response.data.Data, function (rank) {
                rank.CrudAction = RankFactory.enums.CrudAction.Update;
            });

            $scope.ranks = response.data.Data;
        });
    }
    load();

    $scope.save = function () {
        RankFactory.save($scope.ranks).then(function (response) {
            console.log(response);
            Notification.success('Success! Refreshing data...');

            load();
        });
    };
    $scope.add = function () {
        $scope.ranks.push({
            CrudAction: RankFactory.enums.CrudAction.Create,
            TeamId: $stateParams.teamId
        });
    }
}]);