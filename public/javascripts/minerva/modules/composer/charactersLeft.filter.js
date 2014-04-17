angular.module('minerva.composer')

  .filter('charactersLeft', function () {
    return function (input, maxCharacters) {
      if (!input) {
        input = '';
      }

      var ignoredCharacters = input.match(/(\r\n|\n|\r)/g)
        , ignoredCharactersCount = ignoredCharacters ? ignoredCharacters.length : 0
        , charactersCount = input.length - ignoredCharactersCount;

      return maxCharacters - charactersCount;
    };
  });