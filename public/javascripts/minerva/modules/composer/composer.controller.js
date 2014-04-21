angular.module('minerva.composer')

  .controller('ComposerCtrl', function ($rootScope) {
    this.send = function (feedback) {
      $rootScope.$emit('minerva.composer.feedback', { type: 'achievement', content: feedback })
    };
  });