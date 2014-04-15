angular.module('minerva.timeline')

  .filter('feedbackTypeClass', function () {
    return function (feedbackType) {
      switch (feedbackType) {
        case 'achievement': return 'fa-trophy';
        case 'shout': return 'fa-bullhorn';
        case 'back-tap': return 'fa-star';
        case 'improvement': return 'fa-exclamation-triangle';
        case 'screw-up': return 'fa-fire';
      }
    };
  });