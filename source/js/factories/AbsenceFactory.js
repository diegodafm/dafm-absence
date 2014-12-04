/**
 * Created by avenuecode on 12/4/14.
 */

/**
 * Created by avenuecode on 12/3/14.
 */
angular.module('app')
    .factory('AbsenceFactory', ['$http', function($http) {

        var urlBase = '/api/absences';

        var absenceFactory = {};

        absenceFactory.getAbsences = function() {
            return $http.get(urlBase);
        };

        absenceFactory.getAbsence = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        absenceFactory.insertAbsence = function(absence) {
            debugger;
            return $http.post(urlBase, absence);
        };

        absenceFactory.updateAbsence = function(absence) {
            return $http.put(urlBase + '/' + absence.ID, absence);
        };

        absenceFactory.deleteAbsence = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

        return absenceFactory;

    }]);
