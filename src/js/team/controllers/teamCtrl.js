angular.module('pb').controller('teamCtrl', ['$scope', '$stateParams', '$http', '$timeout', '$uibModal', 'Upload', '$stateParams','TeamFactory','OidcManager', 'config','RankFactory','titleFactory', function ($scope, $stateParams, $http, $timeout, $modal, Upload, $stateParams, TeamFactory, OidcManager, config, RankFactory, titleFactory) {

    titleFactory.set('View Team');

    $scope.team = null;
    $scope.feeds = [];

    function loadTeam () {
        TeamFactory.load($stateParams.id).then(function(response){
            $scope.team = response.data;
        });
    }

    loadTeam();

    //$timeout(function () {
    //    console.log('execute feed request');
    //    window.FB.api('/603375933037774/feed', function (response) {
    //        console.log('feed request gotten', response);
    //        $scope.$apply(function () {
    //            $scope.feeds = response.data;
    //        })
    //    });
    //}, 5000);

    $scope.createRank = function () {
        $modal.open({
            templateUrl: 'addRank.html',
            controller: function ($scope, $uibModalInstance, $http, Upload, Notification, $stateParams, RankFactory, config) {

                $scope.file = null;
                $scope.isUploadingImage = false;
                $scope.isLoading = false;
                $scope.rank = {
                    TeamId: $stateParams.id
                };

                $scope.submit = function () {
                    if ( $scope.file) {
                        $scope.upload($scope.file);
                    }
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.ok = function () {
                    $scope.isLoading = true;

                    RankFactory.create($scope.rank).then(function(){
                        $scope.isLoading = false;
                        $uibModalInstance.dismiss('cancel');
                        loadTeam();
                        Notification.success('Created!');
                    });
                };

                // upload on file select or drop
                $scope.upload = function (file) {
                    $scope.isLoadingImage = true;

                    Upload.upload({
                        url: config.apiUrl + 'v1/Image/Upload',
                        data: { file: file, 'username': $scope.username }
                    }).then(function (resp) {

                        $scope.isLoading = false;

                        if ( resp.data.HasErrors ) {
                            Notification.error(resp.data.CombinedErrors);
                        } else {
                            Notification.success('Uploaded!');
                            $scope.rank.ImageUrl = resp.data.Data.substr(1);
                            $scope.hideImageUpload = true;
                        }


                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    }, function (resp) {

                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                };
            },
            size: 'small'
        });
    };

    // upload later on form submit or something similar
    console.log('action', $stateParams.action);

    switch ($stateParams.action) {
        case 'createRank':
            $scope.createRank();
            break;
    }

    $scope.deleteRank = function ( rank ) {
        if (window.confirm('Are you sure?')) {
            RankFactory.remove(rank.Id).then(function(){
                loadTeam();
            });
        }
    };

    $scope.timeSince = function(date) {

        return moment(date).startOf('hour').fromNow();

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    };

    $scope.changeRank = function ( rank ) {
        console.log('change rank', rank);

        //$http.get('Rank/SetDefaultRank?userId=' + OidcManager.profile.sub + '&rankId=' + rank.Id + '&teamId=' + rank.TeamId).then(function (response) {
        //    console.log(response);
        //    loadTeam();
        //});

        RankFactory.setDefaultRank(rank.Id, rank.TeamId).then(function (){
            loadTeam();
        });
    };

    $scope.deleteUser = function ( user ) {
        console.log('delete user', user);

        if (window.confirm('Are you sure?')) {
            TeamFactory.removeUser($stateParams.id).then(function () {
                loadTeam();
            });
        }
    };

    $scope.editTeam = function () {

        $modal.open({
            templateUrl: 'editTeam.html',
            controller: function ($scope, $uibModalInstance, $http, team, Upload, Notification, TeamFactory, config) {
                $scope.team = team;
                $scope.isLoading = false;
                $scope.isUploadingImage = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    TeamFactory.update(team).then(function (){
                        $scope.isLoading = false;

                        $uibModalInstance.dismiss('cancel');

                        Notification.success('Updated!');
                    });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.upload = function ( file ) {
                    $scope.isLoadingImage = true;

                    Upload.upload({
                        url: config.apiUrl + 'v1/Image/Upload',
                        data: { file: file }
                    }).then( function (resp) {
                        $scope.isLoadingImage = false;

                        if ( resp.data.HasErrors ) {
                            Notification.error(resp.data.CombinedErrors);
                        } else {
                            Notification.success('Uploaded!');
                            $scope.team.ImageUrl = resp.data.Data.substr(1);
                            $scope.hideImageUpload = true;
                        }
                    })
                }
            },
            resolve: {
                team: $scope.team
            }
        })
    };

    $scope.$watch('team', function(nv) {
        if (nv != void 0 && nv.Name != void 0) {
            titleFactory.set('Team: ' + nv.Name);
        }
    });
}]);