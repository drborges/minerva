angular.module('minerva.composer')

  .controller('ComposerCtrl', function ($rootScope, Feedback) {
    this.send = function (feedbackData) {
      Feedback.save(feedbackData).then(function (feedback) {
        $rootScope.$broadcast('minerva.composer.feedback.sent', feedback);
      });
    };
  });