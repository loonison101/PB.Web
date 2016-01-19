angular.module('pb').factory('tokenContainer', [function () {

    var token = "";

    function setToken ( _token ) {
        token = _token;
    }

    function getToken (){
        if (token == ''){
            if (localStorage.getItem('access_token') === null) {

                // get the token, using the implicit flow
                var url =
                    'http://localhost:25922/identity/connect/authorize?' +
                        'client_id=implicitlane&' +
                        'redirect_uri=' + encodeURI('http://loonison-pc/pb.web/scripts/app/views/callback.html') + '&' +
                        'response_type=token&' +
                        'scope=pb';

                window.location = url;
            } else {
                setToken(localStorage['access_token']);
                return token;
            }
        } else {
            return token;
        }
    }

    return {
        setToken: setToken,
        getToken: getToken
    }
}]);