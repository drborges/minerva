angular.module('minerva.summary')

  .directive('summary', function () {
    return {
      scope: {
        summary: '=for'
      },
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/summary.html',
      link: function (scope, element) {
        var achievements = element.find('.metric.achievements');
        var achievementsChart = achievements.find('.chart');

        var shouts = element.find('.metric.shouts');
        var shoutsChart = shouts.find('.chart');

        var backTaps = element.find('.metric.back-taps');
        var backTapsChart = backTaps.find('.chart');

        var improvements = element.find('.metric.improvements');
        var improvementsChart = improvements.find('.chart');

        var screwUps = element.find('.metric.screw-ups');
        var screwUpsChart = screwUps.find('.chart');

        scope.$watch('summary', function (summary) {
          achievements.css('width', summary.achievements.rate);
          achievementsChart.css('background-color', '#69bf13');

          shouts.css('width', summary.shouts.rate);
          shoutsChart.css('background-color', '#00aeef');

          backTaps.css('width', summary.backTaps.rate);
          backTapsChart.css('background-color', '#898f9c');

          improvements.css('width', summary.improvements.rate);
          improvementsChart.css('background-color', '#ddaa44');

          screwUps.css('width', summary.screwUps.rate);
          screwUpsChart.css('background-color', '#ff4444');
        }, true);
      }
    };
  });