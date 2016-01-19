angular.module('pb').controller('teamCtrl', ['$scope', '$stateParams', '$http', '$timeout', '$uibModal', 'Upload', '$stateParams', function ($scope, $stateParams, $http, $timeout, $modal, Upload, $stateParams) {
    console.log('loadthis team: ', $stateParams.id);

    $scope.team = null;


    function loadTeam () {

        $http.get('Team/ById?id=' + $stateParams.id).then(function (response) {
            console.log('got team: ', response.data);
            response.data.Data.Modified = parseInt(response.data.Data.Modified.substr(6));
            response.data.Data.Created = parseInt(response.data.Data.Created.substr(6))
            $scope.team = response.data.Data;
        });
    }

    loadTeam();

    $scope.feeds = [];

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
        console.log('create rank');
        $modal.open({
            templateUrl: 'addRank.html',
            controller: function ($scope, $modalInstance, $http, Upload, Notification, $stateParams) {

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
                    $modalInstance.dismiss('cancel');
                };

                $scope.ok = function () {
                    $scope.isLoading = true;

                    $http.post('Rank/Create', $scope.rank).then(function (response) {
                        $scope.isLoading = false;
                        $modalInstance.dismiss('cancel');
                        loadTeam();
                        Notification.success('Created!');
                    });

                };

                // upload on file select or drop
                $scope.upload = function (file) {
                    $scope.isLoadingImage = true;

                    Upload.upload({
                        url: 'Image/Upload',
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
        console.log('delete me: ', rank);

        if (window.confirm('Are you sure?')) {
            $http.get('Rank/Delete?id=' + rank.Id).then(function (response) {
                console.log(response);
                loadTeam();
            });
        }
    };

    $scope.timeSince = function(date) {

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

        $http.get('Rank/SetDefaultRank?userId=' + _app.userId + '&rankId=' + rank.Id + '&teamId=' + rank.TeamId).then(function (response) {
            console.log(response);
            loadTeam();
        });
    };

    $scope.deleteUser = function ( user ) {
        console.log('delete user', user);

        if (window.confirm('Are you sure?')) {
            $http.get('Team/RemoveUser?userId=' + user.Id + '&teamId=' + $stateParams.id).then(function (response) {
                console.log(response);

                loadTeam();
            });
        }

    };

    $scope.editTeam = function () {
        console.log('edit team');

        $modal.open({
            templateUrl: 'editTeam.html',
            controller: function ($scope, $modalInstance, $http, team, Upload, Notification) {
                $scope.team = team;
                $scope.isLoading = false;
                $scope.isUploadingImage = false;

                $scope.ok = function () {
                    $scope.isLoading = true;

                    $http.post('Team/Update', $scope.team).then( function ( response ) {
                        $scope.isLoading = false;
                       console.log('team edit eesponse: ', response);

                        $modalInstance.dismiss('cancel');

                        Notification.success('Updated!');

                    });
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.upload = function ( file ) {
                    $scope.isLoadingImage = true;

                    Upload.upload({
                        url: 'Image/Upload',
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

}]);