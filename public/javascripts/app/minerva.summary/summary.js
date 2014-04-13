angular.module('minerva.summary', [])

  .directive('summary', function () {
    return {
      scope: {
        summary: '=for'
      },
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/summary.html',
      link: function (scope, element) {
        var achievements = element.find('.achievements');
        var shouts = element.find('.shouts');
        var backTaps = element.find('.back-taps');
        var improvements = element.find('.improvements');
        var screwUps = element.find('.screw-ups');

        scope.$watch('summary', function (summary) {
          achievements.css('width', summary.achievements.rate);
          shouts.css('width', summary.shouts.rate);
          backTaps.css('width', summary.backTaps.rate);
          improvements.css('width', summary.improvements.rate);
          screwUps.css('width', summary.screwUps.rate);
        }, true);
      }
    };
  })

  .controller('SummaryController', function () {
    this.loggedInUser = {
      summary: {
        achievements: {
          count: 50,
          rate: '50%'
        },
        shouts: {
          count: 15,
          rate: '15%'
        },
        backTaps: {
          count: 25,
          rate: '25%'
        },
        improvements: {
          count: 8,
          rate: '8%'
        },
        screwUps: {
          count: 2,
          rate: '2%'
        }
      }
    };
  })