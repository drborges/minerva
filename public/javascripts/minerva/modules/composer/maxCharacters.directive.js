angular.module('minerva.composer')

  .directive('maxCharacters', function ($filter) {
    return {
      scope: {
        maxCharacters: '=maxCharacters',
        model: '=ngModel'
      },
      link: function (scope, element) {
        scope.$watch('model', function (newValue, oldValue) {
          var maxCharactersReached = $filter('charactersLeft')(newValue, scope.maxCharacters) < 0;

          if (maxCharactersReached) {
            scope.model = oldValue ? oldValue : newValue.slice(0, scope.maxCharacters);
          }
        });
      }
    };
  });