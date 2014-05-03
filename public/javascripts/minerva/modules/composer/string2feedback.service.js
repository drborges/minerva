angular.module('minerva.composer')

  .service('String2Feedback', function (Feedback) {

    this.apply = function (string) {
      var receivers = string.match(/@(\w+)/g) || [];
      var tags = string.match(/#(\w+)/g) || [];

      var feedbacks = receivers.map(function (receiver) {
        return new Feedback({ receiver: receiver, tags: tags, content: string })
      });

      return feedbacks;
    };

  });