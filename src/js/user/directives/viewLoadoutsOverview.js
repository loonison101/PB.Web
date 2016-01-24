angular.module('pb').directive('viewLoadoutsOverview', ['$timeout', '$uibModal', 'LoadoutFactory', function ($timeout, $modal, LoadoutFactory) {
    return {
        restrict: 'A',
        templateUrl: 'js/user/directives/views/viewLoadoutsOverview.html',
        replace: true,
        scope: {
            playerId: '='
        },
        link: function ($scope, $element) {

            $scope.vm = {
                loadouts: [],
                isLoadingLoadouts: false
            };

            $scope.prettyDate = function (d) {
                return moment(d).calendar();
            };

            function loadLoadouts() {
                $scope.vm.isLoadingLoadouts = true;

                LoadoutFactory.byPlayerId($scope.playerId).then(function (response) {
                    $scope.vm.isLoadingLoadouts = false;
                    $scope.vm.loadouts = response.data;
                });
            }

            $scope.createLoadout = function () {
                $modal.open({
                    templateUrl: 'createLoadout.html',
                    controller: function ($scope, playerId, $uibModalInstance, loadLoadouts) {
                        $scope.vm = {
                            isLoading: false,
                            loadout: {
                                PlayerId: playerId
                            }
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.close('dismiss');
                        };

                        $scope.ok = function () {
                            console.log('create me', $scope.vm.loadout);

                            LoadoutFactory.create($scope.vm.loadout).then(function (response) {
                                console.log('response', response);

                                //window.location.reload();
                                $uibModalInstance.close('dismiss');
                                loadLoadouts();
                            });

                        };
                    },
                    resolve: {
                        playerId: function () {
                            return $scope.playerId;
                        },
                        loadLoadouts: function () {
                            return loadLoadouts;
                        }
                    }
                });
            };

            $scope.changeLoadoutImage = function (loadout) {
                $modal.open({
                    templateUrl: 'changeLoadoutImage.html',
                    controller: function ($scope, $uibModalInstance, loadout) {

                        var backup = angular.copy(loadout);

                        $scope.vm = {
                            isLoading: false,
                            loadout: loadout
                        };

                        $scope.cancel = function () {
                            $scope.vm.loadout.ImageUrl = backup.ImageUrl;
                            $uibModalInstance.close('dismiss');
                        };

                        $scope.ok = function () {
                            LoadoutFactory.updateImageUrl($scope.vm.loadout.Id, $scope.vm.loadout.ImageUrl).then(function () {
                                $uibModalInstance.close('dismiss');
                            })
                        };

                    },
                    resolve: {
                        loadout: loadout
                    }
                })
            };

            $scope.$watch('playerId', function (nv) {
                if (nv != void 0) {
                    loadLoadouts();
                }
            });

            $scope.deleteLoadout = function (loadout) {
                if (window.confirm('Are you sure?')) {
                    LoadoutFactory.remove(loadout.Id).then(function (response) {
                        //window.location.reload();

                        loadLoadouts();
                    });
                }
            };

            $scope.changeLoadoutName = function ($data, loadoutId) {

                //return $http.get('Loadout/UpdateName?id=' + $scope.playerId + '&name=' + $data);
                return LoadoutFactory.updateName(loadoutId, $data);
            };
        }
    }
}]);

