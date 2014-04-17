describe ('minerva.composer', function () {
  var $compile, $scope

  beforeEach(module('minerva.composer'))
  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_
    $scope = $rootScope.$new()
  }))

  describe('maxCharacters', function () {
    var template = '<textarea max-characters="max" ng-model="model"></textarea>'

    it('truncate text if its length goes over the max number of characters allowed', function () {
      $scope.model = undefined
      $scope.max = 5

      var element = $compile(template)($scope)
      $scope.$digest()

      $scope.model = 'abcdefgh'
      $scope.$digest()

      expect(element.val()).to.equal('abcde')
    })

    it('ignores new content when input length reaches the max number of characters allowed', function () {
      $scope.model = 'abcde'
      $scope.max = 5

      var element = $compile(template)($scope)
      $scope.$digest()

      expect(element.val()).to.equal('abcde')

      $scope.model = 'abcdef'
      $scope.$digest()

      expect(element.val()).to.equal('abcde')

      $scope.model = 'abcdfe'
      $scope.$digest()

      expect(element.val()).to.equal('abcde')
    })
  })
})