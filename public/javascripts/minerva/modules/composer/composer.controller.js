angular.module('minerva.composer')

  .controller('ComposerCtrl', function ($rootScope) {
    this.send = function (feedback) {
      $rootScope.$broadcast('minerva.composer.feedback.sent', {
        type: 'achievement',
        content: feedback
      });
    };
  });