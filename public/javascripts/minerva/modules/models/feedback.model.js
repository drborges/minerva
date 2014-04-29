angular.module('minerva.models')

  .factory('Feedback', function ($http) {
    return {
      all: function () {
        return $http.get('/api/feedback').then(function (response) {
          return response.data;
        });
      },

      fromString: function (string) {
        var receivers = string.match(/@(\w+)/g) || [];
        var tags = string.match(/#(\w+)/g) || [];
        return {
          receivers: receivers,
          tags: tags,
          content: string
        }
      }
    };
  });
