describe ('minerva.models', function () {
  var Feedback

  beforeEach(module('minerva.models'))
  beforeEach(inject(function (_Feedback_) {
    Feedback = _Feedback_
  }))

  describe('Feedback', function () {

    it ('fetches all feedbacks of a', function () {
      var feedback = new Feedback()

      feedback.composedBy('usernameA')
              .receivedBy(['usernameB', 'usernameC'])
              .withTags(['lol'])
              .ofType(['shout', 'achievement'])
              .find() // .findOne()
    })
  })
})