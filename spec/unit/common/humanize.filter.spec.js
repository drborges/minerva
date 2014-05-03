describe ('minerva.common', function () {
  var $filter

  beforeEach(module('minerva.common'))
  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_
  }))

  describe('filter', function () {
    describe('humanize', function () {
      it('converts "screw-up" to "Screw up"', function () {
        var humanizedText = $filter('humanize')('screw-up')
        expect(humanizedText).to.equal('Screw up')
      })

      it('converts "MY_CONSTANT" to "My constant"', function () {
        var humanizedText = $filter('humanize')('MY_CONSTANT')
        expect(humanizedText).to.equal('My constant')
      })

      it('converts "mY_wEiRd-String" to "My weird string"', function () {
        var humanizedText = $filter('humanize')('mY_wEiRd-String')
        expect(humanizedText).to.equal('My weird string')
      })

      it('converts "mY-wEiRd_String" to "My weird string"', function () {
        var humanizedText = $filter('humanize')('mY_wEiRd_String')
        expect(humanizedText).to.equal('My weird string')
      })

      it('converts "mY-wEiRd-String" to "My weird string"', function () {
        var humanizedText = $filter('humanize')('mY-wEiRd-String')
        expect(humanizedText).to.equal('My weird string')
      })

      it('converts "mY_wEiRd_String" to "My weird string"', function () {
        var humanizedText = $filter('humanize')('mY_wEiRd_String')
        expect(humanizedText).to.equal('My weird string')
      })
    })
  })
})