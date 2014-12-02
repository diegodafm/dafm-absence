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
        .controller('CalendarController', function($scope, $modal){

            $scope.events = [
                {
                    title: 'My event title', // The title of the event
                    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                    starts_at: new Date(2014,11,2,6), // A javascript date object for when the event starts
                    ends_at: new Date(2014,11,2,15), // A javascript date object for when the event ends
                    editable: false, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
                    deletable: false // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                }
            ];

            $scope.calendarView = 'month';

            $scope.calendarDay = new Date();

            function showModal(action, event) {
                $modal.open({
                    templateUrl: 'modalContent.html',
                    controller: function($scope, $modalInstance) {
                        $scope.$modalInstance = $modalInstance;
                        $scope.action = action;
                        $scope.event = event;
                    }
                });
            }

            $scope.eventClicked = function(event) {
                showModal('Clicked', event);
            };

            $scope.eventEdited = function(event) {
                showModal('Edited', event);
            };

            $scope.eventDeleted = function(event) {
                showModal('Deleted', event);
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
