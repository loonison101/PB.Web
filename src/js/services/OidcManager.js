angular.module('pb').factory('OidcManager', ['config', function (config) {

     var _config = {
         client_id: 'PB Web Site',
         //redirect_uri: 'http://loonison-pc/pb.web/scripts/app/views/oidccallback.html',
         //redirect_uri: 'http://loonison-pc/pb.web/scripts/app/views/callback.html',
         redirect_uri: config.baseUrl + 'js/views/oidccallback.html',
         response_type: 'id_token token',
         scope: 'openid profile pb roles',
         //authority: 'http://localhost:25922/identity',
         //authority: 'http://localhost/sts/identity',
         authority: config.authority,
         post_logout_redirect_uri: config.baseUrl + 'index.html'
         //silent_redirect_uri: config.baseUrl +'js/views/silentrefreshframe.html',
         //silent_renew: true
     };

    return new OidcTokenManager(_config);
}]);

angular.module('pb').provider('OidcManagerProvider', function (){
    this.$get = ['OidcManager', function (OidcManager) {
        return OidcManager;
    }];
});