angular.module('pb').directive('viewGears', ['$uibModal', 'GearFactory', 'uuid2', function ($modal, GearFactory, uuid2) {
    return {
        restrict: 'A',
        templateUrl: 'js/user/directives/views/viewGears.html',
        replace: true,
        scope: {
            gears: '=',
            section: '=',
            editing: '=',
            loadoutId: '='
        },
        link: function ($scope, $element) {
            $scope.prettyDate = function (d) {
                return moment(d).calendar();
            };

            $scope.vm = {
                doesAnyExist: false
            };


            $scope.$watchCollection('gears', function () {
                $scope.vm.doesAnyExist = false;

                angular.forEach($scope.gears, function (gear) {
                    if (gear.Section == $scope.section) {
                        $scope.vm.doesAnyExist = true;
                    }

                });
            });

            $scope.addGear = function () {
                $modal.open({
                    templateUrl: 'addGear.html',
                    controller: function ($scope, $uibModalInstance, gears, section, loadoutId) {
                        $scope.vm = {
                            section: section,
                            isLoading: false,
                            gear: {
                                Id: uuid2.newguid(),
                                Name: '',
                                Manufacturer: '',
                                ImageUrl: '',
                                Quantity: 1,
                                Section: section,
                                LoadoutId: loadoutId
                            }
                        };

                        $scope.ok = function () {
                            console.log('add gear', $scope.vm.gear);
                            //gears.push($scope.vm.gear);
                            GearFactory.create($scope.vm.gear).then(function (response) {
                                gears.unshift($scope.vm.gear);
                                $uibModalInstance.close('dismiss');
                                //window.location.reload();
                            });

                        };

                        $scope.cancel = function () {
                            $uibModalInstance.close('dismiss');
                        }
                    },
                    resolve: {
                        gears: function () {
                            return $scope.gears;
                        },
                        section: function () {
                            return $scope.section;
                        },
                        loadoutId: function () {
                            return $scope.loadoutId;
                        }
                    }
                });
            };

            $scope.editGear = function (gear) {
                $modal.open({
                    templateUrl: 'editGear.html',
                    controller: function ($scope, $uibModalInstance, gear) {
                        console.log('gear is', gear);

                        $scope.vm = {
                            isLoading: false,
                            gear: gear
                        };

                        $scope.ok = function () {
                            GearFactory.update($scope.vm.gear).then(function (response) {
                                $uibModalInstance.close('dismiss');
                                //window.location.reload();
                            });


                        };

                        $scope.cancel = function () {
                            $uibModalInstance.close('dismiss');
                        }

                    },
                    resolve: {
                        gear: function () {
                            return gear;
                        }
                    }
                })
            };

            $scope.removeGear = function (gear) {
                if (window.confirm('Are you sure?')) {
                    GearFactory.remove(gear.Id).then(function (response) {
                        //window.location.reload();
                        var index = $scope.gears.indexOf(gear);

                        if (index > -1){
                            $scope.gears.splice(index,1);
                        }
                    })
                }
            }
        }
    }
}]);

angular.module('pb').directive('loadoutHeader', [function () {
    return {
        templateUrl: 'js/user/directives/views/loadoutHeader.html',
        replace: true
    }
}]);

angular.module('pb').directive('loadoutActions', [function () {
    return {
        templateUrl: 'js/user/directives/views/loadoutActions.html',
        replace: true
    }
}]);

angular.module('pb').directive('loadoutImage', [function () {
    return {
        templateUrl: 'js/user/directives/views/loadoutImage.html',
        replace: true
    }
}]);

angular.module('pb').directive('gearRow', [function () {
    return {
        templateUrl: 'js/user/directives/views/gearRow.html',
        replace: true,
        scope: {
            gears: '=',
            section: '=',
            editing: '=',
            loadoutId: '=',
            bodyPart: '='
        },
        link: function ($scope) {
            $scope.imageUrl = '';

            switch ($scope.bodyPart) {
                case 'Head Gear':
                    $scope.imageUrl = 'Content/Images/head.jpg';
                    break;
                case 'Torso':
                    $scope.imageUrl = 'Content/Images/torso.jpg';
                    break;
                case 'Arm/Hands':
                    $scope.imageUrl = 'Content/Images/arm2.png';
                    break;
                case 'Legs':
                    $scope.imageUrl = 'Content/Images/leg.png';
                    break;
                case 'Shoes':
                    $scope.imageUrl = 'Content/Images/shoe.jpg';
                    break;
                default:
                    break;
            }
        }
    }
}]);