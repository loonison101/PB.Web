window._config = {
    baseUrl: 'http://elasticbeanstalk-us-west-2-235680268517.s3-website-us-west-2.amazonaws.com/',
    //apiUrl: 'http://paintball.us-west-2.elasticbeanstalk.com/',
    apiUrl: 'http://paint.us-east-1.elasticbeanstalk.com/',
    authority: 'http://tokenserver.us-west-2.elasticbeanstalk.com/identity',
    redirect_uri: 'http://paintball.us-west-2.elasticbeanstalk.com/js/views/oidccallback.html',
    callbackAsync: 'http://elasticbeanstalk-us-west-2-235680268517.s3-website-us-west-2.amazonaws.com/',
    version: '1.4',
    appName: 'PB',
    auth0Domain: 'loonison.auth0.com',
    auth0ClientId: 'OEHso6aTa51lkal5j3pR65aU4oYXSUrv'
};

angular.module('pb').factory('config', [function () {



    return window._config;
}]);