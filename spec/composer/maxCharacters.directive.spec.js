describe ('minerva.composer', function () {
  beforeEach(module('minerva.composer'));

  describe('maxCharacters', function () {
    var template = '<textarea max-characters="max" ng-model="model"></textarea>';

    it('truncate text if its length goes over the max number of characters allowed', inject(function ($compile, $rootScope) {
      $rootScope.model = undefined;
      $rootScope.max = 5;

      var element = $compile(template)($rootScope);
      $rootScope.$digest();

      $rootScope.model = 'abcdefgh';
      $rootScope.$digest();

      expect(element.val()).to.equal('abcde');
    }));

    it('ignores new content when input length reaches the max number of characters allowed', inject(function ($compile, $rootScope) {
      $rootScope.model = 'abcde';
      $rootScope.max = 5;

      var element = $compile(template)($rootScope);
      $rootScope.$digest();

      expect(element.val()).to.equal('abcde');

      $rootScope.model = 'abcdef';
      $rootScope.$digest();

      expect(element.val()).to.equal('abcde');

      $rootScope.model = 'abcdfe';
      $rootScope.$digest();

      expect(element.val()).to.equal('abcde');
    }));
  });
});