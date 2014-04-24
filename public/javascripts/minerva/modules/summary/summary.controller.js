angular.module('minerva.summary')

  .controller('SummaryCtrl', function ($rootScope, $log) {
    $rootScope.$on('minerva.composer.feedback.sent', function (event, feedback) {
      $log.info(feedback);
    });

    this.loggedInUser = {
      summary: {
        achievements: {
          count: 20,
          rate: '20%'
        },
        shouts: {
          count: 20,
          rate: '20%'
        },
        backTaps: {
          count: 20,
          rate: '20%'
        },
        improvements: {
          count: 38,
          rate: '38%'
        },
        screwUps: {
          count: 2,
          rate: '2%'
        }
      }
    };
  });