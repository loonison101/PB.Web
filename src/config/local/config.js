//(function(w) {
//    w._config = {
//        baseUrl: 'http://loonison-pc/pb.web/',
//        version: '1.1'
//    };
//
//})(window);

angular.module('pb').factory('config', [function () {
    return {
        baseUrl: 'http://localhost:63342/PB.Web/',
        apiUrl: 'http://localhost/pb.api/',
        version: '1.2'
    }
}]);