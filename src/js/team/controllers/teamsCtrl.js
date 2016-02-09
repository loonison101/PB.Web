angular.module('pb').controller('teamsCtrl', ['$http', '$scope', 'Notification', '$http', '$uibModal', 'config','TeamFactory','titleFactory','RoleFactory', function ($http, $scope, Notification, $http, $modal, config, TeamFactory,titleFactory, RoleFactory) {

    titleFactory.set('View Teams');

    $scope.teams = [];
    $scope.canAddOrRemove = true;
    $scope.isLoading = false;
    $scope.role = RoleFactory;

    function loadTeams() {
        $scope.isLoading = true;

        TeamFactory.getAll().then(function (response) {
            $scope.isLoading = false;
            $scope.teams = response.data;
        });
    }

    $scope.loadTeams = loadTeams;

    $scope.addOrRemoveTeam = function (team) {
        console.log('add or remove team', team);
        Notification.primary('Saving...');

        angular.forEach($scope.teams, function (team) {
            team.canAddOrRemove = false;
        });

        TeamFactory.addOrRemoveTeam(team.Id).then(function () {
            Notification.clearAll();
            Notification.success({ message: 'Success', delay: 2000 });

            $scope.loadTeams();
        });
    };

    $scope.changeDefaultTeam = function (team) {
        console.log('default team', team);
        Notification.primary('Saving...');

        angular.forEach($scope.teams, function (team) {
            team.canAddOrRemove = false;
        });

        TeamFactory.setDefaultTeam(team.Id).then(function () {
            Notification.clearAll();
            Notification.success({ message: 'Success', delay: 2000 });

            $scope.loadTeams();
        });
    };

    $scope.loadTeams();

    $scope.createTeam = function () {
        $modal.open({
            templateUrl: 'addTeam.html',
            controller: function ($scope, $uibModalInstance, $http, TeamFactory) {

                $scope.teamName = null;
                $scope.isLoading = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    TeamFactory.create({ Name: $scope.teamName }).then(function () {
                        $uibModalInstance.dismiss('cancel');
                        loadTeams();
                    });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            size: 'small'
        })
    };

    $scope.deleteTeam = function (team) {

        $modal.open({
            templateUrl: 'deleteTeam.html',
            controller: function ($scope, $uibModalInstance, $http, team) {
                $scope.team = team;
                $scope.isLoading = false;

                $scope.ok = function () {
                    console.log('delete team', team);
                    $scope.isLoading = true;

                    TeamFactory.remove(team.Id).then(function () {
                        $uibModalInstance.dismiss('cancel');
                        loadTeams();
                    });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            resolve: {
                team: team
            }
        })
    };
}]);