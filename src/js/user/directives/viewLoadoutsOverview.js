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


                    $scope.vm.loadouts = response.data.Data;

                    angular.forEach($scope.vm.loadouts, function (loadout) {
                        loadout.Created = new Date(parseInt(loadout.Created.substr(6)));
                    });

                    console.log('responsefrom loadouts', response.data.Data);

                    //$scope.vm.loadouts.push(
                    //        {
                    //            Id: 'aaa',
                    //            ImageUrl: 'Content/Images/loadout.jpg',
                    //            Name: 'Mag fed primary setup',
                    //            Gears: [
                    //                { // Gear
                    //                    Name: 'Headband',
                    //                    Manufacturer: 'GI Sports',
                    //                    Section: 1,
                    //                    Sequence: 1,
                    //                    ImageUrl: 'http://www.ansgear.com/v/vspfiles/photos/EXALTHEADBANDTIGERDIGITAL-2T.jpg',
                    //                    Bought: new Date(),
                    //                    Quantity: 1
                    //                },
                    //                {
                    //                    Name: 'Sly Mask',
                    //                    Manufacturer: 'Sly',
                    //                    Section: 1,
                    //                    Sequence: 2,
                    //                    ImageUrl: 'http://www.ansgear.com/v/vspfiles/photos/SLYPAINTBALLMASKPROFIT-BLACK-2T.jpg',
                    //                    Bought: new Date(),
                    //                    Quantity: 1
                    //                },
                    //                {
                    //                    Name: 'Ball Cap',
                    //                    Manufacturer: '',
                    //                    Section: 1,
                    //                    Sequence: 2,
                    //                    ImageUrl: 'http://ecx.images-amazon.com/images/I/51E5%2BChuoqL._SY355_.jpg',
                    //                    Bought: new Date(),
                    //                    Quantity: 1
                    //                },
                    //                {
                    //                    Name: 'Battle Shirt',
                    //                    Manufacturer: 'eBay',
                    //                    Section: 2,
                    //                    Sequence: 1,
                    //                    ImageUrl: 'http://www.hueys.co.uk/WebRoot/Store/Shops/es151784/519F/6315/D441/732A/F0AF/0A0F/1116/AC3B/mc4.jpg',
                    //                    Bought: new Date(),
                    //                    Quantity: 1
                    //                },
                    //                {
                    //                    Name: 'Plate Carrier',
                    //                    Manufacturer: 'Condor',
                    //                    Section: 2,
                    //                    Sequence: 2,
                    //                    ImageUrl: 'http://www.condoroutdoor.com/images/products/detail/MOPC_003F_2014_v02.png',
                    //                    Bought: new Date(),
                    //                    Quantity: 1
                    //                },
                    //                //
                    //                {
                    //                    Name: 'Forearm Pads',
                    //                    Manufacturer: 'Exalt',
                    //                    Section: 3,
                    //                    Sequence: 1,
                    //                    ImageUrl: 'http://cdn3.volusion.com/xrkzm.gkync/v/vspfiles/photos/Elbow-2.jpg?1376960723',
                    //                    Bought: new Date(),
                    //                    Quantity: 1
                    //                },
                    //                //
                    //                {
                    //                    Name: 'Fingerless Gloves',
                    //                    Manufacturer: 'Planet Eclipse',
                    //                    Section: 4,
                    //                    Sequence: 2,
                    //                    ImageUrl: 'http://www.ansgear.com/v/vspfiles/photos/PLANET2011GAUNTLETGLOVES-2.jpg',
                    //                    Bought: new Date(),
                    //                    Quantity: 1
                    //                }
                    //            ]
                    //        });
                });

                //$timeout(function () {
                //    $scope.vm.isLoadingLoadouts = false;
                //    $scope.vm.loadouts.push(
                //        {
                //            Id: 'aaa',
                //            ImageUrl: 'Content/Images/loadout.jpg',
                //            Name: 'Mag fed primary setup',
                //            Gears: [
                //                { // Gear
                //                    Name: 'Headband',
                //                    Manufacturer: 'GI Sports',
                //                    Section: 'Head',
                //                    Sequence: 1,
                //                    ImageUrl: 'http://www.ansgear.com/v/vspfiles/photos/EXALTHEADBANDTIGERDIGITAL-2T.jpg',
                //                    Bought: new Date(),
                //                    Quantity: 1
                //                },
                //                {
                //                    Name: 'Sly Mask',
                //                    Manufacturer: 'Sly',
                //                    Section: 'Head',
                //                    Sequence: 2,
                //                    ImageUrl: 'http://www.ansgear.com/v/vspfiles/photos/SLYPAINTBALLMASKPROFIT-BLACK-2T.jpg',
                //                    Bought: new Date(),
                //                    Quantity: 1
                //                },
                //                {
                //                    Name: 'Ball Cap',
                //                    Manufacturer: '',
                //                    Section: 'Head',
                //                    Sequence: 2,
                //                    ImageUrl: 'http://ecx.images-amazon.com/images/I/51E5%2BChuoqL._SY355_.jpg',
                //                    Bought: new Date(),
                //                    Quantity: 1
                //                },
                //                {
                //                    Name: 'Battle Shirt',
                //                    Manufacturer: 'eBay',
                //                    Section: 'Torso',
                //                    Sequence: 1,
                //                    ImageUrl: 'http://www.hueys.co.uk/WebRoot/Store/Shops/es151784/519F/6315/D441/732A/F0AF/0A0F/1116/AC3B/mc4.jpg',
                //                    Bought: new Date(),
                //                    Quantity: 1
                //                },
                //                {
                //                    Name: 'Plate Carrier',
                //                    Manufacturer: 'Condor',
                //                    Section: 'Torso',
                //                    Sequence: 2,
                //                    ImageUrl: 'http://www.condoroutdoor.com/images/products/detail/MOPC_003F_2014_v02.png',
                //                    Bought: new Date(),
                //                    Quantity: 1
                //                },
                //                //
                //                {
                //                    Name: 'Forearm Pads',
                //                    Manufacturer: 'Exalt',
                //                    Section: 'Arms_Hands',
                //                    Sequence: 1,
                //                    ImageUrl: 'http://cdn3.volusion.com/xrkzm.gkync/v/vspfiles/photos/Elbow-2.jpg?1376960723',
                //                    Bought: new Date(),
                //                    Quantity: 1
                //                },
                //                //
                //                {
                //                    Name: 'Fingerless Gloves',
                //                    Manufacturer: 'Planet Eclipse',
                //                    Section: 'Arms_Hands',
                //                    Sequence: 2,
                //                    ImageUrl: 'http://www.ansgear.com/v/vspfiles/photos/PLANET2011GAUNTLETGLOVES-2.jpg',
                //                    Bought: new Date(),
                //                    Quantity: 1
                //                }
                //            ]
                //        });
                //    console.log('loadouts', $scope.vm.loadouts);
                //
                //}, 500);
            }

            $scope.createLoadout = function () {
                $modal.open({
                    templateUrl: 'createLoadout.html',
                    controller: function ($scope, playerId, $modalInstance) {
                        $scope.vm = {
                            isLoading: false,
                            loadout: {
                                PlayerId: playerId
                            }
                        };
                        $scope.cancel = function () {
                            $modalInstance.close('dismiss');
                        };

                        $scope.ok = function () {
                            console.log('create me', $scope.vm.loadout);

                            LoadoutFactory.create($scope.vm.loadout).then(function (response) {
                                console.log('response', response);

                                window.location.reload();
                            });

                        };
                    },
                    resolve: {
                        playerId: function () {
                            return $scope.playerId;
                        }
                    }
                });
            };

            $scope.changeLoadoutImage = function (loadout) {
                $modal.open({
                    templateUrl: 'changeLoadoutImage.html',
                    controller: function ($scope, $modalInstance, loadout) {

                        var backup = angular.copy(loadout);

                        $scope.vm = {
                            isLoading: false,
                            loadout: loadout
                        };

                        $scope.cancel = function () {
                            $scope.vm.loadout.ImageUrl = backup.ImageUrl;
                            $modalInstance.close('dismiss');
                        };

                        $scope.ok = function () {
                            LoadoutFactory.updateImageUrl($scope.vm.loadout.Id, $scope.vm.loadout.ImageUrl).then(function () {
                                $modalInstance.close('dismiss');
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
                        window.location.reload();
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
                    controller: function ($scope, $modalInstance, gears, section, loadoutId) {
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
                                gears.push($scope.vm.gear);
                                $modalInstance.close('dismiss');
                                //window.location.reload();
                            });

                        };

                        $scope.cancel = function () {
                            $modalInstance.close('dismiss');
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
                    controller: function ($scope, $modalInstance, gear) {
                        console.log('gear is', gear);

                        $scope.vm = {
                            isLoading: false,
                            gear: gear
                        };

                        $scope.ok = function () {
                            GearFactory.update($scope.vm.gear).then(function (response) {
                                $modalInstance.close('dismiss');
                                //window.location.reload();
                            });


                        };

                        $scope.cancel = function () {
                            $modalInstance.close('dismiss');
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
                        window.location.reload();
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