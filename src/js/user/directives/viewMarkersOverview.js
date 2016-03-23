angular.module('pb').directive('viewMarkersOverview', ['$timeout', 'MarkerFactory','RoleFactory', function ($timeout,MarkerFactory, RoleFactory) {
    return {
        restrict: 'A',
        templateUrl: 'js/user/directives/views/viewMarkersOverview.html',
        replace:true,
        scope: {
            playerId: '='
        },
        link: function ($scope, $element) {
            // Show markers (pic of the marker, name, manufacturer
            // Used in n loadouts or say used in all loadouts
            $scope.role = RoleFactory;

            $scope.vm = {
                markers: [],
                isLoadingMarkers: false
            };

            $scope.markeradded = function () {
                loadMarkers();
            };

            $scope.markerdeleted = function () {
                loadMarkers();
            };

            function loadMarkers () {
                $scope.vm.isLoadingMarkers = true;

                //var userId = $scope.playerId == void 0 ? window._app.userId : $scope.playerId;


                MarkerFactory.byUserId($scope.playerId).then(function (response) {
                    $scope.vm.isLoadingMarkers = false;

                    $scope.vm.markers = response.data;
                });


            }

            $scope.$watch('playerId', function (nv,ov) {


                if (nv != void 0) {
                    loadMarkers();
                }
            });

            $scope.prettyDate = function ( d ) {
                return moment(d).calendar();
            };
        }
    }
}]);

angular.module('pb').directive('addMarker', ['$uibModal', function ($modal) {
    return {
        restrict: 'A',
        templateUrl: 'js/user/directives/views/addMarker.html',
        replace:true,
        scope: {
            markeradded: '&',
            playerId: '='
        },
        link: function ($scope, $element) {
            $scope.addMarker = function () {
                $modal.open({
                    templateUrl: 'addMarkerModal.html',
                    controller: function ($scope,$uibModalInstance, markerAdded, playerId, MarkerFactory, uuid2) {
                        $scope.vm = {
                            isSaving: false,
                            marker: {
                                Id: uuid2.newguid(),
                                PlayerId: playerId,
                                Name: '',
                                Manufacturer: '',
                                ImageUrl: ''
                            }
                        };

                        $scope.ok = function () {
                            $scope.vm.isSaving = true;

                            MarkerFactory.create($scope.vm.marker).then(function (response) {
                                console.log('response', response);

                                $scope.vm.isSaving = false;
                                $uibModalInstance.dismiss('cancel');
                                markerAdded();

                            });
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        }
                    },
                    resolve: {
                        markerAdded: function () {
                            return $scope.markeradded;
                        },
                        playerId: function () {
                            return $scope.playerId;
                        }
                    }
                })
            }
        }
    }
}]);

angular.module('pb').directive('editMarker', ['$uibModal', function ($modal) {
    return {
        restrict: 'A',
        templateUrl: 'js/user/directives/views/editMarker.html',
        replace: true,
        scope: {
            marker: '='
        },
        link: function ($scope, $element) {

            $scope.saveMarker = function () {
                $modal.open({
                    templateUrl: 'editMarkerModal.html',
                    controller: function ($scope, $uibModalInstance, marker, MarkerFactory) {

                        $scope.vm = {
                            isSaving: false,
                            marker: marker
                        };

                        $scope.ok = function () {

                            //MarkerFactory.create($scope.vm.marker).then(function (response) {
                            //    console.log('response', response);
                            //
                            //    $scope.vm.isSaving = false;
                            //});

                            $scope.vm.isSaving = true;

                            MarkerFactory.update($scope.vm.marker).then(function (response) {
                                $scope.vm.isSaving = false;

                                console.log('response', response);

                                $uibModalInstance.dismiss('cancel');
                            });

                            console.log('save it!!');
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        }
                    },
                    resolve: {
                        marker: $scope.marker
                    }
                })



            };
        }
    }
}]);

angular.module('pb').directive('deleteMarker', ['MarkerFactory', function ( MarkerFactory ) {
    return {
        restrict: 'A',
        template: '<button class="btn btn-xs btn-danger" ng-click="deleteMarker()"><i class="fa fa-close fa-fw"></i>Delete</button>',
        replace: true,
        scope: {
            markerid: '=',
            markerdeleted: '&'
        },
        link: function ($scope) {
            $scope.vm = {
                markerId: null
            };

            $scope.$watch('markerid', function (nv,ov) {
                $scope.vm.markerId = nv;

            });

            $scope.deleteMarker = function () {
                if (window.confirm('Are you sure?')) {
                    console.log('delete', $scope.vm.markerId);
                    MarkerFactory.remove($scope.vm.markerId).then(function (response) {
                        console.log('response', response);

                        $scope.markerdeleted();
                    });
                }
            };
        }
    }
}]);