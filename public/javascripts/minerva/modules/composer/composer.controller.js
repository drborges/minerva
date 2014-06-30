angular.module('minerva.composer')

  .controller('ComposerCtrl', function ($rootScope, Feedback, $http) {
    this.send = function (feedbackData) {
      $http.post('/api/v1/users/dborges/feedbacks', { user: { name: "Diego" } })

      Feedback.save(feedbackData).then(function (feedback) {
        $rootScope.$broadcast('minerva.composer.feedback.sent', feedback);
      });
    };
  });