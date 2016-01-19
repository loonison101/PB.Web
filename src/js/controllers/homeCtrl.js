angular.module('pb').controller('homeCtrl', ['$scope', 'NavigationFactory', 'NotificationFactory', '$state', '$http', 'tokenContainer', 'OidcManager','config', function ($scope, NavigationFactory, NotificationFactory,$state, $http, tokenContainer, OidcManager, config) {

    $scope.user = null;
    $scope.NavigationFactory = NavigationFactory;
    $scope.fullName = ' use auth';//window._app.fullName;
    $scope.version = 'use auth'; //window._config.version;

    $scope.vm = {
        isLoadingNotifications: false,
        notifications: []
    };

    $scope.timeSince = function (date) {

       // date = parseInt(date.substr(6));

        date = new Date(date);

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

    $scope.deleteNotification = function (notificationId) {
        console.log('delete id', notificationId);

        if (window.confirm('Are you sure?')) {
            NotificationFactory.remove(notificationId).then(function (response){
                console.log(response);
                $state.go($state.current, {}, {reload: true});

            });
        }
    };

    function getNotifications() {
        $scope.vm.isLoadingNotifications = true;

        NotificationFactory.getHomepageNotifications().then(function(response) {
            $scope.vm.isLoadingNotifications = false;
            //$scope.vm.notifications = response.data.Data;
            $scope.vm.notifications = response.data;
        });
    }



    var manager = OidcManager;

    if (manager.expired){
       // console.warn('dont forget im not redirecting');
        manager.redirectForToken();
    }

    function go(){
        //$http.get('http://localhost/pb.api/v1/Players'//,{
        //$http.get(config.apiUrl + 'v1/Players'
        ////    headers: {
        ////        'Authorization': 'Bearer ' + tokenContainer.getToken()}
        ////}
        //).then(function (response){
        //    console.log('the new api response!', response);
        //});

        //$http.get('http://localhost/pb.api/v1/HomePageNotifications').then(function(response){
        //$http.get(config.apiUrl + 'v1/HomePageNotifications').then(function(response) {
        //    console.log('notifications from v1 api', response);
        //});
    }

    go();
    window.go = go;

    function logOut (){
        manager.removeToken();
        //window.location = 'http://loonison-pc/pb.web';
        window.location = config.baseUrl;
    }

    window.logOut = logOut;

    //console.log('oidc manager profile', manager.profile);

    //manager.oidcClient.loadUserProfile(manager.access_token).then(function (vals) {
    //    console.log('values manm!', vals);
    //});

    window.mgr = manager;

    getNotifications();

}]);