angular.module('minerva.composer')

  .directive('composer', function () {
    return {
      scope: {
        model: '=ngModel'
      },
      restrict: 'E',
      templateUrl: 'templates/composer.html'
    };
  });