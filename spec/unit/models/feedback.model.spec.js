describe ('minerva.models', function () {
  var Feedback

  beforeEach(module('minerva.models'))
  beforeEach(inject(function (_Feedback_) {
    Feedback = _Feedback_
  }))

  it ('creates model from string', function () {
    var model = Feedback.fromString("@receiver1 @receiver2 #tag1 #tag2 feedback text")

    expect(model).to.deep.equal({
      receivers: [ '@receiver1', '@receiver2' ],
      tags: [ '#tag1', '#tag2' ],
      content: '@receiver1 @receiver2 #tag1 #tag2 feedback text'
    })
  })

  it ('creates model from string without tags', function () {
    var model = Feedback.fromString("@receiver1 @receiver2 feedback text")

    expect(model).to.deep.equal({
      receivers: [ '@receiver1', '@receiver2' ],
      tags: [],
      content: '@receiver1 @receiver2 feedback text'
    })
  })

  it ('creates model from string without receivers', function () {
    var model = Feedback.fromString("#tag1 #tag2 feedback text")

    expect(model).to.deep.equal({
      receivers: [],
      tags: [ '#tag1', '#tag2' ],
      content: '#tag1 #tag2 feedback text'
    })
  })
})