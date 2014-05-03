angular.module('minerva.composer')

  .directive('composer', function (String2Feedback) {
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
            var model = String2Feedback.apply(scope.feedback);
            scope.onSend({ feedback: model });
          });
        });
      }
    };
  });
