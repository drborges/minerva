describe ('minerva.composer', function () {
  var $compile, $scope, Feedback

  beforeEach(module('minerva.composer', 'minerva.templates'))
  beforeEach(inject(function (_$compile_, $rootScope, _Feedback_) {
    $compile = _$compile_
    $scope = $rootScope.$new()
    Feedback = _Feedback_
  }))

  describe('composer', function () {
    var template = '<composer on-send="send(feedback)"></composer>'

    it ('executes onSend callback with the content of the textarea when clicking the send button', function () {
      var feedbackContent = 'composing my first feedback to @diegob #shout #achievement'

      $scope.send = sinon.spy()
      Feedback.fromString = sinon.stub().withArgs(feedbackContent).returns('feedback as model object')

      var element = $compile(template)($scope)
      $scope.$digest()

      element.find('textarea').val(feedbackContent).triggerHandler('input')
      element.find('button').triggerHandler('click')

      expect($scope.send).to.have.been.calledWith('feedback as model object')
    })
  })
})