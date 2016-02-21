var app = angular.module('pb', ['ui.router', 'ui.bootstrap', 'ui-notification', 'ngTouch', 'ngFileUpload', 'xeditable', 'angularUUID2', 'templates', 'pusher-angular', 'auth0', 'angular-storage', 'angular-jwt']);

angular.isGuid = angular.isGuid || function ( guid ) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guid);
    };

app.config(['$stateProvider', '$urlRouterProvider', 'NotificationProvider', '$httpProvider','OidcManagerProvider', 'authProvider','jwtInterceptorProvider', function ($stateProvider, $urlRouterProvider, NotificationProvider, $httpProvider, OidcManagerProvider, authProvider, jwtInterceptorProvider) {

    function registerStates () {
        $stateProvider
            .state('login',{
                url: '/login',
                template: '<div style="height:100px;"></div>' +
                '<div class="login-page clearfix">' +
                '<div class="login-box center">' +
                '<h1>Please Login</h1>' +
                '<a ng-click="login()" class="btn btn-primary btn-lg">Sign In</a>' +
                '</div>' +
                '</div>',
                controller: function ($scope, auth, $location, store, $http, config) {
                    $scope.login = function () {
                        auth.signin({
                            authParams: {
                                scope: 'openid offline_access'
                            }
                        }, function (profile, token, access_token, state, refresh_token) {
                            store.set('profile', profile);
                            store.set('token', token);
                            store.set('refreshToken', refresh_token);
                            console.log('hey, call api and make sure i exist', profile);

                            $http.get(config.apiUrl + 'v1/Player/UpsertMe?id=' + profile.user_id + '&email=' + profile.email + '&username=' + profile.username).then(function (response) {
                                console.log('response from upsertme: ', response.data, response);
                                store.set('pbUserId', response.data);
                            });

                            $location.path('/home');
                        }, function (error) {
                            console.log('error', error);
                        });
                    }
                }
            })
            .state('home',      {
                url: '/home',
                templateUrl: 'js/views/homepage.html',
                controller: 'homeCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('userView',  {
                url: '/user/view/:id',
                templateUrl: 'js/user/views/view.html',
                controller: 'userViewCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('players',   {
                url: '/players',
                templateUrl: 'js/user/views/all.html',
                controller: 'playersCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('userView.deleteTeam', {
                url: '/deleteTeam/:userId/:teamId',
                views: {
                    modal: {
                        template: '',
                        controller: 'userViewDeleteTeamCtrl',
                        data: {
                            requiresLogin: true
                        }
                    }
                }

            })
            .state('userView.changeRank', {
                url: '/changeRank/:teamId',
                views: {
                    modal: {
                        template: '',
                        controller: 'userViewChangeRankCtrl',
                        data: {
                            requiresLogin: true
                        }
                    }
                }
            })
            .state('userEdit', {
                url: '/user/edit/:id?highlight',
                templateUrl: 'js/user/views/edit.html',
                controller: 'userEditCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('rankView', {
                url: '/rank/view/:teamId?highlightId',
                templateUrl: 'js/rank/views/view.html',
                controller: 'rankViewCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('rankEdit', {
                url: '/rank/edit/:teamId',
                templateUrl: 'js/rank/views/edit.html',
                controller: 'rankEditCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('teamsView', {
                url: '/teams',
                templateUrl: 'js/team/views/view.html',
                controller: 'teamsCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('teamView', {
                url: '/team/:id?action',
                templateUrl: 'js/team/views/viewSingle.html',
                controller: 'teamCtrl',
                data: {
                    requiresLogin: true
                }
            })
            .state('siteSettings', {
                url: '/site/settings',
                templateUrl: 'js/site/views/index.html',
                controller: 'siteSettingsCtrl',
                data: {
                    requiresLogin: true
                }
            });
    }

    registerStates();

    $urlRouterProvider.otherwise('/home');

    NotificationProvider.setOptions({
        positionX: 'right',
        positionY: 'top',
        delay: 5000
    });

    authProvider.init({
        domain: _config.auth0Domain,
        clientID: _config.auth0ClientId,
        loginState: 'login'
    });

    var refreshingToken = null;
    jwtInterceptorProvider.tokenGetter = function (store, jwtHelper){
        //return store.get('token');

        var token = store.get('token');
        var refreshToken = store.get('refreshToken');

        if (token) {
            if (!jwtHelper.isTokenExpired(token)){
                return store.get('token');
            } else {
                if (refreshingToken === null) {
                    refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                        store.set('token', idToken);
                        return idToken;
                    }).finally(function () {
                        refreshingToken = null;
                    })
                }

                return refreshingToken;
            }
        }

    };

    $httpProvider.interceptors.push('jwtInterceptor');

    // Need this to tell MVC that we make AJAX requests, jQuery does this by default, as does XMLHTTPREQUEST
    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    //$httpProvider.interceptors.push(['$q','$injector', function($q, $injector) {
    //    return {
    //        //response: function(response) {
    //        //    return response;
    //        //},
    //        request: function ( config ) {
    //            var mgr = $injector.get('OidcManager');
    //
    //            if (mgr.expired){
    //                mgr.redirectForToken();
    //            } else {
    //                return config;
    //            }
    //
    //
    //        },
    //        responseError: function ( response ) {
    //            if ( response.status === 500 ) {
    //                var Notification = $injector.get('Notification');
    //
    //                Notification.error({
    //                    title: 'Error!',
    //                    message: 'Error!',
    //                    delay: 1000*15
    //                })
    //            } else if (response.status === -1) {
    //                var Notification = $injector.get('Notification');
    //
    //                Notification.error({
    //                    title: 'Error!',
    //                    message: 'Authentication server down, please notify lanekatris@gmail.com',
    //                    delay: 1000 * 15
    //                })
    //            } else if (response.status === 403) {
    //                var Notification = $injector.get('Notification');
    //
    //                Notification.error({
    //                    title: 'Error!',
    //                    message: 'You are not allowed to view this data or perform that action. Did you allow permissions when logging in? Try logging out and allow permissions.',
    //                    delay: 1000 * 15
    //                })
    //            } else if ( response.status === 401 ) {
    //                var Notification = $injector.get('Notification');
    //                var mgr = $injector.get('OidcManager');
    //
    //                if (mgr.profile == void 0) {
    //                    mgr.redirectForToken();
    //                }
    //                else if (mgr.expired) {
    //                    mgr.redirectForToken();
    //                }else{
    //                    Notification.error({
    //                        title: 'Access Denied',
    //                        message: 'You do not have proper permissions to view this data',
    //                        delay: 1000*15
    //                    });
    //                }
    //
    //
    //
    //
    //                //window.location.reload();
    //                //mgr.redirectForToken()
    //            }
    //        }
    //    }
    //}]);

    //$httpProvider.interceptors.push(['tokenContainer','OidcManager', function (tokenContainer, OidcManager){
    //    return {
    //        request: function (config) {
    //            if (config.url.indexOf('v1') > -1){
    //                config.headers.Authorization = 'Bearer ' + OidcManager.access_token;
    //            }
    //
    //            return config;
    //        }
    //    }
    //}]);

    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //
    ///**
    // * The workhorse; converts an object to x-www-form-urlencoded serialization.
    // * @param {Object} obj
    // * @return {String}
    // */
    //var param = function(obj) {
    //    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    //
    //    for(name in obj) {
    //        value = obj[name];
    //
    //        if(value instanceof Array) {
    //            for(i=0; i<value.length; ++i) {
    //                subValue = value[i];
    //                fullSubName = name + '[' + i + ']';
    //                innerObj = {};
    //                innerObj[fullSubName] = subValue;
    //                query += param(innerObj) + '&';
    //            }
    //        }
    //        else if(value instanceof Object) {
    //            for(subName in value) {
    //                subValue = value[subName];
    //                fullSubName = name + '[' + subName + ']';
    //                innerObj = {};
    //                innerObj[fullSubName] = subValue;
    //                query += param(innerObj) + '&';
    //            }
    //        }
    //        else if(value !== undefined && value !== null)
    //            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    //    }
    //
    //    return query.length ? query.substr(0, query.length - 1) : query;
    //};
    //
    //// Override $http service's default transformRequest
    //$httpProvider.defaults.transformRequest = [function(data) {
    //    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    //}];

    console.log(
        '_____  ____\n' +
        '|  __ \\|  _ \\\n' +
        '| |__) | |_) |\n' +
        '|  ___/|  _ <\n' +
        '| |    | |_) |\n' +
        '|_|    |____/\n'

    );

    //if (OidcManagerProvider.$get().expired){
    //    OidcManagerProvider.$get().redirectForToken();
    //}

    window.pusherClient = new Pusher('8e4a480bb5dc1a9a463b');


}]);

