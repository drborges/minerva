angular.module('minerva.composer')

  .controller('ComposerCtrl', function () {
    this.send = function (feedback) {
      console.log(feedback);
    };
  });