angular.module('pb').directive('addNotification', ['NotificationFactory','$state', function ( NotificationFactory, $state ) {
    return {
        restrict: 'A',
        templateUrl: 'js/directives/views/addNotification.html',
        replace:true,
        link: function ( $scope ) {
            $scope.vm = {
                isCreating: false,
                notification: {
                    Title: '',
                    Description: '',
                    Type: '1',
                    Scope: '1'
                }
            };

            $scope.createNotification = function ( notification ) {
                $scope.vm.isCreating = true;

                NotificationFactory.create(notification).then(function (response) {
                    $scope.vm.isCreating = false;
                    $state.go('home');
                });

                console.log('create!', notification);
            }
        }
    }
}]);