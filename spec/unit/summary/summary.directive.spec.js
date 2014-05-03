describe ('minerva.summary', function () {
  var $compile, $scope

  beforeEach(module('minerva.summary', 'minerva.templates'))
  beforeEach(inject(function (_$compile_, $rootScope) {
    $compile = _$compile_
    $scope = $rootScope.$new()
  }))

  describe('directive', function () {
    describe('summary', function () {
      var template = '<summary><div><b></b></div></summary>'

      it ('transcludes children elements', function () {
        var element = $compile(template)($scope)
        $scope.$digest()

        expect(element.html()).to.equal('<div class="ng-scope"><b></b></div>')
      })
    })

    describe('metric', function () {
      var template = '<summary>' +
                       '<metric name="metric1" icon="icon1" count="metric1Count"></metric>' +
                       '<metric name="metric2" icon="icon2" count="metric2Count"></metric>' +
                     '</summary>'

      it ("recalculate element's width whenever metric's count changes", function () {
        var element, metric1, metric2

        $scope.metric1Count = 3
        $scope.metric2Count = 2

        element = $compile(template)($scope)
        $scope.$digest()

        metric1 = element.find('.metric:first-child')
        metric2 = element.find('.metric:last-child')

        expect(metric1.css('width')).to.equal('60%')
        expect(metric2.css('width')).to.equal('40%')

        $scope.metric2Count = 3
        $scope.$digest()

        expect(metric1.css('width')).to.equal('50%')
        expect(metric2.css('width')).to.equal('50%')
      })
    })
  })
})