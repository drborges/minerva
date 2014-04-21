describe ('minerva.composer', function () {
  var $compile, $scope

  beforeEach(module('minerva.composer', 'minerva.templates'))
  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_
    $scope = $rootScope.$new()
  }))

  describe('composer', function () {
    var template = '<composer on-send="send(feedback)"></composer>'

    it('executes onSend callback with the content of the textarea when clicking the send button', function () {
      var feedback = 'composing my first feedback'
      $scope.send = sinon.spy()

      var element = $compile(template)($scope)
      $scope.$digest()

      element.find('textarea').scope().feedback = feedback
      element.find('button').triggerHandler('click')

      expect($scope.send).to.have.been.calledWith(feedback)
    })
  })
})