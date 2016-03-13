//(function(w) {
//    w._config = {
//        baseUrl: 'http://loonison-pc/pb.web/',
//        version: '1.1'
//    };
//
//})(window);

window._config = {
    baseUrl: 'http://localhost:63342/PB.Web/src/',
    apiUrl: 'http://localhost/pb.api/',
    authority: 'http://localhost/sts/identity',
    redirect_uri: 'http://localhost:63342/PB.Web/src/js/views/oidccallback.html',
    callbackAsync: 'http://localhost:63342/PB.Web/src/index.html',
    version: '1.4',
    appName: 'PB',
    auth0Domain: 'loonison.auth0.com',
    auth0ClientId: 'OEHso6aTa51lkal5j3pR65aU4oYXSUrv'
};

angular.module('pb').factory('config', [function () {
    return window._config;
}]);