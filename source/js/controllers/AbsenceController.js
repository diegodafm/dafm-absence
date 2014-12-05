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
        .controller('AbsenceController', function($scope, $modalInstance, action, event, AbsenceFactory) {

            $scope.action = action;

            init(event);

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

                switch ($scope.action) {
                    case 'add':
                        addAbsence();
                        break;

                    case 'update':
                        updateAbsence();
                        break;

                    case 'delete':
                        deleteAbsence();
                        break;
                }

            };

            function transformAbsence(_absence) {
                var absence = angular.copy(_absence);

                if (absence.period.toUpperCase() === 'AM') {
                    absence.starts_at = new Date(new Date(absence.date).setHours(9, 0, 0));
                    absence.ends_at = new Date(new Date(absence.date).setHours(13, 0, 0));
                } else if (absence.period.toUpperCase() === 'PM') {
                    absence.starts_at = new Date(new Date(absence.date).setHours(13, 0, 0));
                    absence.ends_at = new Date(new Date(absence.date).setHours(18, 0, 0));
                }

                absence.editable = true;
                absence.deletable = true;

                return absence;
            }

            function init(_absence) {
                if ($scope.action === 'add') {
                    $scope.absence = {};

                } else {

                    $scope.absence = angular.copy(_absence);
                }

                if($scope.action === 'show' || $scope.action === 'delete'){
                    $scope.edittable = false;
                } else {
                    $scope.edittable = true;
                }
            }

            function addAbsence(){
                AbsenceFactory.checkAvailability(absence).then(function(availability) {
                    if (availability.data.length > 0) {
                        alert('clash detected');
                    } else {
                        AbsenceFactory.insertAbsence(absence).then(function(result) {
                            console.log(result);
                            $modalInstance.close();
                        });
                    }
                });
            }

            function updateAbsence(){
                AbsenceFactory.checkAvailability(absence).then(function(availability) {
                    if (availability.data.length > 0 && availability.data[0]._id !== absence._id) {
                        alert('clash detected');
                    } else {
                        AbsenceFactory.updateAbsence(absence).then(function(result) {
                            console.log(result);
                            $modalInstance.close();
                        });
                    }
                });
            }

            function deleteAbsence(){
                AbsenceFactory.deleteAbsence(absence).then(function(result) {
                    console.log(result);
                    $modalInstance.close();
                });
            }

        });
})();

/**
 * Created by avenuecode on 12/3/14.
 */
