angular.module('minerva.timeline')

  .controller('TimelineCtrl', function ($scope, Feedback) {

    Feedback.all().then(function (feedbacks) {
      $scope.feedbacks = feedbacks;
    });
  });
