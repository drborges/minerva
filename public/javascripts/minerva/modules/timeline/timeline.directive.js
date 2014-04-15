angular.module('minerva.timeline')

  .directive('timeline', function () {
    return {
      scope: {
        activity: '=activity'
      },
      restrict: 'E',
      templateUrl: 'templates/timeline.html'
    };
  });