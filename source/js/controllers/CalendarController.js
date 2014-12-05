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

            /*

            90 a 13
            13 a 17
            $scope.events = [{
                    title: 'My event title', // The title of the event
                    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                    starts_at: new Date(2014, 11, 2, 6), // A javascript date object for when the event starts
                    ends_at: new Date(2014, 11, 2, 15), // A javascript date object for when the event ends
                    editable: false, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
                    deletable: false // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                }, {
                    title: 'My event sstitle', // The title of the event
                    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                    starts_at: new Date(2014, 11, 2, 6), // A javascript date object for when the event starts
                    ends_at: new Date(2014, 11, 2, 15), // A javascript date object for when the event ends
                    editable: true, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
                    deletable: true // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                }

            ];
            */

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
                    AbsenceFactory.getAbsences().then(function(result) {
                        $scope.events = result.data;
                    });
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

            $scope.setCalendarToToday = function() {
                $scope.calendarDay = new Date();
            };

            $scope.toggle = function($event, field, event) {
                $event.preventDefault();
                $event.stopPropagation();

                event[field] = !event[field];
            };

            $scope.addAbsent = function() {
                showModal('add', {});
            };

        });
})();
