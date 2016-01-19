angular.module('pb').factory('UserFactory', ['$http', '$window', function ($http, $window) {

    var _data = {
        //userId: $window._app.userId
        userId: 'dont use me, use auth manger'
    };

    function loadUser ( userId ) {
        return $http.get('User/ById?id=' + userId);
    }

    function loadWithCurrentId (){
        return $http.get('User/ById?id=' + _data.userId);
    }

    //console.log('user id', _data.userId);

    return {
        load: loadUser,
        loadWithCurrentId: loadWithCurrentId,
        userId: _data.userId
    }
}]);