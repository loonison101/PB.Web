angular.module('pb').controller('userViewCtrl', ['$scope', 'UserFactory', '$http', '$uibModal', 'Notification', '$stateParams', function ($scope, UserFactory, $http, $modal, Notification, $stateParams) {
    //console.log('userview ctrl');

    $scope.foundUser = true;

    $scope.user = null;

    function loadUser () {
        $scope.user = null;

        var fn,
            validId = true;

        if ( $stateParams.id === '' )
            fn = UserFactory.loadWithCurrentId;
        else {

            if ( !angular.isGuid($stateParams.id) ){
                alert('Invalid id, cannot find user');
            }

            fn = UserFactory.load;
        }


        if ( !validId )
            return;

        //UserFactory.loadWithCurrentId().then(function (response){
        fn($stateParams.id).then(function (response) {

            response.data.Data.Modified = parseInt(response.data.Data.Modified.substr(6));
            response.data.Data.Created = parseInt(response.data.Data.Created.substr(6));

            $scope.user = response.data.Data;

        });
    }

    $scope.loadUser = loadUser;

    $scope.deleteTeam = function (userTeamId) {
        console.log('delte team: ', userTeamId);

        var result = confirm('Are you sure?');

        if (result) {
            $http.get('Home/RemoveTeam?userTeamId=' + userTeamId).then(function (response) {
                console.log('data response: ', response.data);
                $scope.loadUser();
            });

        } else {
            console.log('cancelled');
        }

    };

    $scope.addTeam = function () {
        console.log('add team');
    };

    $scope.editUser = function () {
        $modal.open({
            templateUrl: 'editUser.html',
            resolve: {
                user: function () {
                    return $scope.user;
                }
            },
            controller: function ($scope, $modalInstance, user, $http) {
                $scope.user = user;
                $scope.isLoading = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    $http.post('User/Update', $scope.user).then(function (response) {
                        console.log(response);
                        $modalInstance.dismiss('cancel');
                        loadUser();
                    });
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        })
    };

    $scope.resetPassword = function () {
        $modal.open({
            templateUrl: 'resetPassword.html',
            resolve: {
                user: function () {
                    return $scope.user;
                }
            },
            controller: function ($scope, $modalInstance, user, $http){
                $scope.user = user;
                $scope.password = null;
                $scope.retype = null;
                $scope.isLoading = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    //$http.post('User/Update', $scope.user).then(function (response) {
                    //    console.log(response);
                    //    $modalInstance.dismiss('cancel');
                    //    loadUser();
                    //});

                    $http.get('User/SetPassword?userId=' + $scope.user.Id + '&password=' + $scope.password).then(function (response) {
                        console.log(response);
                        $modalInstance.dismiss('cancel');
                        loadUser();
                    });
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        })
    };

    $scope.changeDefaultTeam = function (team) {
        console.log('default team', team);
        Notification.primary('Saving...');

        //angular.forEach($scope.teams, function (team) {
        //    team.canAddOrRemove = false;
        //});

        //angular.forEach($scope.teams, function (team) {
        //    if (team.Id != team.Id) {
        //        team.IsDefault = false;
        //    }
        //});

        $http.get('Home/SetDefaultTeam?userId=' + _app.userId + '&teamId=' + team.TeamId).then(function (response) {

            Notification.clearAll();
            Notification.success({ message: 'Success', delay: 2000 });

            //angular.forEach($scope.teams, function (team) {
            //    team.canAddOrRemove = true;
            //});
            //$scope.loadTeams();
            $scope.loadUser();

        });
    };

    $scope.loadUser();

    $scope.$watch(function () {
        return $scope.user;
    }, function (nv, ov) {
        if (!angular.equals(nv, ov)) {

        }
    }, true);

}]);