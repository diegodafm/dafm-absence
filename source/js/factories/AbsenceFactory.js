/**
 * Created by avenuecode on 12/4/14.
 */

/**
 * Created by avenuecode on 12/3/14.
 */
angular.module('app')
    .factory('AbsenceFactory', ['$http', 'moment', function($http, moment) {

        var urlBase = '/api/absences';

        var absenceFactory = {};

        absenceFactory.getAbsences = function() {
            return $http.get(urlBase);
        };

        absenceFactory.getAbsence = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        absenceFactory.insertAbsence = function(absence) {
            return $http.post(urlBase, absence);
        };

        absenceFactory.updateAbsence = function(absence) {
            return $http.put(urlBase + '/' + absence._id, absence);
        };

        absenceFactory.deleteAbsence = function(absence) {
            return $http.delete(urlBase + '/' + absence._id);
        };

        absenceFactory.checkAvailability = function(absence) {
            return $http.get(urlBase + '/filter/availability/'+ moment(absence.date).format('YYYY,MM,DD') + '/' + absence.unit );
        };

        return absenceFactory;

    }]);
