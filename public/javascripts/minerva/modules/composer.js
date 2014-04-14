angular.module('minerva.composer', [])

  .filter('charactersLeft', function () {
    return function (input, maxCharacters) {
      if (!input)
        input = "";

      var ignoredCharacters = input.match(/(\r\n|\n|\r)/g)
        , ignoredCharactersCount = ignoredCharacters ? ignoredCharacters.length : 0
        , charactersCount = input.length - ignoredCharactersCount;

      return maxCharacters - charactersCount;
    };
  })

  .directive('composer', function () {
    return {
      scope: {
        model: '=ngModel'
      },
      restrict: 'E',
      templateUrl: 'templates/composer.html'
    };
  })

  .directive('maxCharacters', function ($filter) {
    return {
      scope: {
        maxCharacters: '=maxCharacters',
        model: '=ngModel'
      },
      link: function (scope, element) {
        scope.$watch('model', function (newValue, oldValue) {
          var charactersLeft = $filter('charactersLeft')(newValue, scope.maxCharacters);

          if (charactersLeft < 0) {
            scope.model = oldValue ? oldValue : newValue.slice(0, scope.maxCharacters);
          }
        });
      }
    };
  });