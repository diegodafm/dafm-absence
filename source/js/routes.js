(function(){
    'use strict';

    angular.module('app.routes', ['ngRoute','ui.router'])
        .config(['$routeProvider','$stateProvider',function($routeProvider,$stateProvider) {

            $routeProvider.otherwise({
                redirectTo: ""
            });

            $stateProvider
                .state('main', {
                    url: "",
                    templateUrl: "source/partials/TestTemplate2.html",
                    controller: 'TestController'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'source/partials/TestTemplate2.html',
                    controller: 'TestController'
                })
                .state('map', {
                    url: '/map',
                    templateUrl: 'source/partials/TestTemplate.html',
                    controller: 'TestController'
                });

        }]);

})();