app.run(function(editableOptions, editableThemes, $rootScope, OidcManager, auth, store, jwtHelper, $location, $state) {

    auth.hookEvents();

    function setupXeditable() {
        editableOptions.theme = 'bs3';

        editableThemes['bs3'].buttonsTpl = '<span class="editable-buttons btn-xs"></span>';
        editableThemes['bs3'].noformTpl = '<span class="editable-wrap idk"></span>';
    }

    // Setup xeditable template settings
    setupXeditable();


    var refreshingToken = null;
    $rootScope.$on('$locationChangeStart', function (event) {

        var token = store.get('token');
        var refreshToken = store.get('refreshToken');

        if (token) {
            if (!jwtHelper.isTokenExpired(token)){
                if (!auth.isAuthenticated)
                    auth.authenticate(store.get('profile'),token);
            } else {
                if (refreshToken) {
                    if (refreshingToken === null) {
                        refreshingToken = auth.refreshIdToken(refreshToken).then(function (idToken) {
                            store.set('token', idToken);
                            auth.authenticate(store.get('profile'), idToken);

                        }).finally(function () {
                            refreshingToken = null;
                        })
                    }

                    return refreshingToken;
                } else {
                    $state.go('login');
                }


            }
        }

    });

    //$rootScope.$on('$locationChangeStart', function(event){
    //    if (OidcManager.expired){
    //
    //        OidcManager.redirectForToken();
    //        event.preventDefault();
    //    }
    //})
});