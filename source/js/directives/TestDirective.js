(function() {
	'use strict';

	/**
	 * @ngdoc directive
	 * @name testDirective
	 * @id testDirective
	 * @description This is a test directive
	 * ###How to use this directive
	 * <div test-directive></div>
	 */

	angular.module('app')
		.directive('testDirective', function(){
			return {
				restrict: 'EA',
				templateUrl: '/source/partials/TestTemplate.html'						
			};
		});
})();  




