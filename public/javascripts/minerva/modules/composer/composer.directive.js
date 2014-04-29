angular.module('minerva.composer')

  .directive('composer', function (Feedback) {
    return {
      scope: {
        onSend: '&'
      },
      replace: true,
      restrict: 'E',
      templateUrl: '/templates/composer.html',
      link: function (scope, element) {
        element.find('button').on('click', function () {
          scope.$apply(function () {
            var model = Feedback.fromString(scope.feedback)
            scope.onSend({ feedback: model });
          });
        });
      }
    };
  });
