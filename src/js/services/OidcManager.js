angular.module('pb').factory('OidcManager', ['config', function (config) {

     var _config = {
         client_id: 'implicitlane',
         //redirect_uri: 'http://loonison-pc/pb.web/scripts/app/views/oidccallback.html',
         //redirect_uri: 'http://loonison-pc/pb.web/scripts/app/views/callback.html',
         redirect_uri: config.baseUrl + 'src/js/views/oidccallback.html',
         response_type: 'id_token token',
         scope: 'openid profile address pb roles',
         authority: 'http://localhost:25922/identity'
     };

    return new OidcTokenManager(_config);
}]);