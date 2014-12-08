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
        .controller('AbsenceController', function($scope, $modalInstance, action, event, AbsenceFactory, moment) {

            init(event);

            $scope.action = action;

            $scope.showPanelMessage = false;

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            };

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 0,
                showWeeks: false,
                format: 'yyyy/MM/dd',
                minDate: ($scope.minDate ? null : new Date())
            };

            $scope.submit = function() {

                if (validate()) {
                    var absence = transformAbsence($scope.absence);
                    switch ($scope.action) {
                        case 'add':
                            addAbsence(absence);
                            break;

                        case 'update':
                            updateAbsence(absence);
                            break;

                        case 'delete':
                            $scope.deleteConfirmation = true;
                            break;
                    }
                } else {
                    return false;
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

                $scope.validated = {
                    name: true,
                    type: true,
                    date: true,
                    period: true
                };

                if ($scope.action === 'add') {
                    $scope.absence = {};
                } else {
                    $scope.absence = angular.copy(_absence);
                }
            }

            function addAbsence(absence) {
                AbsenceFactory.checkAvailability(absence).then(function(availability) {
                    if (availability.data.length > 0) {
                        $scope.openPanelMessage('Clash detected! You cannot add an absence at this period [' + absence.period + ']');
                    } else {
                        AbsenceFactory.insertAbsence(absence).then(function() {
                            $scope.fadeoutMessage('Absence added');
                        });
                    }
                });
            }

            function updateAbsence(absence) {
                AbsenceFactory.checkAvailability(absence).then(function(availability) {
                    if (availability.data.length > 0 && availability.data[0]._id !== absence._id) {
                        $scope.openPanelMessage('Clash detected! You cannot add an absence at this period [' + absence.period + ']');
                    } else {
                        AbsenceFactory.updateAbsence(absence).then(function(result) {
                            console.log(result);
                            $scope.fadeoutMessage('Absence updated');
                        });
                    }
                });
            }

            $scope.cancel = function() {
                $modalInstance.close(function() {
                    reset();
                });
            };

            $scope.deleteAbsence = function() {
                AbsenceFactory.deleteAbsence($scope.absence).then(function() {
                    $scope.fadeoutMessage('Absence deleted');
                });
            };

            $scope.cancelDelete = function() {
                $scope.deleteConfirmation = false;
            };

            $scope.closeModal = function() {
                $modalInstance.close(function() {
                    reset();
                    $scope.showPanelMessage = false;
                });
            };

            $scope.openPanelMessage = function(message) {
                $scope.panelMessage = message;
                $scope.showPanelMessage = true;
                $scope.allowBack = true;
            };

            $scope.closePanelMessage = function() {
                $scope.showPanelMessage = false;
                $scope.allowBack = false;
            };

            $scope.fadeoutMessage = function(message) {
                $scope.showPanelMessage = true;
                $scope.panelMessage = message;

                /*jslint browser: true, devel: true */
                setTimeout(function() {
                    $modalInstance.close(function() {
                        reset();
                        $scope.showPanelMessage = false;
                    });
                }, 5000);
            };

            $scope.formatDate = function(date, pattern) {
                return moment(date).format(pattern);
            };

            function validate() {

                if ($scope.absence.name === undefined || $scope.absence.name === '') {
                    $scope.validated.name = false;
                } else {
                    $scope.validated.name = true;
                }

                if ($scope.absence.type === undefined || $scope.absence.type === '') {
                    $scope.validated.type = false;
                } else {
                    $scope.validated.type = true;
                }

                if ($scope.absence.date === undefined || $scope.absence.date === '') {
                    $scope.validated.date = false;
                } else {
                    $scope.validated.date = true;
                }

                if ($scope.absence.period === undefined || $scope.absence.period === '') {
                    $scope.validated.period = false;
                } else {
                    $scope.validated.period = true;
                }

                if ($scope.validated.name && $scope.validated.type && $scope.validated.date && $scope.validated.period) {
                    return true;
                } else {
                    return false;
                }
            }

            function reset() {
                $scope.showPanelMessage = false;
                $scope.deleteConfirmation = false;
                $scope.validated = {
                    name: true,
                    type: true,
                    date: true,
                    period: true
                };
            }
        });
})();

/**
 * Created by avenuecode on 12/3/14.
 */
