/**
 * Created by avenuecode on 12/2/14.
 */

(function() {
    'use strict';

    /**
     * @name CalendarController
     * @description This is a Calendar Controller
     */

    angular.module('app')
        .controller('CalendarController', function($scope, $modal, AbsenceFactory) {

            $scope.events = [];

            AbsenceFactory.getAbsences().then(function(result) {
                $scope.events = result.data;
            });

            $scope.calendarView = 'month';

            $scope.calendarDay = new Date();

            function showModal(action, event) {
                var modalInstance = $modal.open({
                    templateUrl: 'source/partials/absence.html',
                    controller: 'AbsenceController',
                    size: 'sm',
                    resolve: {
                        action: function() {
                            return action;
                        },
                        event: function() {
                            return event;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    if (event !== 'show') {
                        AbsenceFactory.getAbsences().then(function(result) {
                            $scope.events = result.data;
                        });
                    }
                }, function() {

                });
            }

            $scope.eventClicked = function(event) {
                showModal('show', event);
            };

            $scope.eventEdited = function(event) {
                showModal('update', event);
            };

            $scope.eventDeleted = function(event) {
                showModal('delete', event);
            };

            $scope.addAbsent = function() {
                showModal('add', {});
            };

            $scope.setCalendarToToday = function() {
                $scope.calendarDay = new Date();
            };

            $scope.toggle = function($event, field, event) {
                $event.preventDefault();
                $event.stopPropagation();

                event[field] = !event[field];
            };

        });
})();
