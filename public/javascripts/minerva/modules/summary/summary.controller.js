angular.module('minerva.summary')

  .controller('SummaryCtrl', function () {
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