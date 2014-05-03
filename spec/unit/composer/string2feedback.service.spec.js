describe ('minerva.composer', function () {
  var String2Feedback, Feedback

  beforeEach(module('minerva.composer', 'minerva.models'))
  beforeEach(inject(function (_String2Feedback_, _Feedback_) {
    String2Feedback = _String2Feedback_
    Feedback = _Feedback_
  }))

  describe('service', function () {
    describe('String2Feedback', function () {

      it ('creates one Feedback object for each detected receiver', function () {
        var result = String2Feedback.apply('@receiver1 @receiver2 #tag1 #tag2 feedback text')
          , feedback1 = result[0]
          , feedback2 = result[1]

        expect(feedback1).to.be.instanceof(Feedback)
        expect(feedback1.receiver).to.equal('@receiver1')
        expect(feedback1.tags).to.deep.equal([ '#tag1', '#tag2' ])
        expect(feedback1.content).to.equal('@receiver1 @receiver2 #tag1 #tag2 feedback text')

        expect(feedback2).to.be.instanceof(Feedback)
        expect(feedback2.receiver).to.equal('@receiver2')
        expect(feedback2.tags).to.deep.equal([ '#tag1', '#tag2' ])
        expect(feedback2.content).to.equal('@receiver1 @receiver2 #tag1 #tag2 feedback text')
      })

      it ('does not detect tags', function () {
        var result = String2Feedback.apply('@receiver1 @receiver2 feedback text')
          , feedback1 = result[0]
          , feedback2 = result[1]

        expect(feedback1.tags).to.be.empty
        expect(feedback2.tags).to.be.empty
      })

      it ('returns empty array when no receiver is detected', function () {
        var result = String2Feedback.apply('feedback text')

        expect(result).to.be.empty
      })
    })
  })
})