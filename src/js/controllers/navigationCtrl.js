angular.module('pb').controller('navigationCtrl', ['$scope', 'NavigationFactory', 'config', function($scope, NavigationFactory, config) {

    $scope.NavigationFactory = NavigationFactory;
    $scope.version = config.version;
}]);