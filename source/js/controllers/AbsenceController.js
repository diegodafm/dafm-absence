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

            $scope.action = action;

            $scope.showPanelMessage = false;

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

            $scope.cancel = function(){
                $modalInstance.close();
            };

            $scope.submit = function() {

                var result = true;

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

                return result;

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
            }

            function addAbsence(absence) {
                AbsenceFactory.checkAvailability(absence).then(function(availability) {
                    if (availability.data.length > 0) {
                        $scope.openPanelMessage('Clash detected! You cannot add an absence at this period ['+absence.period+']');
                    } else {
                        AbsenceFactory.insertAbsence(absence).then(function(result) {
                            $scope.fadeoutMessage('Absence added');
                        });
                    }
                });
            }

            function updateAbsence(absence) {
                AbsenceFactory.checkAvailability(absence).then(function(availability) {
                    if (availability.data.length > 0 && availability.data[0]._id !== absence._id) {
                        $scope.openPanelMessage('Clash detected! You cannot add an absence at this period ['+absence.period+']');
                    } else {
                        AbsenceFactory.updateAbsence(absence).then(function(result) {
                            console.log(result);
                            $scope.fadeoutMessage('Absence updated');
                        });
                    }
                });
            }

            $scope.deleteAbsence = function () {
                AbsenceFactory.deleteAbsence($scope.absence).then(function(result) {
                    $scope.fadeoutMessage('Absence deleted');
                });
            }

            $scope.closeModal = function(){
                $modalInstance.close(function(){
                    $scope.showPanelMessage = false;
                });
            };

            $scope.cancelDelete = function(){
                $scope.deleteConfirmation = false;
            };

            $scope.openPanelMessage= function(message){
                $scope.panelMessage = message;
                $scope.showPanelMessage = true;
                $scope.allowBack = true;
            };

            $scope.closePanelMessage= function(){
                $scope.showPanelMessage = false;
                $scope.allowBack = false;
            };

            $scope.fadeoutMessage = function(message){
                $scope.showPanelMessage = true;
                $scope.panelMessage = message;

                setTimeout(function(){
                    $modalInstance.close(function(){
                        $scope.showPanelMessage = false;
                    });
                },5000);
            }

            $scope.formatDate =function(date,pattern){
                return moment(date).format(pattern);
            }
        });
})();

/**
 * Created by avenuecode on 12/3/14.
 */
