angular.module('pb').controller('userViewCtrl', ['$scope', 'UserFactory', '$http', '$uibModal', 'Notification', '$stateParams', 'OidcManager','titleFactory', function ($scope, UserFactory, $http, $modal, Notification, $stateParams, OidcManager, titleFactory) {

    titleFactory.set('View Player');

    $scope.vm = {
        isLoading: false,
        wasUserFound: false,
        user: null,
        playerId: $stateParams.id
    };

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

        $scope.vm.isLoading = true;
        fn($stateParams.id).then(function (response) {

            $scope.vm.isLoading = false;

            // Didn't find a user
            if ( response == void 0 ){
                $scope.vm.wasUserFound = false;
                return;
            }

            $scope.vm.wasUserFound = true;
            $scope.vm.user = response.data;

        });
    }

    $scope.loadUser = loadUser;

    $scope.deleteTeam = function (userTeamId) {

        var result = confirm('Are you sure?');

        if (result) {

            UserFactory.removeTeam(userTeamId).then(function(){
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
            controller: function ($scope, $uibModalInstance, user, $http) {
                $scope.user = user;
                $scope.isLoading = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    UserFactory.update($scope.user).then(function(){
                        $uibModalInstance.dismiss('cancel');
                        loadUser();
                    })
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
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
            controller: function ($scope, $uibModalInstance, user, $http){
                $scope.user = user;
                $scope.password = null;
                $scope.retype = null;
                $scope.isLoading = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    UserFactory.setPassword($scope.user.Id, $scope.password).then(function() {
                        $uibModalInstance.dismiss('cancel');
                        loadUser();
                    });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        })
    };

    $scope.changeDefaultTeam = function (team) {
        console.log('default team', team);
        Notification.primary('Saving...');

        UserFactory.setDefaultTeam(OidcManager.profile.sub, team.TeamId).then(function () {
            Notification.clearAll();
            Notification.success({ message: 'Success', delay: 2000 });

            $scope.loadUser();
        })
    };

    $scope.loadUser();

    $scope.$watch('user', function (nv,ov) {
        if (nv != void 0 && nv.Callsign != void 0) {
            titleFactory.set('Player: ' + nv.Callsign);
        }

    });

}]);