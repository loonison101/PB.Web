angular.module('pb').controller('userEditCtrl', ['$scope', 'UserFactory', function ($scope, UserFactory) {
    $scope.foundUser = true;

    $scope.user = null;

    UserFactory.loadWithCurrentId().then(function (response){
        console.log('userloaded', response.data.Data);

        response.data.Data.Modified = parseInt(response.data.Data.Modified.substr(6));
        response.data.Data.Created = parseInt(response.data.Data.Created.substr(6));

        $scope.user = response.data.Data;
    });
}]);