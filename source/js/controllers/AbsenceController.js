/**
 * Created by avenuecode on 12/2/14.
 */
(function() {
    'use strict';

    /**
     * @name AbsenceController
     * @description This is a Absence controller
     */

    angular.module('app')
        .controller('AbsenceController', function($scope, action, event, AbsenceFactory, moment) {

            $scope.absence = {};

            console.log(moment);

            AbsenceFactory.getAbsences().then(function(result) {
                console.log(result.data);
            });

            $scope.users = ['Diego', 'Alisson', 'Mendonca', 'Diego Alisson F Mendonca'];

            $scope.action = action;

            $scope.event = event;

            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function() {
                $scope.dt = null;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            };

            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 0,
                showWeeks: false
            };

            $scope.format = 'yyyy/MM/dd';

            $scope.submit = function() {

                var absence = transformAbsence($scope.absence);

                console.log(absence);

                AbsenceFactory.insertAbsence(absence).then(function(result) {
                    console.log(result);
                });

            };

            function transformAbsence(_absence) {
                var absence = angular.copy(_absence);

                if (absence.unit.toUpperCase() === 'AM') {
                    absence.starts_at = new Date($scope.absence.date.setHours(9, 0, 0));
                    absence.ends_at = new Date($scope.absence.date.setHours(13, 0, 0));
                } else if (absence.unit.toUpperCase() === 'PM') {
                    absence.starts_at = new Date($scope.absence.date.setHours(13, 0, 0));
                    absence.ends_at = new Date($scope.absence.date.setHours(18, 0, 0));
                }

                absence.editable = true;
                absence.deletable = true;

                return absence;
            }

        });
})();

/**
 * Created by avenuecode on 12/3/14.
 */
