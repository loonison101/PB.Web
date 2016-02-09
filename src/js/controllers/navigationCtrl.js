angular.module('pb').controller('navigationCtrl', ['$scope', 'NavigationFactory', 'config', 'OidcManager','RoleFactory', function($scope, NavigationFactory, config, OidcManager, RoleFactory) {

    $scope.NavigationFactory = NavigationFactory;
    $scope.version = config.version;
    $scope.profile = OidcManager.profile;
    $scope.config = config;
    $scope.role = RoleFactory;

    //window.profile = $scope.profile;

    $scope.logout = function () {
        //OidcManager.removeToken();
        OidcManager.redirectForLogout();
        //OidcManager.logou
        //window.location = config.baseUrl;
    }
}]);