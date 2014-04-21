angular.module('minerva.composer')

  .directive('composer', function () {
    return {
      scope: {
        onSend: '&'
      },
      replace: true,
      restrict: 'E',
      templateUrl: '/templates/composer.html',
      link: function (scope, element) {
        scope.feedback = '';
        element.find('button').on('click', function () {
          scope.$apply(function () {
            scope.onSend({ feedback: scope.feedback });
          });
        });
      }
    };
  });