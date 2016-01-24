angular.module('pb').controller('navigationCtrl', ['$scope', 'NavigationFactory', 'config', 'OidcManager', function($scope, NavigationFactory, config, OidcManager) {

    $scope.NavigationFactory = NavigationFactory;
    $scope.version = config.version;
    $scope.profile = OidcManager.profile;
    $scope.config = config;

    window.profile = $scope.profile;

    $scope.logout = function () {
        OidcManager.removeToken();
        window.location = config.baseUrl;
    }
}]);