angular.module('minerva.composer', [])

  .filter('charactersLeft', function () {
    return function (input, maxCharacters) {
      var charactersLeftCount = !input ? maxCharacters : maxCharacters - input.length;

      return charactersLeftCount === 1 ?
        charactersLeftCount + " character left" :
        charactersLeftCount + " characters left";
    };
  })

  .directive('composer', function () {
    return {
      scope: {
        maxlength: '=maxlength',
        model: '=ngModel'
      },
      restrict: 'E',
      templateUrl: 'templates/composer.html'
    };
  });