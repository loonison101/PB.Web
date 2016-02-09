window._config = {
    //baseUrl: 'http://localhost:63342/PB.Web/src/',
    baseUrl: 'http://elasticbeanstalk-us-west-2-235680268517.s3-website-us-west-2.amazonaws.com/',
    apiUrl: 'http://paintball.us-west-2.elasticbeanstalk.com/',
    authority: 'http://tokenserver.us-west-2.elasticbeanstalk.com/identity',
    redirect_uri: 'http://paintball.us-west-2.elasticbeanstalk.com/js/views/oidccallback.html',
    callbackAsync: 'http://elasticbeanstalk-us-west-2-235680268517.s3-website-us-west-2.amazonaws.com/',
    version: '1.3',
    appName: 'PB'
};

angular.module('pb').factory('config', [function () {



    return window._config;
}]);