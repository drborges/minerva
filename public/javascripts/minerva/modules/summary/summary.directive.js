angular.module('minerva.summary')

  .directive('summary', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div class="summary" ng-transclude></div>',
      controller: function () {
        var metrics = [];

        function rate(metricCount, metrics) {
          var metricsTotalSum = metrics.reduce(function (sum, metric) {
            return sum + metric.count;
          }, 0);

          return (metricCount * 100) / metricsTotalSum;
        }

        function updateRates(metrics) {
          metrics.forEach(function (metric) {
            metric.element.css('width', rate(metric.count, metrics) + '%');
          });
        }

        this.register = function (element) {
          metrics.push({ element: element });
          return metrics.length - 1;
        };

        this.add = function (id, count) {
          metrics[id].count = count;
          updateRates(metrics);
        };
      }
    };
  })

  .directive('metric', function () {
    return {
      scope: {
        icon: '@',
        count: '='
      },
      restrict: 'E',
      replace: true,
      require: '^summary',
      templateUrl: '/templates/metric.html',
      link: function (scope, element, attrs, summary) {
        var id = summary.register(element);
        scope.$watch('count', function (newCount) {
          summary.add(id, newCount);
        });
      }
    }
  });