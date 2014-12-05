(function() {
    'use strict';

    angular.module('app.routes', ['ngRoute', 'ui.router'])
        .config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {

            $routeProvider.otherwise({
                redirectTo: ''
            });

            $stateProvider
                .state('main', {
                    url: '',
                    templateUrl: 'source/partials/calendar.html',
                    controller: 'CalendarController'
                })
                .state('calendar', {
                    url: '/calendar',
                    templateUrl: 'source/partials/calendar.html',
                    controller: 'CalendarController'
                })
                .state('map', {
                    url: '/map',
                    templateUrl: 'source/partials/TestTemplate.html',
                    controller: 'TestController'
                });

        }]);

})();
