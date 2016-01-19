angular.module('pb').factory('NotificationFactory', ['$http', 'config', function($http, config) {

    function getHomepageNotifications() {
        //return $http.get('Notification/HomepageNotifications');
        return $http.get(config.apiUrl + 'v1/HomePageNotifications');
    }

    function create (notification) {
        return $http.post('Notification/Create', notification);
    }

    function remove (notificationId){
        return $http.get('Notification/Delete?id=' + notificationId);
    }


    return {
        getHomepageNotifications: getHomepageNotifications,
        create: create,
        remove: remove
    };

}]);