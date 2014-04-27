angular.module('minerva.summary')

  .directive('summary', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div class="summary" ng-transclude></div>',
      controller: function () {
        var metrics = {};

        function metricRate(metricName, metrics) {
          var metricsTotalSum = Object.keys(metrics).reduce(function (sum, name) {
            return sum + metrics[name].count;
          }, 0);

          return (metrics[metricName].count * 100) / metricsTotalSum;
        }

        function updateRates(metrics) {
          Object.keys(metrics).forEach(function (name) {
            metrics[name].element.css('width', metricRate(name, metrics) + '%');
          });
        }

        this.add = function (name, count, element) {
          metrics[name] = { count: count, element: element };
          updateRates(metrics);
        };
      }
    };
  })

  .directive('metric', function () {
    return {
      scope: {
        name: '@',
        icon: '@',
        count: '='
      },
      restrict: 'E',
      replace: true,
      require: '^summary',
      templateUrl: '/templates/metric.html',
      link: function (scope, element, attrs, summary) {
        scope.$watch('count', function (newCount) {
          summary.add(scope.name, newCount, element);
        });
      }
    }
  });