angular.module('pb').controller('teamsCtrl', ['$http', '$scope', 'Notification', '$http', '$uibModal', function ($http, $scope, Notification, $http, $modal) {
    $scope.teams = [];
    $scope.canAddOrRemove = true;
    $scope.isLoading = false;


    function loadTeams() {
        $scope.isLoading = true;
        $http.get('Team/Get').then(function (response) {
            $scope.isLoading = false;
            console.log('teams: ', response.data);
            $scope.teams = response.data.Data;
        })
    };

    $scope.loadTeams = loadTeams;

    $scope.addOrRemoveTeam = function (team) {
        console.log('add or remove team', team);
        Notification.primary('Saving...');

        angular.forEach($scope.teams, function (team) {
            team.canAddOrRemove = false;
        });

        $http.get('Home/AddOrRemoveTeam?userId=' + _app.userId + '&teamId=' + team.Id).then(function (response) {
            Notification.clearAll();
            Notification.success({ message: 'Success', delay: 2000 });

            //angular.forEach($scope.teams, function (team) {
            //    team.canAddOrRemove = true;
            //});
            $scope.loadTeams();
        });

    };

    $scope.changeDefaultTeam = function (team) {
        console.log('default team', team);
        Notification.primary('Saving...');

        angular.forEach($scope.teams, function (team) {
            team.canAddOrRemove = false;
        });

        //angular.forEach($scope.teams, function (team) {
        //    if (team.Id != team.Id) {
        //        team.IsDefault = false;
        //    }
        //});

        $http.get('Home/SetDefaultTeam?userId=' + _app.userId + '&teamId=' + team.Id).then(function (response) {

            Notification.clearAll();
            Notification.success({ message: 'Success', delay: 2000 });

            //angular.forEach($scope.teams, function (team) {
            //    team.canAddOrRemove = true;
            //});
            $scope.loadTeams();

        });
    };
    //window.notification = Notification;

    $scope.loadTeams();

    //$scope.$watch(function () {
    //    return $scope.teams;
    //}, function (nv, ov) {
    //    if (!angular.equals(nv, ov))
    //        console.log('teams changed', nv);
    //},true);

    $scope.createTeam = function () {
        console.log('create');
        $modal.open({
            templateUrl: 'addTeam.html',
            controller: function ($scope, $modalInstance, $http) {

                $scope.teamName = null;
                $scope.isLoading = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    $http.post('Team/Create', { Name: $scope.teamName }).then(function (response) {
                        console.log('created');

                        $modalInstance.dismiss('cancel');
                        loadTeams();

                    });
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            size: 'small'
        })
    };

    $scope.deleteTeam = function (team) {

        $modal.open({
            templateUrl: 'deleteTeam.html',
            controller: function ($scope, $modalInstance, $http, team) {
                $scope.team = team;
                $scope.isLoading = false;

                $scope.ok = function () {
                    console.log('delete team', team);
                    $scope.isLoading = true;
                    $http.get('Team/Delete?id=' + team.Id).then(function (response) {
                        $modalInstance.dismiss('cancel');
                        loadTeams();
                    })
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                team: team
            }
        })
    };
}]);