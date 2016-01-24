angular.module('pb').factory('titleFactory', ['config','$rootScope', function ( config, $rootScope ) {


    return {
        set: function ( title ) {
            $rootScope.pageTitle = config.appName + ' - ' + title;
        }
    };
}]);