/**
 * Created by avenuecode on 12/3/14.
 */
angular.module('app')
    .factory('UserFactory', ['$http', function($http) {

        var urlBase = '/api/users';

        var userFactory = {};

        userFactory.getUsers = function() {
            return $http.get(urlBase);
        };

        userFactory.getUser = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        userFactory.insertUser = function(user) {
            return $http.post(urlBase, user);
        };

        userFactory.updateUser = function(user) {
            return $http.put(urlBase + '/' + user.ID, user);
        };

        userFactory.deleteUser = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

        return userFactory;

    }]);
