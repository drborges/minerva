angular.module('minerva.timeline')

  .controller('TimelineCtrl', function ($scope, Feedback) {

    Feedback.find().then(function (feedbacks) {
      $scope.feedbacks = feedbacks;
    });
  });
