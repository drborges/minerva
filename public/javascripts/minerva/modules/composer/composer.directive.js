angular.module('minerva.composer')

  .directive('composer', function () {
    return {
      scope: {
        onSend: '&'
      },
      restrict: 'E',
      templateUrl: '/templates/composer.html',
      link: function (scope, element) {
        scope.feedback = '';
        element.find('.btn-send').on('click', function () {
          scope.onSend({ feedback: scope.feedback });
        });
      }
    };
  });