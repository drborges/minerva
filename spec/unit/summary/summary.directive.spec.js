describe ('minerva.summary', function () {
  var $compile, $scope

  beforeEach(module('minerva.summary', 'minerva.templates'))
  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_
    $scope = $rootScope.$new()
  }))

  describe('summary', function () {
    var template = '<summary for="send(feedback)">' +
                     '<div class="achivements"></div>' +
                     '<div class="shouts"></div>' +
                     '<div class="back-taps"></div>' +
                     '<div class="improvements"></div>' +
                     '<div class="screw-ups"></div>' +
                   '</summary>'

    it ('updates width css property of ".achivements" elements when "summary" model changes', function () {

      var element = $compile(template)($scope)
    })
  })
})