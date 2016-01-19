angular.module('pb').controller('rankViewCtrl', ['$scope', 'RankFactory', '$stateParams', 'TeamFactory', function ($scope, RankFactory, $stateParams, TeamFactory) {

    console.log('state params', $stateParams);

    $scope.ranks = [];
    $scope.team = null;
    $scope.rankId = $stateParams.highlightId;

    TeamFactory.load($stateParams.teamId).then(function (response) {
        $scope.team = response.data.Data;
    });

    RankFactory.load($stateParams.teamId).then(function (response) {
        console.log('ranks', response.data.Data);
        $scope.ranks = response.data.Data;
    });

}]);