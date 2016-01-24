//angular.module('pb').provider('versionPollerProvider', ['$http', 'config', function ( $http, config ) {
//    console.log('provider starting');
//
//    $http.get(config.apiUrl + 'v1/Version').then(function (response) {
//        console.log('provider version response: ', response);
//    });
//
//    function Version () {
//        this.ApiVersion = "";
//        this.UiVersion = "";
//    }
//
//    this.$get =[function () {
//        return new Version();
//    }]
//}]);