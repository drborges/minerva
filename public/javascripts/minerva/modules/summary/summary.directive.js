angular.module('minerva.summary')

  .directive('summary', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: '<div class="summary" ng-transclude></div>',
      controller: function () {
        var metrics = {};

        this.add = function (metric) {
          metrics[metric.name] = metric.count;
        };

        this.metricRate = function (metricName) {
          var metricsNames = Object.keys(metrics);
          var metricsCount = metricsNames.length;
          var metricsTotalSum = metricsNames.reduce(function (sum, name) {
            return sum + metrics[name];
          }, 0);

          return (metrics[metricName] * 100.0) / metricsTotalSum + '%';
        };
      }
    };
  })

  .directive('metric', function () {
    return {
      scope: {
        name: '@',
        icon: '@',
        color: '@',
        count: '='
      },
      restrict: 'E',
      replace: true,
      require: '^summary',
      templateUrl: 'templates/metric.html',
      link: function (scope, element, attrs, summary) {
        summary.add({ name: scope.name, count: scope.count });

        element.find('.chart').css('background-color', scope.color);

        scope.$watch('count', function () {
          element.css('width', summary.metricRate(scope.name));
        });
      }
    }
  });