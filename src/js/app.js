var app = angular.module('pb', ['ui.router', 'ui.bootstrap', 'ui-notification', 'ngTouch', 'ngFileUpload', 'xeditable', 'angularUUID2']);

angular.isGuid = angular.isGuid || function ( guid ) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guid);
    };

app.config(['$stateProvider', '$urlRouterProvider', 'NotificationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, NotificationProvider, $httpProvider) {

    function registerStates () {
        $stateProvider
            .state('home',      {
                url: '/home',
                templateUrl: 'js/views/homepage.html',
                controller: 'homeCtrl'
            })
            .state('userView',  {
                url: '/user/view/:id',
                templateUrl: 'js/user/views/view.html',
                controller: 'userViewCtrl'
            })
            .state('players',   {
                url: '/players',
                templateUrl: 'js/user/views/all.html',
                controller: 'playersCtrl'
            })
            .state('userView.deleteTeam', {
                url: '/deleteTeam/:userId/:teamId',
                views: {
                    modal: {
                        template: '',
                        controller: 'userViewDeleteTeamCtrl'
                    }
                }

            })
            .state('userView.changeRank', {
                url: '/changeRank/:teamId',
                views: {
                    modal: {
                        template: '',
                        controller: 'userViewChangeRankCtrl'
                    }
                }
            })
            .state('userEdit', {
                url: '/user/edit/:id?highlight',
                templateUrl: 'js/user/views/edit.html',
                controller: 'userEditCtrl'
            })
            .state('rankView', {
                url: '/rank/view/:teamId?highlightId',
                templateUrl: 'js/rank/views/view.html',
                controller: 'rankViewCtrl'
            })
            .state('rankEdit', {
                url: '/rank/edit/:teamId',
                templateUrl: 'js/rank/views/edit.html',
                controller: 'rankEditCtrl'
            })
            .state('teamsView', {
                url: '/teams',
                templateUrl: 'js/team/views/view.html',
                controller: 'teamsCtrl'
            })
            .state('teamView', {
                url: '/team/:id?action',
                templateUrl: 'js/team/views/viewSingle.html',
                controller: 'teamCtrl'
            })
            .state('siteSettings', {
                url: '/site/settings',
                templateUrl: 'js/site/views/index.html',
                controller: 'siteSettingsCtrl'
            });
    }

    registerStates();

    $urlRouterProvider.otherwise('/home');

    NotificationProvider.setOptions({
        positionX: 'right',
        positionY: 'top',
        delay: 5000
    });

    // Need this to tell MVC that we make AJAX requests, jQuery does this by default, as does XMLHTTPREQUEST
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $httpProvider.interceptors.push(['$q','$injector', function($q, $injector) {
        return {
            response: function(response) {

                var Notification = $injector.get('Notification');

                if ( response.data.HasErrors === true ) {
                    Notification.error({
                        title: 'Error!',
                        message: response.data.CombinedErrors,
                        delay: 1000*15
                    });

                    console.error('Errored', response);
                }

                return response;
            }
        }
    }]);

    $httpProvider.interceptors.push(['tokenContainer','OidcManager', function (tokenContainer, OidcManager){
        return {
            request: function (config) {
                if (config.url.indexOf('v1') > -1){
                    config.headers.Authorization = 'Bearer ' + OidcManager.access_token;
                }

                return config;
            }
        }
    }]);

    console.log(
        '_____  ____\n' +
        '|  __ \\|  _ \\\n' +
        '| |__) | |_) |\n' +
        '|  ___/|  _ <\n' +
        '| |    | |_) |\n' +
        '|_|    |____/\n'

    );
}]);

app.run(function(editableOptions, editableThemes) {

    function setupXeditable() {
        editableOptions.theme = 'bs3';

        editableThemes['bs3'].buttonsTpl = '<span class="editable-buttons btn-xs"></span>';
        editableThemes['bs3'].noformTpl = '<span class="editable-wrap idk"></span>';
    }

    // Setup xeditable template settings
    setupXeditable();
});