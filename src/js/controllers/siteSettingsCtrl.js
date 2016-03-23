angular.module('pb').controller('siteSettingsCtrl', ['titleFactory','auth', '$scope', function (titleFactory, auth, $scope) {

    titleFactory.set('Site Settings');

    $scope.auth = auth;

}]);