angular.module('pb').controller('navigationCtrl', ['$scope', 'NavigationFactory', 'config', 'OidcManager','RoleFactory', 'auth', 'store','$state', function($scope, NavigationFactory, config, OidcManager, RoleFactory, auth, store, $state) {

    $scope.NavigationFactory = NavigationFactory;
    $scope.version = config.version;
    //$scope.profile = OidcManager.profile;
    $scope.config = config;
    $scope.role = RoleFactory;

    //window.profile = $scope.profile;
    $scope.auth = auth;

    $scope.userId = store.get('pbUserId');



    $scope.logout = function () {
        //OidcManager.removeToken();
        //OidcManager.redirectForLogout();
        //OidcManager.logou
        //window.location = config.baseUrl;
        auth.signout();
        store.remove('profile');
        store.remove('token');
        store.remove('pbUserId');
        store.remove('refreshToken');
        $state.go('login');
    }
}]);